import { Box, Skeleton, Stack } from "@mui/material";
import { skeletonColor } from "../Shared/pageHelpers";

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
        backgroundColor: skeletonColor,
      }}
    />

    <Skeleton
      sx={{
        mt: -12,
        height: 85,
        width: { xs: "100%", md: "50%", xl: "30%" },
        backgroundColor: skeletonColor,
      }}
    />

    <Stack direction="row" spacing={2} sx={{ mt: -2 }}>
      <Skeleton
        variant="text"
        sx={{
          height: 55,
          width: { xs: "25%", md: "20%", xl: "10%" },
          backgroundColor: skeletonColor,
        }}
      />

      <Skeleton
        sx={{
          height: 55,
          width: { xs: "25%", md: "20%", xl: "10%" },
          backgroundColor: skeletonColor,
        }}
      />
    </Stack>

    <Skeleton
      sx={{
        mt: 2,
        height: 60,
        width: { xs: "100%", md: "60%", xl: "40%" },
        backgroundColor: skeletonColor,
      }}
    />

    {Array.from({ length: 4 }).map((_, index) => (
      <Skeleton
        key={index}
        variant="text"
        sx={{ height: 30, backgroundColor: skeletonColor }}
      />
    ))}

    <Skeleton
      variant="text"
      sx={{
        height: 30,
        width: "75%",
        backgroundColor: skeletonColor,
      }}
    />

    <Skeleton
      sx={{
        mt: 2,
        height: 60,
        width: { xs: "100%", md: "60%", xl: "40%" },
        backgroundColor: skeletonColor,
      }}
    />

    {Array.from({ length: 4 }).map((_, index) => (
      <Skeleton
        key={index}
        variant="text"
        sx={{ height: 30, backgroundColor: skeletonColor }}
      />
    ))}

    <Skeleton
      variant="text"
      sx={{
        height: 30,
        width: "75%",
        backgroundColor: skeletonColor,
      }}
    />
  </Box>
);

export default SingleProjectPageSkeleton;
