import { Box } from "@mui/material";
import { useRecoilState } from "recoil";
import { currentViewPageState } from "../../State/atom";
import BlogSection from "../BlogSection";
import ProjectsSection from "../ProjectsSection";
import Footer from "../Footer";
import Header from "../Header";
import { useEffect } from "react";
import HomePageContent from "./HomePageContent";

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
    <Box sx={layoutStyle}>
      <Box sx={contentStyle}>
        <Header />

        <Box sx={{ pt: 12 }}>
          {selectedPage === "Home" && <HomePageContent />}
          {selectedPage === "Blog" && <BlogSection />}
          {selectedPage === "Projects" && <ProjectsSection />}
        </Box>
      </Box>

      <Box sx={{ display: "block", bottom: 0 }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default HomePage;
