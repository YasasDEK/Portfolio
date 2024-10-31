import { Box, Stack, Typography, Divider, Card, Skeleton } from "@mui/material";
import { customStyles } from "./index.styles";

const DrawerSkeleton = () => (
  <Box sx={customStyles.drawer}>
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography sx={customStyles.title}>Comments</Typography>

      <Skeleton sx={customStyles.skeletonCircle} variant="circular" />
    </Stack>

    <Divider sx={customStyles.divider} />

    <Stack spacing={2} mt={2}>
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index} sx={customStyles.card}>
          <Box sx={customStyles.cardBox}>
            <Skeleton variant="circular" sx={customStyles.skeletonCircle} />

            <Box>
              <Skeleton
                variant="text"
                sx={customStyles.skeletonText}
                width={120}
              />

              <Skeleton
                variant="text"
                sx={customStyles.skeletonText}
                width={80}
              />
            </Box>
          </Box>

          <Skeleton sx={customStyles.skeletonText} />
          <Skeleton sx={customStyles.skeletonText} />
          <Skeleton sx={customStyles.skeletonText} />
          <Skeleton sx={customStyles.skeletonText} />
          <Skeleton width={250} sx={customStyles.skeletonText} />
        </Card>
      ))}
    </Stack>
  </Box>
);

export default DrawerSkeleton;
