import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { currentViewPageState } from "../../State/atom";
import { Link, useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect } from "react";
import { colorPalette } from "../Shared/pageHelpers";
import { customStyles } from "./index.styles";

const Header = () => {
  const navigate = useNavigate();
  const pages = ["Projects", "Home", "Blogs"];
  const drawerPages = ["Home", "Projects", "Blogs"];
  // const [show, setShow] = useState(false);
  const [selectedPage, setSelectedPage] = useRecoilState(currentViewPageState);
  const [isScrolled, setIsScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePageChange = (page: "Projects" | "Home" | "Blogs") => {
    setSelectedPage(page);
    setSidebarOpen(false); // Close sidebar when page changes

    window.history.pushState(
      {},
      "",
      page === "Home" ? "/" : page.toLowerCase()
    );
  };

  return (
    <Box sx={customStyles.container}>
      <Box
        sx={{
          ...customStyles.headerBox,
          background: isScrolled ? colorPalette.blackGrey : "transparent",
          transition: "background-color 0.3s ease",
        }}
      >
        <Box sx={customStyles.contentBox}>
          <Box
            sx={{
              ...customStyles.logoButton,
              background: isScrolled ? colorPalette.blackGrey : "transparent",
              transition: "background-color 0.3s ease",
            }}
          >
            <Button onClick={() => navigate("/")}>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Box pt={0.5}>
                  <img
                    width={40}
                    alt="logo"
                    src={`${process.env.PUBLIC_URL}/images/logoCircle.png`}
                  />
                </Box>

                <Typography sx={customStyles.logo}>Yasas.EK</Typography>
              </Stack>
            </Button>

            {isSmallScreen && (
              <IconButton
                onClick={() => setSidebarOpen(true)}
                sx={customStyles.menuIcon}
              >
                <MenuIcon />
              </IconButton>
            )}

            {!isSmallScreen && (
              <Stack
                sx={{
                  ...customStyles.buttonStack,
                  flexDirection: "row",
                }}
              >
                {pages.map((page) => (
                  <Button
                    variant="text"
                    onClick={() =>
                      handlePageChange(page as "Projects" | "Home" | "Blogs")
                    }
                    key={page}
                    sx={{
                      ...customStyles.button,
                      color:
                        page === selectedPage
                          ? colorPalette.orangeColor
                          : "white",
                    }}
                  >
                    {page}
                  </Button>
                ))}
              </Stack>
            )}

            {!isSmallScreen && (
              <Box sx={customStyles.emailButtonBox}>
                <Link
                  to="mailto:ydilshan.ek@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outlined" sx={customStyles.emailButton}>
                    <Typography sx={customStyles.ideasText}>
                      Drop your ideas
                    </Typography>
                    <EmailIcon />
                  </Button>
                </Link>
              </Box>
            )}
          </Box>

          <Divider sx={customStyles.divider} />
        </Box>
      </Box>

      {/* Sidebar for mobile */}
      <Drawer
        anchor="right"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sx={customStyles.drawer}
      >
        <Box sx={customStyles.drawerContent}>
          <Box sx={customStyles.drawerHeader}>
            <Typography sx={customStyles.drawerTitle}>Menu</Typography>
            <IconButton
              onClick={() => setSidebarOpen(false)}
              sx={customStyles.closeButton}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <List sx={customStyles.drawerList}>
            {drawerPages.map((page) => (
              <ListItem key={page} >
                <ListItemButton 
                  onClick={() =>
                    handlePageChange(page as "Projects" | "Home" | "Blogs")
                  }
                  sx={{
                    ...customStyles.drawerItem,
                    color:
                      page === selectedPage
                        ? colorPalette.orangeColor
                        : "white",
                  }}
                >
                  <ListItemText primary={page} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box sx={customStyles.drawerEmailBox}>
            <Link
              to="mailto:ydilshan.ek@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Button variant="outlined" sx={customStyles.drawerEmailButton}>
                <Typography sx={customStyles.drawerIdeasText}>
                  Drop your ideas
                </Typography>
                <EmailIcon />
              </Button>
            </Link>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Header;
