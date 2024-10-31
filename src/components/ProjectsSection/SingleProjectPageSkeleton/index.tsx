import { Box, Skeleton, Stack } from "@mui/material";
import { customStyles } from "./index.styles";

const SingleProjectPageSkeleton = () => (
  <Box sx={customStyles.mainBox}>
    <Skeleton sx={customStyles.topSkeleton} />

    <Skeleton sx={customStyles.secondSkeleton} />

    <Stack direction="row" spacing={2} mt={-2}>
      <Skeleton variant="text" sx={customStyles.thirdSkeleton} />

      <Skeleton sx={customStyles.fourthSkeleton} />
    </Stack>

    <Skeleton sx={customStyles.fifthSkeleton} />

    {Array.from({ length: 4 }).map((_, index) => (
      <Skeleton key={index} variant="text" sx={customStyles.sixthSkeleton} />
    ))}

    <Skeleton variant="text" sx={customStyles.seventhSkeleton} />

    <Skeleton sx={customStyles.eighthSkeleton} />

    {Array.from({ length: 4 }).map((_, index) => (
      <Skeleton key={index} variant="text" sx={customStyles.ninthSkeleton} />
    ))}

    <Skeleton variant="text" sx={customStyles.tenthSkeleton} />
  </Box>
);

export default SingleProjectPageSkeleton;
