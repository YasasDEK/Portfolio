import { Box, Stack, Typography, Divider, Card, Skeleton } from "@mui/material";
import { skeletonColor } from "../Shared/pageHelpers";

const customStyles = {
  drawer: {
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
  },
  title: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 25,
    color: "white",
  },
  skeletonCircle: {
    backgroundColor: skeletonColor,
    width: 50,
    height: 50,
  },
  skeletonText: {
    backgroundColor: skeletonColor,
  },
  card: {
    p: 2,
    background: "#18191d",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.8)",
  },
  divider: {
    mt: 1,
    borderColor: "white",
  },
  cardBox: {
    flexDirection: "row",
    display: "flex",
    gap: 2,
    alignItems: "center",
  },
};

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
