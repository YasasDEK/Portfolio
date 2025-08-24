import { Box, Skeleton, Stack } from "@mui/material";
import { customStyles } from "./index.styles";

const SingleBlogPageSkeleton = () => (
  <Box sx={customStyles.mainContainer}>
    <Skeleton sx={customStyles.featuredImage} />

    <Box sx={customStyles.contentBox}>
      <Box sx={customStyles.titleBox}>
        <Skeleton sx={customStyles.titleSkeleton} />

        <Box sx={customStyles.metaDataBox}>
          <Skeleton sx={customStyles.metaDataSkeleton} />
          <Skeleton sx={customStyles.metaDataSkeleton} />
        </Box>
      </Box>

      <Box sx={customStyles.additionalInfoBox}>
        <Stack sx={customStyles.infoTextStack} direction="column">
          <Skeleton sx={customStyles.infoSkeleton} />
          <Skeleton sx={customStyles.bottomInfoSkeleton} />
        </Stack>

        <Stack sx={customStyles.iconStack}>
          <Skeleton sx={customStyles.iconSkeleton} />
          <Skeleton sx={customStyles.iconSkeleton} />
        </Stack>
      </Box>

      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          sx={customStyles.additionalSkeleton}
        />
      ))}

      <Skeleton sx={customStyles.longTextSkeleton} />

      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          sx={customStyles.additionalSkeleton}
        />
      ))}

      <Skeleton sx={customStyles.longTextSkeleton} />
    </Box>
  </Box>
);

export default SingleBlogPageSkeleton;
