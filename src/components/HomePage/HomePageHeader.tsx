import { Box, Stack, Typography, Avatar } from "@mui/material";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../../config/firebase";

const HomePageHeader = () => {
  const [profilePicture, setProfilePicture] = useState<string[]>([]);
  const imagesListRef = ref(storage, "profile-picture/");

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setProfilePicture((prev) => [...prev, url]);
        });
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", mt: { xs: 2, md: 0 } }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "space-between" },
          alignItems: { xs: "none", md: "center" },
          width: "75vw",
        }}
      >
        <Stack
          sx={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <Avatar
              src={profilePicture[0]}
              sx={{
                width: 150,
                height: 150,
                display: { xs: "flex", md: "none" },
              }}
            />
          </Box>

          <Typography
            sx={{
              fontSize: 50,
              fontWeight: "bold",
              color: "white",
              textAlign: { xs: "center", md: "initial" },
            }}
          >
            Hello, I'm Yasas 👋
          </Typography>

          <Typography
            maxWidth={{ xs: "100%", md: "75%" }}
            sx={{
              fontSize: 25,
              fontWeight: "bold",
              color: "#fe6c0a",
              pb: 2,
              textAlign: { xs: "center", md: "initial" },
            }}
          >
            Software Engineer
          </Typography>

          <Typography
            maxWidth={{ xs: "100%", md: "75%" }}
            sx={{
              textAlign: { xs: "center", md: "initial" },
              color: "white",
            }}
          >
            "A self-driven individual, constantly looking to push himself out of
            his comfort zone to develop himself. A quick, independent learner,
            willing to try new things and accept challenges. Focus areas include
            Programming, web development and mobile development. Firmly believes
            that there are no good or bad experiences, but only experience."
          </Typography>
        </Stack>

        <Avatar
          src={profilePicture[0]}
          sx={{
            width: 150,
            height: 150,
            display: { xs: "none", md: "flex" },
          }}
        />
      </Stack>
    </Box>
  );
};

export default HomePageHeader;
