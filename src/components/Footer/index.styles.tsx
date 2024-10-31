import { colorPalette } from "../Shared/pageHelpers";

export const customStyles = {
  container: {
    minHeight: 70,
    background: colorPalette.cementGrey,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mt: 10,
    flexWrap: "wrap",
  },
  stack: {
    width: "75vw",
    flexWrap: "wrap",
    display: "flex",
    justifyContent: {
      xs: "center",
      md: "space-between",
    },
    alignItems: "center",
  },
  title: {
    color: "white",
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 25,
  },
  iconLink: {
    color: "white",
    "&:hover": {
      color: colorPalette.orangeColor,
    },
  },
  text: {
    wordBreak: "break-word",
    color: "white",
    textAlign: "center",
  },
};
