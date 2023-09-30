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
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        zIndex={1}
        height={70}
        sx={{ position: "fixed", background: "#18191d" }}
      >
        <Box sx={{ width: "75vw", flexWrap: "wrap" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#18191d",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Button onClick={() => navigate("/")}>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Box sx={{ pt: 0.5 }}>
                  <img
                    width={40}
                    alt="logo"
                    src={`${process.env.PUBLIC_URL}/images/logoCircle.png`}
                  />
                </Box>

                <Typography
                  sx={{
                    color: "white",
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 25,
                  }}
                >
                  Yasas.EK
                </Typography>
              </Stack>
            </Button>

            {isSmallScreen && (
              <IconButton onClick={() => setShow(!show)} sx={{ mt: -2 }}>
                <MenuIcon sx={{ color: "white" }} />
              </IconButton>
            )}

            {(!isSmallScreen || show) && (
              <Stack
                sx={{
                  mt: { xs: -1, md: 0 },
                  display: "flex",
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
                      color: page === selectedPage ? "#fe6c0a" : "white",
                      fontWeight: "bold",
                    }}
                  >
                    {page}
                  </Button>
                ))}
              </Stack>
            )}

            {(!isSmallScreen || show) && (
              <Box sx={{ mb: { xs: 1, md: 0 } }}>
                <Link
                  to="mailto:ydilshan.ek@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outlined"
                    sx={{
                      border: "1px solid #fe6c0a",
                      color: "#fe6c0a",
                      "&:hover": {
                        border: "1px solid #fe6c0a",
                        opacity: 0.8,
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: 12, mr: 1 }}>
                      Drop your ideas
                    </Typography>

                    <EmailIcon />
                  </Button>
                </Link>
              </Box>
            )}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Divider sx={{ width: "75vw", background: "white" }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
