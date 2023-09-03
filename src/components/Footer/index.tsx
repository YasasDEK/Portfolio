import { Box, IconButton, Stack, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";

const Footer = () => {
  const iconButtonStyles = {
    color: "white",
    "&:hover": {
      color: "#fe6c0a",
    },
  };

  return (
    <Box
      width="100vw"
      minHeight={70}
      sx={{
        background: "#3a3a3a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 10,
        flexWrap: "wrap",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{
          width: "75vw",
          flexWrap: "wrap",
          display: "flex",
          justifyContent: { xs: "center", md: "space-between" },
          alignItems: "center",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Box sx={{ pt: 0.5 }}>
            <img
              width={40}
              alt="logo"
              src={`${process.env.PUBLIC_URL}/images/logoCircle.png`}
            />
          </Box>

          <Box sx={{ pt: 0.5 }}>
            <Typography
              sx={{
                color: "white",
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 25,
              }}
            >
              Yasas.EK
            </Typography>
          </Box>
        </Stack>

        <Box>
          <Link
            to="https://www.facebook.com/yasas.ekanayaka/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton>
              <FacebookIcon sx={iconButtonStyles} />
            </IconButton>
          </Link>

          <Link
            to="https://www.linkedin.com/in/yasas-dilshan-ekanayaka/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton>
              <LinkedInIcon sx={iconButtonStyles} />
            </IconButton>
          </Link>

          <Link
            to="https://github.com/YasasDEK"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton>
              <GitHubIcon sx={iconButtonStyles} />
            </IconButton>
          </Link>

          <Link
            to="https://www.instagram.com/yasas_ek/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton>
              <InstagramIcon sx={iconButtonStyles} />
            </IconButton>
          </Link>
        </Box>

        <Typography
          sx={{ color: "white", textAlign: "center" }}
        >{`© 2023 - Yasas.EK | All right reserved`}</Typography>
      </Stack>
    </Box>
  );
};

export default Footer;
