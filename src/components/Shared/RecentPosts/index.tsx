import { Box, Button, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import CustomSkeleton from "../CustomSkeleton";
import { customStyles } from "./index.styles";

interface Props {
  loading: boolean;
  heading: string;
  children: ReactNode;
  handleSeerMore: () => void;
}

const RecentPosts = ({ loading, heading, children, handleSeerMore }: Props) => {
  return (
    <Box sx={{ mb: loading ? -5 : 8 }}>
      <Box sx={customStyles.outerBox}>
        <Box sx={customStyles.innerBox}>
          <Stack
            justifyContent="space-between"
            alignItems="center"
            sx={customStyles.stack}
          >
            <Typography sx={customStyles.title}>{heading}</Typography>

            <Button
              variant="outlined"
              onClick={handleSeerMore}
              sx={customStyles.button}
            >
              See more
            </Button>
          </Stack>

          <Stack
            direction="row"
            sx={{ ...customStyles.postList, mt: loading ? -10 : 0 }}
          >
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <CustomSkeleton home={true} key={index} index={index} />
                ))
              : children}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default RecentPosts;
