import { colorPalette } from "../../Shared/pageHelpers";

export const customStyles = {
  drawer: {
    background: colorPalette.blackGrey,
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
    backgroundColor: colorPalette.skeletonColor,
    width: 50,
    height: 50,
  },
  skeletonText: {
    backgroundColor: colorPalette.skeletonColor,
  },
  card: {
    p: 2,
    background: colorPalette.blackGrey,
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
