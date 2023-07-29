import { Box } from "@mui/material";
import HomePageHeader from "./HomePageHeader";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentViewPageState } from "../../State/atom";
import BlogSection from "../BlogSection";
import ProjectsSection from "../ProjectsSection";
import Footer from "../Footer";
import Header from "../Header";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const location = useLocation();
  const [selectedPage, setSelectedPage] = useRecoilState(currentViewPageState);

  useEffect(() => {
    const path = window.location.pathname;
    const sections = path.split("/").filter((section) => section !== "");
    const firstSection = sections.length > 0 ? sections[0] : "";

    if (firstSection === "") {
      setSelectedPage("Home");
    } else if (firstSection === "blog") {
      setSelectedPage("Blog");
    } else if (firstSection === "projects") {
      setSelectedPage("Projects");
    }
  });

  return (
    <Box>
      <Header />

      <Box sx={{ pt: 12 }}>
        {selectedPage === "Home" && <HomePageHeader />}
        {selectedPage === "Blog" && <BlogSection />}
        {selectedPage === "Projects" && <ProjectsSection />}
      </Box>

      <Footer />
    </Box>
  );
};

export default HomePage;
