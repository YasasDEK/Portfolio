import { Box, Stack, Typography } from "@mui/material";

const Education = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Stack
        sx={{
          display: "flex",
          alignItems: "flex-start",
          width: "75vw",
        }}
      >
        <Typography sx={{ fontSize: 25, fontWeight: "bold" }}>
          Education
        </Typography>

        <Typography sx={{ color: "#fe6c0a", fontWeight: "bold" }}>
          BSc (Hons) in Computer Science | University of Colombo (2018- 2022) |
          GPA: 3.7583 - First class honours
        </Typography>
      </Stack>
    </Box>
  );
};

export default Education;
