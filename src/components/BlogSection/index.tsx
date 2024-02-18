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
import CustomSkeleton from "../Shared/customSkeleton";
import { useSetRecoilState } from "recoil";
import { currentViewPageState } from "../../State/atom";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
interface BlogList {
  id: string;
  heading: string;
  shortDescription: string;
  blogDate: string;
  image: string;
}

const itemsPerPage = 9;

const customStyles = {
  textField: {
    width: {
      xs: "100%",
      sm: "25%",
    },
    background: "white",
    borderRadius: 2,
    border: "1px solid #fe6c0a",
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "transparent",
      },
      "&.Mui-focused fieldset": {
        borderColor: "transparent",
      },
    },
    mt: {
      xs: 2,
      sm: 0,
    },
  },
  paginationBox: {
    mt: 12,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    bottom: 0,
  },
  pagination: {
    color: "white",
    "& .MuiPaginationItem-root": {
      color: "white",
    },
    "& .MuiPaginationItem-root.Mui-selected": {
      "&:hover": {
        backgroundColor: "#fe6c0a",
        opacity: 0.8,
      },
      color: "white",
      backgroundColor: "#fe6c0a",
    },
  },
  blog: {
    cursor: "pointer",
    width: {
      xs: "100%",
      md: "45%",
      xl: "30%",
    },
    height: 350,
    mt: 4,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "end",
    "&:hover": {
      opacity: 0.8,
      height: 346,
      width: {
        xs: "100%",
        md: "44.7%",
        xl: "29.7%",
      },
      border: "2px solid #fe6c0a",
    },
  },
  blogStack: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: 100,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    mb: 2,
    p: 1,
  },
  heading: {
    wordBreak: "break-word",
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 24,
    color: "#fe6c0a",
    textAlign: "center",
    mb: 2,
  },
  description: {
    wordBreak: "break-word",
    mt: -2,
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  outerBox: {
    display: "flex",
    justifyContent: "center",
  },
  innerBox: {
    mt: {
      xs: 2,
      md: 0,
    },
    width: "75vw",
    flexWrap: "wrap",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: { xs: "column", sm: "row" },
  },
  postHeading: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  icon: {
    color: "#fe6c0a",
  },
  detailsOuterBox: {
    display: "flex",
    justifyContent: "center",
  },
  detailsStack: {
    mt: 2,
    width: "75vw",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  noResultBox: {
    width: "100%",
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  noResultIcon: {
    color: "white",
    fontSize: 75,
    fontWeight: "bold",
    textAlign: "center",
  },
  noResultText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
};

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
        const blogQuery = query(blogListRef, orderBy("blogDate"));

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
