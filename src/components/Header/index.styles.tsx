import { colorPalette } from "../Shared/pageHelpers";

export const customStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
  },
  headerBox: {
    zIndex: 1,
    height: 70,
    position: "fixed",
    background: colorPalette.blackGrey,
  },
  contentBox: {
    width: "75vw",
    flexWrap: "wrap",
  },
  logoButton: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: colorPalette.blackGrey,
    flexDirection: {
      xs: "column",
      md: "row",
    },
  },
  logo: {
    color: "white",
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 25,
  },
  menuIcon: {
    color: "white",
    mt: -2,
  },
  buttonStack: {
    mt: {
      xs: -1,
      md: 0,
    },
    display: "flex",
  },
  button: {
    fontWeight: "bold",
  },
  emailButtonBox: {
    mb: {
      xs: 1,
      md: 0,
    },
  },
  emailButton: {
    border: "1px solid #fe6c0a",
    color: colorPalette.orangeColor,
    "&:hover": {
      border: "1px solid #fe6c0a",
      opacity: 0.8,
    },
  },
  ideasText: {
    fontSize: 12,
    mr: 1,
  },
  divider: {
    width: "75vw",
    background: "white",
  },
};
