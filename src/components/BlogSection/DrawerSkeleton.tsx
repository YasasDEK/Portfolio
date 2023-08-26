import { Box, Stack, Typography, Divider, Card, Skeleton } from "@mui/material";
import { skeletonColor } from "../Shared/pageHelpers";

const DrawerSkeleton = () => (
  <Box
    sx={{
      background: "#18191d",
      width: {
        xs: "80vw",
        sm: "60vw",
        md: "45vw",
        lg: "35vw",
        xl: "30vw",
      },
      p: 2,
      minHeight: "100%",
    }}
  >
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography
        sx={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 25,
          color: "white",
        }}
      >
        Comments
      </Typography>

      <Skeleton
        sx={{ backgroundColor: skeletonColor }}
        variant="circular"
        width={30}
        height={30}
      />
    </Stack>

    <Divider sx={{ mt: 1, borderColor: "white" }} />

    <Stack spacing={2} sx={{ mt: 2 }}>
      {Array.from({ length: 4 }).map((_, index) => (
        <Card
          key={index}
          sx={{
            p: 2,
            background: "#18191d",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.8)",
          }}
        >
          <Box
            sx={{
              flexDirection: "row",
              display: "flex",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Skeleton
              variant="circular"
              sx={{ width: 50, height: 50, backgroundColor: skeletonColor }}
            />

            <Box>
              <Skeleton
                variant="text"
                width={120}
                sx={{ backgroundColor: skeletonColor }}
              />

              <Skeleton
                variant="text"
                width={80}
                sx={{ backgroundColor: skeletonColor }}
              />
            </Box>
          </Box>

          <Skeleton sx={{ mt: 2, backgroundColor: skeletonColor }} />
          <Skeleton sx={{ backgroundColor: skeletonColor }} />
          <Skeleton sx={{ backgroundColor: skeletonColor }} />
          <Skeleton sx={{ backgroundColor: skeletonColor }} />
          <Skeleton width={250} sx={{ backgroundColor: skeletonColor }} />
        </Card>
      ))}
    </Stack>
  </Box>
);

export default DrawerSkeleton;
