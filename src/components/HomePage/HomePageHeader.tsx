import {
  Box,
  Stack,
  Typography,
  Avatar,
  useMediaQuery,
  Button,
} from "@mui/material";

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
              src={`${process.env.PUBLIC_URL}/images/profile-picture.png`}
              sx={{
                width: { xs: 150, sm: 180 },
                height: { xs: 150, sm: 180 },
                display: { xs: "flex", md: "none" },
              }}
            />
          </Box>

          <Typography
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

          <Box display="flex" justifyContent="center">
            <Button
              sx={{
                opacity: 0.8,
                color: "white",
                fontWeight: "bold",
                px: 2,
                mb: 3,
                border: "1px solid white",
                borderRadius: 50,
                display: { xs: "flex", md: "none" },
              }}
              href={`${process.env.PUBLIC_URL}/pdf/Yasas Dilshan Ekanayaka - CV.pdf`}
              download
            >
              ⏬ Download Resume
            </Button>
          </Box>

          <Typography
            maxWidth={{ xs: "100%", md: "95%" }}
            sx={{
              wordBreak: "break-word",
              textAlign: { xs: "center", md: "initial" },
              color: "white",
            }}
          >
            I'm a self-driven individual, constantly looking to push myself out
            of the comfort zone to develop myself. I'm a quick, independent
            learner, willing to try new things and accept challenges. My focus
            areas include Programming, Web development and Mobile development. I
            firmly believes that there are no good or bad experiences, but only
            experience.
          </Typography>

          <Typography
            sx={{
              mt: 2,
              wordBreak: "break-word",
              textAlign: { xs: "center", md: "initial" },
              color: "white",
            }}
          >
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
              sx={{
                opacity: 0.8,
                color: "white",
                fontWeight: "bold",
                px: 2,
                mt: 2,
                border: "1px solid white",
                borderRadius: 50,
                display: { xs: "none", md: "flex" },
              }}
              href={`${process.env.PUBLIC_URL}/pdf/Yasas Dilshan Ekanayaka - CV.pdf`}
              download
            >
              ⏬ Download Resume
            </Button>
          </Box>
        </Stack>

        <Box height="85%">
          <Avatar
            src={`${process.env.PUBLIC_URL}/images/profile-picture.png`}
            sx={{
              position: "relative",
              width: 200,
              height: 200,
              display: { xs: "none", md: "flex" },
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default HomePageHeader;
