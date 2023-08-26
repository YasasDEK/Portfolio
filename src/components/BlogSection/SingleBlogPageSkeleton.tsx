import { Box, Skeleton, Stack } from "@mui/material";
import { skeletonColor } from "../Shared/pageHelpers";

const SingleBlogPageSkeleton = () => (
  <Box sx={{ width: "75vw", flexWrap: "wrap" }}>
    <Skeleton
      sx={{
        my: -10,
        width: "100%",
        height: 550,
        display: "flex",
        borderRadius: 2,
        justifyContent: "center",
        alignItems: "end",
        backgroundColor: skeletonColor,
      }}
    />

    <Box sx={{ px: { xs: 0, lg: 20 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { xs: "start", md: "space-between" },
          alignItems: "center",
        }}
      >
        <Skeleton
          sx={{
            height: 60,
            width: { xs: "100%", md: "60%", xl: "40%" },
            backgroundColor: skeletonColor,
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "row", md: "column" },
          }}
        >
          <Skeleton
            variant="text"
            sx={{
              width: { xs: "20vw", md: "10vw" },
              backgroundColor: skeletonColor,
            }}
          />

          <Skeleton
            variant="text"
            sx={{
              ml: { xs: 2, md: 0 },
              width: { xs: "20vw", md: "10vw" },
              backgroundColor: skeletonColor,
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack direction="column">
          <Skeleton
            sx={{ height: 50, width: "30vw", backgroundColor: skeletonColor }}
          />

          <Skeleton
            sx={{ height: 30, width: "25vw", backgroundColor: skeletonColor }}
          />
        </Stack>

        <Stack direction="row" spacing={2}>
          <Skeleton
            variant="circular"
            sx={{ height: 30, width: 30, backgroundColor: skeletonColor }}
          />

          <Skeleton
            variant="circular"
            sx={{ height: 30, width: 30, backgroundColor: skeletonColor }}
          />
        </Stack>
      </Box>

      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          sx={{ height: 30, backgroundColor: skeletonColor }}
        />
      ))}

      <Skeleton
        variant="text"
        sx={{ height: 30, width: "75%", backgroundColor: skeletonColor, mb: 4 }}
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
        sx={{ height: 30, width: "75%", backgroundColor: skeletonColor }}
      />
    </Box>
  </Box>
);

export default SingleBlogPageSkeleton;
