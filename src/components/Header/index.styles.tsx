import { colorPalette } from "../Shared/pageHelpers";

export const customStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    zIndex: 1,
  },
  headerBox: {
    zIndex: 1,
    position: "fixed",
    width: "100%",
    top: 0,
    left: 0,
  },
  contentBox: {
    width: "100%",
    flexWrap: "wrap",
    maxWidth: "1200px",
    mx: "auto",
  },
  logoButton: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  logo: {
    color: "white",
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 25,
  },
  menuIcon: {
    color: "white",
    // mt: -2,
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
    mr: 1,
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
    width: "100vw",
    position: "absolute",
    left: 0,
    bottom: 0,
  },
  drawer: {
    "& .MuiDrawer-paper": {
      width: 280,
      background: colorPalette.blackGrey,
      border: "none",
    },
  },
  drawerContent: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  drawerHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    p: 2,
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  },
  drawerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    color: "white",
  },
  drawerList: {
    flex: 1,
  },
  drawerItem: {
    mb: -1,
    p: 0,
    fontSize: 18,
    fontWeight: "bold",
    // py: 2,
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  },
  drawerEmailBox: {
    p: 2,
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  },
  drawerEmailButton: {
    border: "1px solid #fe6c0a",
    color: colorPalette.orangeColor,
    width: "100%",
    "&:hover": {
      border: "1px solid #fe6c0a",
      opacity: 0.8,
    },
  },
  drawerIdeasText: {
    fontSize: 14,
    mr: 1,
  },
};
