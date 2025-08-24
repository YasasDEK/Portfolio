import { colorPalette } from "../../Shared/pageHelpers";

export const customStyles = {
  list: { mb: 1 },
  headingSection: {
    mt: 2,
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    justifyContent: { xs: "center", md: "space-between" },
    alignItems: "center",
  },
  mainBox: { display: "flex", justifyContent: "center" },
  commentBox: {
    mt: 4,
    px: {
      sm: 0,
      lg: 12,
    },
  },
  headingTypography: {
    color: "white",
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 40,
    textAlign: { xs: "center", md: "start" },
  },
  metaBox: {
    p: 0,
    m: 0,
    display: "flex",
    flexDirection: { xs: "row", md: "column" },
  },
  dateTypography: {
    color: "white",
    fontSize: 14,
    justifyItem: "end",
    mb: {
      xs: 2,
      md: 0,
    },
  },
  divider: {
    backgroundColor: colorPalette.darkGrey,
  },
  headingBox: {
    px: { xs: 0, lg: 10 },
  },
  readTimeTypography: {
    color: "white",
    fontSize: 14,
    display: "flex",
    justifyContent: {
      xs: "start",
      md: "end",
    },
  },
  iconButtonSection: {
    direction: "row",
    alignItems: "top",
    spacing: 1,
  },
  iconButtonTooltip: {
    p: 0,
  },
  iconButton: {
    color: "white",
    "&:hover": {
      color: colorPalette.orangeColor,
    },
  },
  shortDescriptionSection: {
    py: 2,
    gap: 4,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tagTypography: {
    color: colorPalette.orangeColor,
    fontSize: 14,
    pr: 0.5,
  },
  descriptionTypography: {
    color: "white",
    fontSize: 18,
  },
  typography: {
    color: "rgba(0, 0, 0, 0.6)",
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 18,
  },
  textField: {
    mt: 2,
    width: { xs: "100%", lg: 180 },
    backgroundColor: colorPalette.orangeColor,
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 20,
    "&:hover": {
      background: colorPalette.orangeColor,
      opacity: 0.8,
    },
    "&:disabled": {
      backgroundColor: colorPalette.orangeColor,
      color: "white",
      opacity: 0.5,
    },
  },
  box: {
    gap: 2,
    flexDirection: { xs: "column", lg: "row" },
    display: "flex",
    justifyContent: "end",
    mt: 2,
  },
  formLabel: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 25,
  },
  stack: {
    mt: 2,
  },
  subHeadingTypography: {
    color: colorPalette.orangeColor,
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 24,
  },
  paragraphBox: {
    color: "white",
  },

  singlePageBox: {
    pt: 16,
    width: "75vw",
    flexWrap: "wrap",
  },
  coverImageBox: {
    width: "100%",
    height: 350,
    backgroundColor: "white",
    backgroundPosition: "center",
    display: "flex",
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "end",
  },
  singlePageTypography: {
    mt: 4,
    color: "white",
    fontSize: 16,
  },
  singlePageStack: {
    p: 4,
    backgroundColor: colorPalette.lightGrey,
    borderRadius: 2,
  },
  tagsBox: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
  },
  progressIcon: {
    color: "white",
    ml: 1,
  },
  snippet: {
    background: "grey",
    px: 1,
    my: 2,
    py: 0.5,
    borderLeft: 20,
  },
  link: {
    color: "white",
    fontWeight: "bold",
  },
  linkButton: {
    pl: 0,
    textTransform: "none",
    color: colorPalette.orangeColor,
    "&:hover": {
      opacity: 0.8,
    },
  },
  icon: {
    px: 2,
  },
  boldHeading: {
    fontWeight: "bold",
    mb: 1,
    mt: 2,
  },
};
