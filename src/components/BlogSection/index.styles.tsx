import { colorPalette } from "../Shared/pageHelpers";

export const customStyles = {
  textField: {
    width: {
      xs: "100%",
      sm: "25%",
    },
    background: "white",
    borderRadius: 2,
    border: "1px solid #fe6c0a",
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "transparent",
      },
      "&.Mui-focused fieldset": {
        borderColor: "transparent",
      },
    },
    mt: {
      xs: 2,
      sm: 0,
    },
  },
  paginationBox: {
    mt: 12,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    bottom: 0,
  },
  pagination: {
    color: "white",
    "& .MuiPaginationItem-root": {
      color: "white",
    },
    "& .MuiPaginationItem-root.Mui-selected": {
      "&:hover": {
        backgroundColor: colorPalette.orangeColor,
        opacity: 0.8,
      },
      color: "white",
      backgroundColor: colorPalette.orangeColor,
    },
  },
  blog: {
    cursor: "pointer",
    width: {
      xs: "100%",
      md: "45%",
      xl: "30%",
    },
    height: 350,
    mt: 4,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "end",
    borderRadius: 1,
    "&:hover": {
      opacity: 0.8,
      height: 346,
      width: {
        xs: "100%",
        md: "44.7%",
        xl: "29.7%",
      },
      border: "2px solid #fe6c0a",
    },
  },
  blogStack: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: 100,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    mb: 2,
    p: 1,
  },
  heading: {
    wordBreak: "break-word",
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 24,
    color: colorPalette.orangeColor,
    textAlign: "center",
    mb: 2,
  },
  description: {
    wordBreak: "break-word",
    mt: -2,
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  outerBox: {
    display: "flex",
    justifyContent: "center",
  },
  innerBox: {
    mt: {
      xs: 2,
      md: 0,
    },
    width: "75vw",
    flexWrap: "wrap",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: { xs: "column", sm: "row" },
  },
  postHeading: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  icon: {
    color: colorPalette.orangeColor,
  },
  detailsOuterBox: {
    display: "flex",
    justifyContent: "center",
  },
  detailsStack: {
    mt: 2,
    width: "75vw",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  noResultBox: {
    width: "100%",
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  noResultIcon: {
    color: "white",
    fontSize: 75,
    fontWeight: "bold",
    textAlign: "center",
  },
  noResultText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
};
