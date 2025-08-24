import { Box, Stack, Typography, Button } from "@mui/material";
import { customStyles } from "./index.styles";
import { storage } from "../../../config/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import TypingAnimation from "../../Shared/TypingAnimation";

const HomePageHeader = () => {
  const [cvUrl, setCvUrl] = useState("");
  // const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const [cvUrl] = await Promise.all([
          getDownloadURL(ref(storage, "cv/Yasas Dilshan Ekanayaka - CV.pdf")),
          // getDownloadURL(ref(storage, "profile-picture/Yasas.png")),
        ]);

        setCvUrl(cvUrl);
        // setImageUrl(imageUrl);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchUrls();
  }, []);

  return (
    <Box sx={customStyles.mainBox}>
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      >
        <source
          src={`${process.env.PUBLIC_URL}/videos/background.mp4`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      <Box sx={customStyles.contentOverlay}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          sx={customStyles.mainStack}
        >
          <Stack
            sx={{
              ...customStyles.avatarBox,
              width: "100%",
            }}
          >
            {/* <Box sx={customStyles.avatarBox}>
            <Avatar src={imageUrl} sx={customStyles.avatar} />
          </Box> */}

            <TypingAnimation
              text="Hello, I'm Yasas Ekanayaka 👋"
              speed={80}
              delay={500}
              sx={customStyles.title}
            />

            <Typography sx={customStyles.subTitle}>
              Senior Software Engineer
            </Typography>

            {/* <Box display="flex" justifyContent="center">
              <Button sx={customStyles.topDownloadButton} href={cvUrl} download>
                ⏬ Download Resume
              </Button>
            </Box> */}
            <Typography sx={customStyles.description}>
              Driven by a passion for problem-solving, I create scalable digital
              solutions that deliver exceptional performance and user
              experiences. My approach blends technical precision with
              creativity, ensuring every line of code is clean, maintainable,
              and future-ready. I focus on building solutions that not only meet
              today's requirements but adapt seamlessly as needs evolve.
            </Typography>

            {/* <Typography mt={2} sx={customStyles.description}>
              Whether it’s leading a team, mentoring engineers, or delivering
              end-to-end features, I focus on collaboration, clarity, and
              craftsmanship to achieve shared success. Beyond engineering, I am
              driven by curiosity and continuous growth. Exploring new
              technologies, embracing challenges, and adapting to change keeps
              me inspired to push boundaries and create meaningful impact
            </Typography> */}
          </Stack>

          {/* <Box height="85%">
          <Avatar src={imageUrl} sx={customStyles.bottomAvatar} />
        </Box> */}
        </Stack>
      </Box>

      {/* Download Resume Button - Positioned at bottom of screen */}
      <Box sx={customStyles.bottomButtonContainer}>
        <Button sx={customStyles.bottomDownloadButton} href={cvUrl} download>
          ⏬ Download Resume
        </Button>
      </Box>
    </Box>
  );
};

export default HomePageHeader;
