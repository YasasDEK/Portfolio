import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { ChangeEvent, useEffect, useState, useMemo, useRef } from "react";
import { database } from "../../config/firebase";
import {
  Box,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CustomSkeleton from "../Shared/CustomSkeleton";
import { useSetRecoilState } from "recoil";
import { currentViewPageState } from "../../State/atom";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { customStyles } from "./index.styles";
interface BlogList {
  id: string;
  heading: string;
  shortDescription: string;
  blogDate: string;
  image: string;
}

const itemsPerPage = 9;

const BlogSection = () => {
  const navigate = useNavigate();

  const [blogList, setBlogList] = useState<BlogList[]>([]);
  const blogListRef = collection(database, "blogPosts");

  const isDataFetched = useRef(false);

  const [loading, setLoading] = useState(false);
  const setSelectedPage = useSetRecoilState(currentViewPageState);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogList[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const endIndex: number = useMemo(
    () => Math.min(startIndex + itemsPerPage, filteredBlogs.length),
    [startIndex, filteredBlogs]
  );

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setFilteredBlogs(
      blogList.filter((blog) =>
        blog.heading.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    if (isDataFetched.current) return;

    setLoading(true);

    const getBlogPosts = async () => {
      setSelectedPage("Blogs");

      try {
        const blogQuery = query(blogListRef, orderBy("sortOrder", "desc"));

        const data = (await getDocs(blogQuery)).docs.map((doc) => ({
          id: doc.id,
          heading: doc.data().heading,
          shortDescription: doc.data().shortDescription,
          blogDate: doc.data().date,
          image: doc.data().coverImage,
        }));

        setBlogList(data);

        setFilteredBlogs(data);

        setTotalPage(Math.ceil(data.length / itemsPerPage));

        setLoading(false);
      } catch (_error) {}
    };

    getBlogPosts();

    isDataFetched.current = true;
  }, [blogListRef, setSelectedPage]);

  useEffect(() => {
    setTotalPage(Math.ceil(filteredBlogs.length / itemsPerPage));
  }, [filteredBlogs]);

  const paginationSection = (
    <Box sx={customStyles.paginationBox}>
      <Pagination
        size="large"
        color="primary"
        count={totalPage}
        page={currentPage}
        onChange={handlePageChange}
        sx={customStyles.pagination}
      />
    </Box>
  );

  const blogsSection = filteredBlogs
    .slice(startIndex, endIndex)
    .map((blog, index) => {
      return (
        <Box
          key={index}
          onClick={() => navigate(`/blog?blogId=${blog.id}`)}
          sx={{
            ...customStyles.blog,
            backgroundImage: `url(${blog?.image})`,
          }}
        >
          <Stack sx={customStyles.blogStack}>
            <Typography sx={customStyles.heading}>{blog.heading}</Typography>

            <Typography sx={customStyles.description}>
              {blog.shortDescription}
            </Typography>
          </Stack>
        </Box>
      );
    });

  return (
    <Box pb={8} pt={2}>
      <Box sx={customStyles.outerBox}>
        <Box sx={customStyles.innerBox}>
          <Typography sx={customStyles.postHeading}>Blog Posts</Typography>

          <TextField
            size="small"
            placeholder="Search"
            sx={customStyles.textField}
            onChange={handleFilter}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={customStyles.icon} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          ...customStyles.detailsOuterBox,
          mt: loading ? -12 : -2,
        }}
      >
        <Stack direction="row" sx={customStyles.detailsStack}>
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <CustomSkeleton key={index} index={index} />
            ))
          ) : (
            <>
              {blogsSection}

              {filteredBlogs.length > 0 && paginationSection}

              {isDataFetched.current && filteredBlogs.length === 0 && (
                <Stack sx={customStyles.noResultBox}>
                  <Typography sx={customStyles.noResultIcon}>🥹</Typography>

                  <Typography sx={customStyles.noResultText}>
                    Sorry!!! No result found
                  </Typography>
                </Stack>
              )}
            </>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default BlogSection;
