import {
  Box,
  Stack,
  Typography,
  Avatar,
  useMediaQuery,
  Button,
} from "@mui/material";
import { customStyles } from "./index.styles";
import { storage } from "../../../config/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";

const HomePageHeader = () => {
  const isSmallScreen = useMediaQuery("(max-width:280px)");

  const [cvUrl, setCvUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const [cvUrl, imageUrl] = await Promise.all([
          getDownloadURL(ref(storage, "cv/Yasas Dilshan Ekanayaka - CV.pdf")),
          getDownloadURL(ref(storage, "profile-picture/Yasas.png")),
        ]);

        setCvUrl(cvUrl);
        setImageUrl(imageUrl);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchUrls();
  }, []);

  return (
    <Box sx={customStyles.mainBox}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={customStyles.mainStack}
      >
        <Stack
          sx={{
            ...customStyles.avatarBox,
            width: "100%",
            mt: isSmallScreen ? -4 : 2,
          }}
        >
          <Box sx={customStyles.avatarBox}>
            <Avatar src={imageUrl} sx={customStyles.avatar} />
          </Box>

          <Typography sx={customStyles.title}>Hello, I'm Yasas 👋</Typography>

          <Typography sx={customStyles.subTitle}>
            Senior Software Engineer
          </Typography>

          <Box display="flex" justifyContent="center">
            <Button sx={customStyles.topDownloadButton} href={cvUrl} download>
              ⏬ Download Resume
            </Button>
          </Box>

          <Typography sx={customStyles.description}>
            I'm a self-driven individual, constantly looking to push myself out
            of the comfort zone to develop myself. I'm a quick, independent
            learner, willing to try new things and accept challenges. My focus
            areas include Programming, Web development and Mobile development. I
            firmly believes that there are no good or bad experiences, but only
            experience.
          </Typography>

          <Typography mt={2} sx={customStyles.description}>
            I'm a person who likes to challenge myself and learn new things. I
            enjoy working on computer stuff, like making websites and mobile
            apps. I believe that every experience, good or bad, helps us grow.
            Besides tech stuff, I like solving problems and being creative.
            Working with different people has taught me to see things from
            various perspectives. I'm always curious and like to keep up with
            the latest in technology. I'm excited about using my skills to work
            on cool projects and make a positive impact.
          </Typography>

          <Box display="flex">
            <Button
              sx={customStyles.bottomDownloadButton}
              href={cvUrl}
              download
            >
              ⏬ Download Resume
            </Button>
          </Box>
        </Stack>

        <Box height="85%">
          <Avatar src={imageUrl} sx={customStyles.bottomAvatar} />
        </Box>
      </Stack>
    </Box>
  );
};

export default HomePageHeader;
