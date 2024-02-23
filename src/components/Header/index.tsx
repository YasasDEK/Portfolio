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
import { colorPalette } from "../Shared/pageHelpers";
import { customStyles } from "./index.styles";

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
