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
            p: 0,
            m: 0,
            display: "flex",
            flexDirection: { xs: "row", md: "column" },
          }}
        >
          <Skeleton
            variant="text"
            sx={{ width: 150, backgroundColor: skeletonColor }}
          />

          <Skeleton variant="text" sx={{ backgroundColor: skeletonColor }} />
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
            sx={{ height: 50, width: 800, backgroundColor: skeletonColor }}
          />

          <Skeleton
            sx={{ height: 30, width: 200, backgroundColor: skeletonColor }}
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

        {/* {iconButtonSection} */}
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
