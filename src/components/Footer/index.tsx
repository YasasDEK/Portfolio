import { Box, IconButton, Stack, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";

const customStyles = {
  container: {
    minHeight: 70,
    background: "#3a3a3a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mt: 10,
    flexWrap: "wrap",
  },
  stack: {
    width: "75vw",
    flexWrap: "wrap",
    display: "flex",
    justifyContent: {
      xs: "center",
      md: "space-between",
    },
    alignItems: "center",
  },
  title: {
    color: "white",
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 25,
  },
  iconLink: {
    color: "white",
    "&:hover": {
      color: "#fe6c0a",
    },
  },
  text: {
    wordBreak: "break-word",
    color: "white",
    textAlign: "center",
  },
};

const Footer = () => {
  return (
    <Box sx={customStyles.container}>
      <Stack direction={{ xs: "column", md: "row" }} sx={customStyles.stack}>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Box pt={0.5}>
            <img
              width={40}
              alt="logo"
              src={`${process.env.PUBLIC_URL}/images/logoCircle.png`}
            />
          </Box>

          <Box pt={0.5}>
            <Typography sx={customStyles.title}>Yasas.EK</Typography>
          </Box>
        </Stack>

        <Box>
          <Link
            to="https://www.facebook.com/yasas.ekanayaka/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton>
              <FacebookIcon sx={customStyles.iconLink} />
            </IconButton>
          </Link>

          <Link
            to="https://www.linkedin.com/in/yasas-dilshan-ekanayaka/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton>
              <LinkedInIcon sx={customStyles.iconLink} />
            </IconButton>
          </Link>

          <Link
            to="https://github.com/YasasDEK"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton>
              <GitHubIcon sx={customStyles.iconLink} />
            </IconButton>
          </Link>

          <Link
            to="https://www.instagram.com/yasas_ek/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton>
              <InstagramIcon sx={customStyles.iconLink} />
            </IconButton>
          </Link>
        </Box>

        <Typography sx={customStyles.text}>
          {`© 2023 - Yasas.EK | All right reserved`}
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;
