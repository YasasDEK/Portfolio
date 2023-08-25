import { Box, Skeleton, Stack } from "@mui/material";

const SingleProjectPageSkeleton = () => (
  <Box sx={{ width: "75vw", flexWrap: "wrap" }}>
    <Skeleton
      sx={{
        my: -10,
        width: "100%",
        height: 550,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
        borderRadius: 2,
        justifyContent: "center",
        alignItems: "end",
      }}
    />

    <Skeleton
      sx={{ mt: -12, height: 85, width: { xs: "100%", md: "50%", xl: "30%" } }}
    />

    <Stack direction="row" spacing={2} sx={{ mt: -2 }}>
      <Skeleton
        variant="text"
        sx={{ height: 55, width: { xs: "25%", md: "20%", xl: "10%" } }}
      />

      <Skeleton
        sx={{ height: 55, width: { xs: "25%", md: "20%", xl: "10%" } }}
      />
    </Stack>

    <Skeleton
      sx={{ mt: 2, height: 60, width: { xs: "100%", md: "60%", xl: "40%" } }}
    />

    {Array.from({ length: 4 }).map((_, index) => (
      <Skeleton key={index} variant="text" sx={{ height: 30 }} />
    ))}

    <Skeleton variant="text" sx={{ height: 30, width: "75%" }} />

    <Skeleton
      sx={{ mt: 2, height: 60, width: { xs: "100%", md: "60%", xl: "40%" } }}
    />

    {Array.from({ length: 4 }).map((_, index) => (
      <Skeleton key={index} variant="text" sx={{ height: 30 }} />
    ))}

    <Skeleton variant="text" sx={{ height: 30, width: "75%" }} />
  </Box>
);

export default SingleProjectPageSkeleton;
