import {
  Drawer,
  Box,
  Typography,
  Stack,
  IconButton,
  Divider,
  Card,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { database } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import DrawerSkeleton from "./DrawerSkeleton";

interface Props {
  open: boolean;
  blogId: string;
  handleClose: () => void;
}

interface Comment {
  name: string;
  email: string;
  comment: string;
  timeStamp: string;
}

const customStyles = {
  drawer: {
    backdropFilter: "blur(2px) !important",
  },
  drawerPaper: {
    background: "#18191d",
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
    background: "#18191d",
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

const CommentsDrawer = ({ open, handleClose, blogId }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const capitalizeWords = (sentence: string) => {
    const words = sentence.split(" ");

    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    return capitalizedWords.join(" ");
  };

  useEffect(() => {
    setLoading(true);

    const getComments = async () => {
      if (blogId) {
        try {
          const documentRef = doc(database, "blogPosts", blogId);

          const documentSnapshot = await getDoc(documentRef);

          setComments(documentSnapshot.data()?.comments);

          setLoading(false);
        } catch (_error) {
          setLoading(false);
        }
      }
    };

    getComments();
  }, [open, blogId]);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      sx={customStyles.drawer}
    >
      {loading ? (
        <DrawerSkeleton />
      ) : (
        <Box sx={customStyles.drawerPaper}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography sx={customStyles.header}>Comments</Typography>

            <IconButton onClick={handleClose}>
              <CloseIcon sx={customStyles.closeButton} />
            </IconButton>
          </Stack>

          <Divider sx={customStyles.divider} />

          <Stack spacing={2} mt={2}>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <Card key={index} sx={customStyles.commentCard}>
                  <Box sx={customStyles.cardBox}>
                    <Avatar
                      sx={customStyles.avatar}
                      src={`${process.env.PUBLIC_URL}/images/user.jpg`}
                    />

                    <Box>
                      <Typography sx={customStyles.name}>
                        {capitalizeWords(comment.name)}
                      </Typography>

                      <Typography sx={customStyles.email}>
                        {comment.email}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={customStyles.detailDivider} />

                  <Typography sx={customStyles.commentText}>
                    {comment.comment.charAt(0).toUpperCase() +
                      comment.comment.slice(1)}
                  </Typography>
                </Card>
              ))
            ) : (
              <Stack sx={customStyles.emptyCommentsContainer}>
                <img
                  width="100vw"
                  src={`${process.env.PUBLIC_URL}/images/addImage.gif`}
                  alt="add comment"
                />
                <Typography sx={customStyles.emptyCommentsText}>
                  Hurry!!! Be the first one to add a comment 😍
                </Typography>
              </Stack>
            )}
          </Stack>
        </Box>
      )}
    </Drawer>
  );
};

export default CommentsDrawer;
