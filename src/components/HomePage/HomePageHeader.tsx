import { Box, Stack, Typography, Avatar } from "@mui/material";
import Footer from "../Footer";

const HomePageHeader = () => {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "space-between" },
            alignItems: { xs: "none", md: "center" },
            width: "75vw",
          }}
        >
          <Box display="flex" justifyContent="center">
            <Avatar
              sx={{
                width: 150,
                height: 150,
                pb: { xs: 2, md: 0 },
                display: { xs: "flex", md: "none" },
              }}
            />
          </Box>

          <Stack
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
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
              "A self-driven individual, constantly looking to push himself out
              of his comfort zone to develop himself. A quick, independent
              learner, willing to try new things and accept challenges. Focus
              areas include Programming, web development and mobile development.
              Firmly believes that there are no good or bad experiences, but
              only experience."
            </Typography>
          </Stack>

          <Avatar
            sx={{
              width: 150,
              height: 150,
              display: { xs: "none", md: "flex" },
            }}
          />
        </Stack>
      </Box>
    </>
  );
};

export default HomePageHeader;
