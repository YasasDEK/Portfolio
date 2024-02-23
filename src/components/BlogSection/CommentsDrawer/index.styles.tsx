import { colorPalette } from "../../Shared/pageHelpers";

export const customStyles = {
  drawer: {
    backdropFilter: "blur(2px) !important",
  },
  drawerPaper: {
    background: colorPalette.blackGrey,
    width: {
      xs: "80vw",
      sm: "60vw",
      md: "45vw",
      lg: "35vw",
      xl: "30vw",
    },
    p: 2,
    height: "100%",
    overflow: "auto",
  },
  closeButton: {
    color: "white",
  },
  commentCard: {
    p: 2,
    background: colorPalette.blackGrey,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.8)",
  },
  avatar: {
    width: 50,
    height: 50,
  },
  commentText: {
    fontSize: 14,
    color: "white",
  },
  emptyCommentsContainer: {
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCommentsImage: {
    width: "100vw",
  },
  emptyCommentsText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    mt: 4,
    textAlign: "center",
  },
  header: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 25,
    color: "white",
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
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  email: {
    fontSize: 12,
    color: "white",
  },
  detailDivider: {
    mt: 2,
    mb: 1,
    borderColor: "white",
  },
};
