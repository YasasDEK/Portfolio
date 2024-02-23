import { colorPalette } from "../../Shared/pageHelpers";

export const customStyles = {
  mainBox: {
    display: "flex",
    justifyContent: "center",
    mt: {
      xs: 2,
      md: 0,
    },
  },
  mainStack: {
    display: "flex",
    justifyContent: {
      xs: "center",
      md: "space-between",
    },
    alignItems: {
      xs: "none",
      md: "center",
    },
    width: "75vw",
  },
  avatarBox: {
    display: "flex",
    justifyContent: "center",
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
      xs: 30,
      sm: 50,
    },
    fontWeight: "bold",
    color: "white",
    textAlign: {
      xs: "center",
      md: "initial",
    },
  },
  subTitle: {
    wordBreak: "break-word",
    fontSize: {
      xs: 15,
      md: 25,
    },
    fontWeight: "bold",
    color: colorPalette.orangeColor,
    pb: 2,
    textAlign: {
      xs: "center",
      md: "initial",
    },
    maxWidth: {
      xs: "100%",
      md: "75%",
    },
  },
  description: {
    wordBreak: "break-word",
    textAlign: {
      xs: "center",
      md: "initial",
    },
    color: "white",
    maxWidth: {
      xs: "100%",
      md: "95%",
    },
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
    display: { xs: "none", md: "flex" },
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
