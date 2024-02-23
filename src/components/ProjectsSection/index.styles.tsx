import { colorPalette } from "../Shared/pageHelpers";

export const customStyles = {
  titleBoxStyles: {
    width: "75vw",
    flexWrap: "wrap",
  },
  titleStyles: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    display: "flex",
    justifyContent: "center",
    mt: {
      xs: 2,
      md: -1,
    },
  },
  contentBoxStyles: {
    display: "flex",
    justifyContent: "center",
  },
  stackStyles: {
    width: "75vw",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  projectBoxStyles: {
    cursor: "pointer",
    width: { xs: "100%", md: "45%", xl: "30%" },
    height: 350,
    mt: 4,
    backgroundSize: "cover",
    backgroundColor: "white",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "end",
    "&:hover": {
      opacity: 0.8,
      height: 346,
      width: { xs: "100%", md: "44.7%", xl: "29.7%" },
      border: "2px solid #fe6c0a",
    },
  },
  innerStackStyles: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: 100,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    mb: 2,
    p: 1,
  },
  projectTitleStyles: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 24,
    color: colorPalette.orangeColor,
    textAlign: "center",
    wordBreak: "break-word",
  },
  projectDescriptionStyles: {
    mt: -2,
    fontSize: 14,
    color: "white",
    textAlign: "center",
    wordBreak: "break-word",
  },
  containerStyles: {
    pb: 8,
    pt: 2,
  },
  centerBox: {
    display: "flex",
    justifyContent: "center",
  },
};
