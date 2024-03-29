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
import SingleProject from "../ProjectsSection/SingleProject";
import SingleBlog from "../BlogSection/SingleBlog";
import { customStyles } from "./index.styles";

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
    <Box sx={customStyles.layout}>
      <Box sx={customStyles.content}>
        <Header />

        <Box sx={customStyles.contentBox}>
          {selectedPage === "Home" && <HomePageContent />}
          {selectedPage === "Blogs" && <BlogSection />}
          {selectedPage === "SingleBlog" && <SingleBlog />}
          {selectedPage === "Projects" && <ProjectsSection />}
          {selectedPage === "SingleProject" && <SingleProject />}
        </Box>
      </Box>

      <Box sx={customStyles.footerBox}>
        <Footer />
      </Box>
    </Box>
  );
};

export default HomePage;
