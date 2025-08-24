import { colorPalette } from "../../Shared/pageHelpers";

export const customStyles = {
  mainBox: {
    width: "75vw",
    flexWrap: "wrap",
  },
  topSkeleton: {
    my: -15,
    width: "100%",
    height: 550,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    display: "flex",
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "end",
    backgroundColor: colorPalette.skeletonColor,
  },
  secondSkeleton: {
    mt: -12,
    height: 85,
    width: {
      xs: "100%",
      md: "50%",
      xl: "30%",
    },
    backgroundColor: colorPalette.skeletonColor,
  },
  thirdSkeleton: {
    height: 55,
    width: {
      xs: "25%",
      md: "20%",
      xl: "10%",
    },
    backgroundColor: colorPalette.skeletonColor,
  },
  fourthSkeleton: {
    height: 55,
    width: {
      xs: "25%",
      md: "20%",
      xl: "10%",
    },
    backgroundColor: colorPalette.skeletonColor,
  },
  fifthSkeleton: {
    mt: 2,
    height: 60,
    width: {
      xs: "100%",
      md: "60%",
      xl: "40%",
    },
    backgroundColor: colorPalette.skeletonColor,
  },
  sixthSkeleton: {
    height: 30,
    backgroundColor: colorPalette.skeletonColor,
  },
  seventhSkeleton: {
    height: 30,
    width: "75%",
    backgroundColor: colorPalette.skeletonColor,
  },
  eighthSkeleton: {
    mt: 2,
    height: 60,
    width: {
      xs: "100%",
      md: "60%",
      xl: "40%",
    },
    backgroundColor: colorPalette.skeletonColor,
  },
  ninthSkeleton: {
    height: 30,
    backgroundColor: colorPalette.skeletonColor,
  },
  tenthSkeleton: {
    height: 30,
    width: "75%",
    backgroundColor: colorPalette.skeletonColor,
  },
};
