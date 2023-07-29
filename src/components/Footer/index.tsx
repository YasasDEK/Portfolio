import { Box, Stack, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { currentViewPageState } from "../../State/atom";

const Footer = () => {
  const isHome = useRecoilValue(currentViewPageState);
  return (
    <Box
      zIndex={-1}
      width="100vw"
      height={70}
      sx={{
        background: "#3a3a3a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{
          width: "75vw",
          flexWrap: "wrap",
          display: "flex",
          justifyContent: { xs: "center", md: "space-between" },
        }}
      >
        <Typography sx={{ color: "white", textAlign: "center" }}>
          Yasas Dilshan Ekanayaka
        </Typography>

        <Typography
          sx={{ color: "white", textAlign: "center" }}
        >{`©2023 - YasasD>EK | All right reserved`}</Typography>
      </Stack>
    </Box>
  );
};

export default Footer;
