import { colorPalette } from "../../Shared/pageHelpers";

export const customStyles = {
  modal: {
    border: "0px !important",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(8px)",
  },
  modalContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  modalHeader: {
    width: "100%",
    direction: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    maxWidth: "100%",
    height: "80%",
  },
  galleryTitle: {
    mt: 4,
    color: colorPalette.orangeColor,
    fontSize: 20,
  },
  galleryImage: {
    cursor: "pointer",
    height: 300,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "end",
  },
  trialBox: {
    mt: 2,
    borderRadius: 2,
    py: 1,
  },
  divider: {
    borderColor: "white",
    mt: 1,
    mb: 1,
  },
  trialAnswer: {
    fontFamily: "Arial,Tahoma,sans-serif",
    color: "white",
    fontSize: 14,
  },
  featureBox: {
    mt: 2,
  },
  feature: {
    fontFamily: "Arial,Tahoma,sans-serif",
    color: "white",
    fontSize: 16,
  },
  durationBox: {
    backgroundColor: colorPalette.darkGrey,
    px: 1,
    py: 1,
    borderRadius: 2,
    mr: {
      xs: 0,
      md: 1,
    },
    flexWrap: "wrap",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  durationText: {
    color: colorPalette.orangeColor,
    fontSize: 12,
  },
  durationAndStack: {
    mt: 2,
    display: "flex",
    flexDirection: {
      xs: "column",
      md: "row",
      gap: 4,
    },
  },
  techStackContainer: {
    backgroundColor: colorPalette.darkGrey,
    px: 1,
    py: 1,
    mr: {
      xs: 0,
      md: 1,
    },
    borderRadius: 2,
    flexWrap: "wrap",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  linkBox: {
    mt: {
      xs: 2,
      md: 0,
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  linkButton: {
    border: 2,
    borderColor: "white",
    "&:hover": {
      borderColor: colorPalette.orangeColor,
      backgroundColor: colorPalette.orangeColor,
    },
  },
  rocketIyles: {
    color: "white",
  },
  singlePageContentContainer: {
    width: "75vw",
    flexWrap: "wrap",
  },
  imageContainer: {
    width: "100%",
    height: 350,
    backgroundColor: "white",
    backgroundPosition: "center",
    display: "flex",
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "end",
  },
  singlePageImage: {
    mt: 2,
    color: "white",
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 40,
    flexWrap: "wrap",
  },
  heading: {
    mt: 2,
    color: "white",
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 40,
    flexWrap: "wrap",
  },
  description: {
    mt: { xs: 2, md: 4 },
    color: "white",
    fontSize: 16,
  },
  mainBox: {
    pb: 8,
    pt: 12,
  },
  innerBox: {
    display: "flex",
    justifyContent: "center",
  },
  headingText: {
    color: "white",
  },
};
