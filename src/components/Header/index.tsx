import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { currentViewPageState } from "../../State/atom";
import { Link, useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const customStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
  },
  headerBox: {
    zIndex: 1,
    height: 70,
    position: "fixed",
    background: "#18191d",
  },
  contentBox: {
    width: "75vw",
    flexWrap: "wrap",
  },
  logoButton: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#18191d",
    flexDirection: {
      xs: "column",
      md: "row",
    },
  },
  logo: {
    color: "white",
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 25,
  },
  menuIcon: {
    color: "white",
    mt: -2,
  },
  buttonStack: {
    mt: {
      xs: -1,
      md: 0,
    },
    display: "flex",
  },
  button: {
    fontWeight: "bold",
  },
  emailButtonBox: {
    mb: {
      xs: 1,
      md: 0,
    },
  },
  emailButton: {
    border: "1px solid #fe6c0a",
    color: "#fe6c0a",
    "&:hover": {
      border: "1px solid #fe6c0a",
      opacity: 0.8,
    },
  },
  ideasText: {
    fontSize: 12,
    mr: 1,
  },
  divider: {
    width: "75vw",
    background: "white",
  },
};

const Header = () => {
  const navigate = useNavigate();
  const pages = ["Projects", "Home", "Blogs"];
  const [show, setShow] = useState(false);
  const [selectedPage, setSelectedPage] = useRecoilState(currentViewPageState);
  const isSmallScreen = useMediaQuery("(max-width:280px)");

  const handlePageChange = (page: "Projects" | "Home" | "Blogs") => {
    setSelectedPage(page);

    window.history.pushState(
      {},
      "",
      page === "Home" ? "/" : page.toLowerCase()
    );
  };

  return (
    <Box sx={customStyles.container}>
      <Box sx={customStyles.headerBox}>
        <Box sx={customStyles.contentBox}>
          <Box sx={customStyles.logoButton}>
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
                onClick={() => setShow(!show)}
                sx={customStyles.menuIcon}
              >
                <MenuIcon />
              </IconButton>
            )}

            {(!isSmallScreen || show) && (
              <Stack
                sx={{
                  ...customStyles.buttonStack,
                  flexDirection: isSmallScreen ? "column" : "row",
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
                      color: page === selectedPage ? "#fe6c0a" : "white",
                    }}
                  >
                    {page}
                  </Button>
                ))}
              </Stack>
            )}

            {(!isSmallScreen || show) && (
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

          <Box sx={customStyles.container}>
            <Divider sx={customStyles.divider} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
