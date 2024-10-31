import { colorPalette } from "../pageHelpers";

export const customStyles = {
  outerBox: {
    display: "flex",
    justifyContent: "center",
  },
  innerBox: {
    width: "75vw",
    flexWrap: "wrap",
  },
  stack: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
  },
  title: {
    wordBreak: "break-word",
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  button: {
    fontSize: 13,
    fontWeight: "bold",
    color: colorPalette.orangeColor,
    border: "1px solid #fe6c0a",
    "&:hover": {
      opacity: 0.8,
      border: "1px solid #fe6c0a",
    },
    mt: { xs: 2, md: 0 },
  },
  postList: {
    width: "75vw",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  postBox: {
    cursor: "pointer",
    width: { xs: "100%", md: "30%" },
    height: 350,
    mt: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "end",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    "&:hover": {
      opacity: 0.8,
      height: 346,
      width: { xs: "100%", md: "29.7%" },
      border: "2px solid #fe6c0a",
    },
  },
  innerPostStack: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: 100,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    mb: 2,
    p: 2,
  },
  postTitle: {
    wordBreak: "break-word",
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 24,
    color: colorPalette.orangeColor,
    textAlign: "center",
  },
  postDescription: {
    wordBreak: "break-word",
    mt: -2,
    fontSize: 14,
    color: "white",
    textAlign: "center",
  },
};
