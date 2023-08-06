import { Box } from "@mui/material";
import { useRecoilState } from "recoil";
import { currentViewPageState } from "../../State/atom";
import BlogSection from "../BlogSection";
import ProjectsSection from "../ProjectsSection";
import Footer from "../Footer";
import Header from "../Header";
import { useEffect } from "react";
import HomePageContent from "./HomePageContent";
import { useLocation } from "react-router-dom";
import SingleProject from "../ProjectsSection/singleProject";

const layoutStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
};

const contentStyle = {
  flex: "1 0 auto",
};

const HomePage = () => {
  const [selectedPage, setSelectedPage] = useRecoilState(currentViewPageState);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const projectId = queryParams.get("projectId");
  const blogId = queryParams.get("blogId");

  useEffect(() => {
    const path = window.location.pathname;
    const sections = path.split("/").filter((section) => section !== "");
    const firstSection = sections.length > 0 ? sections[0] : "";

    if (firstSection === "") {
      setSelectedPage("Home");
    } else if (firstSection === "blogs") {
      setSelectedPage("Blogs");
    } else if (firstSection === "blog" && blogId) {
      setSelectedPage("SingleBlog");
    } else if (firstSection === "projects") {
      setSelectedPage("Projects");
    } else if (firstSection === "project" && projectId) {
      setSelectedPage("SingleProject");
    }
  });

  return (
    <Box sx={layoutStyle}>
      <Box sx={contentStyle}>
        <Header />

        <Box sx={{ pt: 12 }}>
          {selectedPage === "Home" && <HomePageContent />}
          {selectedPage === "Blogs" && <BlogSection />}
          {/* {selectedPage === "SingleBlog" && <BlogSection />} */}
          {selectedPage === "Projects" && <ProjectsSection />}
          {selectedPage === "SingleProject" && <SingleProject />}
        </Box>
      </Box>

      <Box sx={{ display: "block", bottom: 0 }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default HomePage;
