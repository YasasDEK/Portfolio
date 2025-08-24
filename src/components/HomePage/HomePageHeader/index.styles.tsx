import { colorPalette } from "../../Shared/pageHelpers";

export const customStyles = {
  mainBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    width: "100%",
    position: "relative",
  },
  contentOverlay: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    px: { xs: 2, md: 8, lg: 10, xl: 35 },
  },
  mainStack: {
    display: "flex",
    justifyContent: {
      xs: "center",
      md: "space-between",
    },
    alignItems: {
      xs: "flex-start",
      md: "flex-start",
    },
    width: "100%",
    padding: {
      xs: 2,
      md: 4,
    },
  },
  avatarBox: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    mb: 2,
  },
  avatar: {
    width: {
      xs: 150,
      sm: 180,
    },
    height: {
      xs: 150,
      sm: 180,
    },
    display: {
      xs: "flex",
      md: "none",
    },
  },
  title: {
    wordBreak: "break-word",
    fontSize: {
      xs: 35,
      sm: 65,
    },
    fontWeight: "bold",
    color: "white",
    textAlign: "left",
  },
  subTitle: {
    wordBreak: "break-word",
    fontSize: {
      xs: 20,
      md: 30,
    },
    fontWeight: "bold",
    color: colorPalette.orangeColor,
    pb: 2,
    textAlign: "left",
    maxWidth: "100%",
  },
  description: {
    display: "inline",
    wordBreak: "break-word",
    textAlign: "left",
    fontSize: {
      xs: 16,
      md: 20,
    },
    color: "white",
    maxWidth: "100%",
  },
  topDownloadButton: {
    opacity: 0.8,
    color: "white",
    fontWeight: "bold",
    px: 2,
    mb: 3,
    border: "1px solid white",
    borderRadius: 50,
    display: { xs: "flex", md: "none" },
  },
  bottomDownloadButton: {
    mb: 4,
    opacity: 0.8,
    color: "white",
    fontWeight: "bold",
    px: 2,
    mt: 2,
    border: "1px solid white",
    borderRadius: 50,
  },
  bottomButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: { xs: 2, md: 4 },
    zIndex: 1,
  },
  bottomAvatar: {
    position: "relative",
    width: 200,
    height: 200,
    display: {
      xs: "none",
      md: "flex",
    },
  },
};
