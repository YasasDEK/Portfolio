import { Box, Stack, Typography } from "@mui/material";
import { query, collection, orderBy, limit, getDocs } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { database } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { currentViewPageState } from "../../../State/atom";
import RecentPosts from "../../Shared/RecentPosts";
import { customStyles } from "../../Shared/RecentPosts/index.styles";

interface BlogList {
  id: string;
  heading: string;
  shortDescription: string;
  blogDate: string;
  image: string;
}

const RecentBlogPosts = () => {
  const navigate = useNavigate();

  const isDataFetched = useRef(false);

  const [loading, setLoading] = useState(true);
  const [blogList, setBlogList] = useState<BlogList[]>([]);
  const blogListRef = collection(database, "blogPosts");
  const setSelectedPage = useSetRecoilState(currentViewPageState);

  useEffect(() => {
    if (isDataFetched.current) return;

    setLoading(true);

    const getBlogPosts = async () => {
      try {
        const blogQuery = query(blogListRef, orderBy("sortOrder", "desc"), limit(3));

        const data = (await getDocs(blogQuery)).docs.map((doc) => ({
          id: doc.id,
          heading: doc.data().heading,
          shortDescription: doc.data().shortDescription,
          blogDate: doc.data().blogDate,
          image: doc.data().coverImage,
        }));

        setBlogList(data);
        setLoading(false);
      } catch (_error) {
        setLoading(false);
      }
    };

    getBlogPosts();

    isDataFetched.current = true;
  }, [blogListRef]);

  return (
    <RecentPosts
      loading={loading}
      heading="Latest blog posts"
      handleSeerMore={() => {
        setSelectedPage("Blogs");
        navigate("/blog");
      }}
      children={blogList.map((blog, index) => (
        <Box
          key={index}
          onClick={() => navigate(`/blog?blogId=${blog.id}`)}
          sx={{
            ...customStyles.postBox,
            backgroundImage: blog?.image ? `url(${blog.image})` : "none",
          }}
        >
          <Stack sx={customStyles.innerPostStack}>
            <Typography sx={customStyles.postTitle}>{blog.heading}</Typography>

            <br />

            <Typography sx={customStyles.postDescription}>
              {blog.shortDescription}
            </Typography>
          </Stack>
        </Box>
      ))}
    />
  );
};

export default RecentBlogPosts;
