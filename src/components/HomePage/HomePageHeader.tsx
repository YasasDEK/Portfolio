import { Box, Stack, Typography, Avatar, useMediaQuery } from "@mui/material";

const HomePageHeader = () => {
  const isSmallScreen = useMediaQuery("(max-width:280px)");

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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: isSmallScreen ? -4 : 2,
              mb: 2,
            }}
          >
            <Avatar
              src={`${process.env.PUBLIC_URL}/images/profile-picture.jpeg`}
              sx={{
                width: { xs: 120, sm: 150 },
                height: { xs: 120, sm: 150 },
                display: { xs: "flex", md: "none" },
              }}
            />
          </Box>

          <Typography
            maxWidth={{ xs: "100%", md: "75%" }}
            sx={{
              wordBreak: "break-word",
              fontSize: { xs: 30, sm: 50 },
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
              wordBreak: "break-word",
              fontSize: { xs: 15, md: 25 },
              fontWeight: "bold",
              color: "#fe6c0a",
              pb: 2,
              textAlign: { xs: "center", md: "initial" },
            }}
          >
            Senior Software Engineer
          </Typography>

          <Typography
            maxWidth={{ xs: "100%", md: "75%" }}
            sx={{
              wordBreak: "break-word",
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
          src={`${process.env.PUBLIC_URL}/images/profile-picture.jpeg`}
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
