import { Box, Skeleton, Stack } from "@mui/material";
import { skeletonColor } from "../Shared/pageHelpers";

const customStyles = {
  mainContainer: {
    width: "75vw",
    flexWrap: "wrap",
  },
  featuredImage: {
    my: -10,
    width: "100%",
    height: 550,
    display: "flex",
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "end",
    backgroundColor: skeletonColor,
  },
  contentBox: {
    px: {
      xs: 0,
      lg: 20,
    },
  },
  titleBox: {
    display: "flex",
    flexDirection: {
      xs: "column",
      md: "row",
    },
    justifyContent: {
      xs: "start",
      md: "space-between",
    },
    alignItems: "center",
  },
  titleSkeleton: {
    height: 60,
    width: {
      xs: "100%",
      md: "60%",
      xl: "40%",
    },
    backgroundColor: skeletonColor,
  },
  metaDataBox: {
    display: "flex",
    flexDirection: {
      xs: "row",
      md: "column",
    },
  },
  metaDataSkeleton: {
    width: {
      xs: "20vw",
      md: "10vw",
    },
    backgroundColor: skeletonColor,
    ml: {
      xs: 2,
      md: 0,
    },
  },
  additionalInfoBox: {
    py: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoTextStack: {
    direction: "column",
  },
  infoSkeleton: {
    height: 50,
    width: "30vw",
    backgroundColor: skeletonColor,
  },
  bottomInfoSkeleton: {
    height: 30,
    width: "25vw",
    backgroundColor: skeletonColor,
  },
  iconStack: {
    direction: "row",
    spacing: 2,
  },
  iconSkeleton: {
    height: 30,
    width: 30,
    backgroundColor: skeletonColor,
  },
  additionalSkeleton: {
    height: 30,
    backgroundColor: skeletonColor,
  },
  longTextSkeleton: {
    height: 30,
    width: "75%",
    backgroundColor: skeletonColor,
    mb: 4,
  },
};

const SingleBlogPageSkeleton = () => (
  <Box sx={customStyles.mainContainer}>
    <Skeleton sx={customStyles.featuredImage} />

    <Box sx={customStyles.contentBox}>
      <Box sx={customStyles.titleBox}>
        <Skeleton sx={customStyles.titleSkeleton} />

        <Box sx={customStyles.metaDataBox}>
          <Skeleton sx={customStyles.metaDataSkeleton} />
          <Skeleton sx={customStyles.metaDataSkeleton} />
        </Box>
      </Box>

      <Box sx={customStyles.additionalInfoBox}>
        <Stack sx={customStyles.infoTextStack} direction="column">
          <Skeleton sx={customStyles.infoSkeleton} />
          <Skeleton sx={customStyles.bottomInfoSkeleton} />
        </Stack>

        <Stack sx={customStyles.iconStack}>
          <Skeleton sx={customStyles.iconSkeleton} />
          <Skeleton sx={customStyles.iconSkeleton} />
        </Stack>
      </Box>

      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          sx={customStyles.additionalSkeleton}
        />
      ))}

      <Skeleton sx={customStyles.longTextSkeleton} />

      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          sx={customStyles.additionalSkeleton}
        />
      ))}

      <Skeleton sx={customStyles.longTextSkeleton} />
    </Box>
  </Box>
);

export default SingleBlogPageSkeleton;
