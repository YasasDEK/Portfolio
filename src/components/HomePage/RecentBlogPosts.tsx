import { Box, Button, Stack, Typography } from "@mui/material";
import { query, collection, orderBy, limit, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { database } from "../../config/firebase";
import BlogSkeleton from "../Shared/customSkeleton";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { currentViewPageState } from "../../State/atom";

interface BlogList {
  id: string;
  heading: string;
  shortDescription: string;
  blogDate: string;
  image: string;
}

const RecentBlogPosts = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [blogList, setBlogList] = useState<BlogList[]>([]);
  const blogListRef = collection(database, "blogPosts");
  const setSelectedPage = useSetRecoilState(currentViewPageState);

  useEffect(() => {
    setLoading(true);

    const getBlogPosts = async () => {
      try {
        const blogQuery = query(blogListRef, orderBy("blogDate"), limit(3));

        const data = (await getDocs(blogQuery)).docs.map((doc) => ({
          id: doc.id,
          heading: doc.data().heading,
          shortDescription: doc.data().shortDescription,
          blogDate: doc.data().blogDate,
          image: doc.data().coverImage,
        }));

        setBlogList(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getBlogPosts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ mb: loading ? -5 : 8, pt: 8 }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "75vw", flexWrap: "wrap" }}>
          <Stack
            justifyContent="space-between"
            alignItems="center"
            sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}
          >
            <Typography
              sx={{
                wordBreak: "break-word",
                fontSize: 25,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Latest blog posts
            </Typography>

            <Button
              variant="outlined"
              onClick={() => {
                setSelectedPage("Blogs");
                navigate("/blog");
              }}
              sx={{
                fontSize: 13,
                fontWeight: "bold",
                color: "#fe6c0a",
                border: "1px solid #fe6c0a",
                "&:hover": {
                  opacity: 0.8,
                  border: "1px solid #fe6c0a",
                },
                mt: { xs: 2, md: 0 },
              }}
            >
              See more
            </Button>
          </Stack>

          <Stack
            direction="row"
            sx={{
              width: "75vw",
              flexWrap: "wrap",
              justifyContent: "space-between",
              mt: loading ? -10 : 0,
            }}
          >
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <BlogSkeleton home={true} key={index} index={index} />
                ))
              : blogList.map((blog, index) => (
                  <Box
                    key={index}
                    onClick={() => navigate(`/blog?blogId=${blog.id}`)}
                    sx={{
                      cursor: "pointer",
                      width: { xs: "100%", md: "30%" },
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
                        width: { xs: "100%", md: "29.7%" },
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
                        p: 2,
                      }}
                    >
                      <Typography
                        sx={{
                          wordBreak: "break-word",
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: 24,
                          color: "#fe6c0a",
                          textAlign: "center",
                        }}
                      >
                        {blog.heading}
                      </Typography>

                      <br />

                      <Typography
                        sx={{
                          wordBreak: "break-word",
                          mt: -2,
                          fontSize: 14,
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        {blog.shortDescription}
                      </Typography>
                    </Stack>
                  </Box>
                ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default RecentBlogPosts;
