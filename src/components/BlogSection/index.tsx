import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { ChangeEvent, useEffect, useState, useMemo } from "react";
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

const textFieldStyles = {
  width: { xs: "100%", sm: "25%" },
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
  mt: { xs: 2, sm: 0 },
};

const BlogSection = () => {
  const navigate = useNavigate();
  const [blogList, setBlogList] = useState<BlogList[]>([]);
  const blogListRef = collection(database, "blogPosts");
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
      } catch (error) {
        console.log(error);
      }
    };

    getBlogPosts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTotalPage(Math.ceil(filteredBlogs.length / itemsPerPage));
  }, [filteredBlogs]);

  const paginationSection = (
    <Box
      sx={{
        mt: 12,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        bottom: 0,
      }}
    >
      <Pagination
        size="large"
        color="primary"
        count={totalPage}
        page={currentPage}
        onChange={handlePageChange}
        sx={{
          color: "white",
          "& .MuiPaginationItem-root": {
            color: "white",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            "&:hover": { backgroundColor: "#fe6c0a", opacity: 0.8 },
            color: "white",
            backgroundColor: "#fe6c0a",
          },
        }}
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
            cursor: "pointer",
            width: { xs: "100%", md: "45%", xl: "30%" },
            height: 350,
            mt: 4,
            backgroundImage: `url(${blog?.image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "end",
            "&:hover": {
              opacity: 0.8,
              height: 346,
              width: { xs: "100%", md: "44.7%", xl: "29.7%" },
              border: "2px solid #fe6c0a",
            },
          }}
        >
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              height: 100,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              mb: 2,
              p: 1,
            }}
          >
            <Typography
              sx={{
                wordBreak: "break-word",
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 24,
                color: "#fe6c0a",
                textAlign: "center",
                mb: 2,
              }}
            >
              {blog.heading}
            </Typography>

            <Typography
              sx={{
                wordBreak: "break-word",
                mt: -2,
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 18,
                color: "white",
                textAlign: "center",
              }}
            >
              {blog.shortDescription}
            </Typography>
          </Stack>
        </Box>
      );
    });

  return (
    <Box sx={{ pb: 8, pt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            mt: { xs: 2, md: 0 },
            width: "75vw",
            flexWrap: "wrap",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Typography sx={{ fontSize: 25, fontWeight: "bold", color: "white" }}>
            Blog Posts
          </Typography>

          <TextField
            size="small"
            placeholder="Search"
            sx={textFieldStyles}
            onChange={handleFilter}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: "#fe6c0a" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: loading ? -12 : -2,
        }}
      >
        <Stack
          direction="row"
          sx={{
            mt: 2,
            width: "75vw",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <CustomSkeleton key={index} index={index} />
            ))
          ) : (
            <>
              {blogsSection}

              {filteredBlogs.length > 0 && paginationSection}

              {filteredBlogs.length === 0 && (
                <Stack
                  sx={{
                    width: "100%",
                    height: "80vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: 75,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    🥹
                  </Typography>

                  <Typography
                    sx={{
                      color: "white",
                      fontSize: 18,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
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
