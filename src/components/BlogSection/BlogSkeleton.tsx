import { Skeleton } from "@mui/material";

interface Props {
  index: number;
  home?: boolean;
}

const BlogSkeleton = ({ index, home }: Props) => (
  <Skeleton
    sx={{
      mt: {
        xs: index > 0 ? -18 : 0,
        md: home ? (index > 2 ? -18 : 0) : index > 1 ? -18 : 0,
        xl: index > 2 ? -18 : 0,
      },
      width: { xs: "100%", md: home ? "30%" : "45%", xl: "30%" },
      height: 550,
    }}
  />
);

export default BlogSkeleton;
