import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../../config/firebase";
import { Box, Stack, Typography } from "@mui/material";
import CustomSkeleton from "../Shared/customSkeleton";
import { useSetRecoilState } from "recoil";
import { currentViewPageState } from "../../State/atom";
import { useNavigate } from "react-router-dom";

interface BlogList {
  id: string;
  heading: string;
  description: string;
  blogDate: string;
}

const BlogSection = () => {
  const navigate = useNavigate();
  const [blogList, setBlogList] = useState<BlogList[]>([]);
  const blogListRef = collection(database, "blogPosts");
  const [loading, setLoading] = useState(false);
  const setSelectedPage = useSetRecoilState(currentViewPageState);

  useEffect(() => {
    setLoading(true);

    const getBlogPosts = async () => {
      setSelectedPage("Blogs");

      try {
        const blogQuery = query(blogListRef, orderBy("blogDate"));

        const data = (await getDocs(blogQuery)).docs.map((doc) => ({
          id: doc.id,
          heading: doc.data().heading,
          description: doc.data().description,
          blogDate: doc.data().date,
        }));

        setBlogList(data);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getBlogPosts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ pb: 8, pt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "75vw", flexWrap: "wrap" }}>
          <Typography sx={{ fontSize: 25, fontWeight: "bold", color: "white" }}>
            Blog Posts
          </Typography>
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
            width: "75vw",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <CustomSkeleton key={index} index={index} />
              ))
            : blogList.map((blog, index) => (
                <Box
                  key={index}
                  onClick={() => navigate(`/blog?blogId=${blog.id}`)}
                  sx={{
                    cursor: "pointer",
                    width: { xs: "100%", md: "45%", xl: "30%" },
                    height: 350,
                    mt: 4,
                    backgroundImage: 'url("/images/programmng-language.jpg")',
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
                        mt: -2,
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: 18,
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      {blog.description}
                    </Typography>
                  </Stack>
                </Box>
              ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default BlogSection;
