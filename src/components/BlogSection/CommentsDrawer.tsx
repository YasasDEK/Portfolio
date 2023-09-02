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
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    };

    getComments();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      sx={{ backdropFilter: "blur(2px) !important" }}
    >
      {loading ? (
        <DrawerSkeleton />
      ) : (
        <Box
          sx={{
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
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              sx={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 25,
                color: "white",
              }}
            >
              Comments
            </Typography>

            <IconButton onClick={handleClose}>
              <CloseIcon sx={{ color: "white" }} />
            </IconButton>
          </Stack>

          <Divider sx={{ mt: 1, borderColor: "white" }} />

          <Stack spacing={2} sx={{ mt: 2 }}>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <Card
                  key={index}
                  sx={{
                    p: 2,
                    background: "#18191d",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.8)",
                  }}
                >
                  <Box
                    sx={{
                      flexDirection: "row",
                      display: "flex",
                      gap: 2,
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      sx={{ width: 50, height: 50 }}
                      src={`${process.env.PUBLIC_URL}/images/user.jpg`}
                    />

                    <Box>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: 16,
                          color: "white",
                        }}
                      >
                        {capitalizeWords(comment.name)}
                      </Typography>

                      <Typography sx={{ fontSize: 12, color: "white" }}>
                        {comment.email}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ mt: 2, mb: 1, borderColor: "white" }} />

                  <Typography sx={{ fontSize: 14, color: "white" }}>
                    {comment.comment.charAt(0).toUpperCase() +
                      comment.comment.slice(1)}
                  </Typography>
                </Card>
              ))
            ) : (
              <Stack
                sx={{
                  height: "80vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  width="100vw"
                  src={`${process.env.PUBLIC_URL}/images/addImage.gif`}
                />
                <Typography
                  sx={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "bold",
                    mt: 4,
                    textAlign: "center",
                  }}
                >
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
