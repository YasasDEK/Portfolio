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
import { database } from "../../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import DrawerSkeleton from "../DrawerSkeleton";
import { customStyles } from "./index.styles";

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
