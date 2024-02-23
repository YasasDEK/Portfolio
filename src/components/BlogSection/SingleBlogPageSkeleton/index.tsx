import { colorPalette } from "../../Shared/pageHelpers";

export const customStyles = {
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
    backgroundColor: colorPalette.skeletonColor,
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
    backgroundColor: colorPalette.skeletonColor,
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
    backgroundColor: colorPalette.skeletonColor,
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
    backgroundColor: colorPalette.skeletonColor,
  },
  bottomInfoSkeleton: {
    height: 30,
    width: "25vw",
    backgroundColor: colorPalette.skeletonColor,
  },
  iconStack: {
    direction: "row",
    spacing: 2,
  },
  iconSkeleton: {
    height: 30,
    width: 30,
    backgroundColor: colorPalette.skeletonColor,
  },
  additionalSkeleton: {
    height: 30,
    backgroundColor: colorPalette.skeletonColor,
  },
  longTextSkeleton: {
    height: 30,
    width: "75%",
    backgroundColor: colorPalette.skeletonColor,
    mb: 4,
  },
};
