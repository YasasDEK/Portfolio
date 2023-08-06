import {
  Box,
  Stack,
  Typography,
  Divider,
  Grid,
  Modal,
  IconButton,
  Tooltip,
} from "@mui/material";
import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { database, storage } from "../../config/firebase";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

interface Project {
  date: string;
  description: string;
  heading: string;
  startDate: string;
  endDate: string;
  techStack: string[];
  images: string[];
  experience: {
    question: string;
    answer: string;
  }[];
}

const SingleProject = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectId = queryParams.get("projectId");
  const [loading, setLoading] = useState(true);
  const [projectDetails, setProjectDetails] = useState<Project | null>(null);
  const [imageList, setImageList] = useState<string[]>([]);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    const getProjectsPosts = async () => {
      if (projectId) {
        try {
          const documentRef = doc(database, "projects", projectId);

          const documentSnapshot = await getDoc(documentRef);

          setProjectDetails({
            date: documentSnapshot.data()?.date!,
            description: documentSnapshot.data()?.description!,
            heading: documentSnapshot.data()?.heading!,
            techStack: documentSnapshot.data()?.techStack!,
            startDate: documentSnapshot.data()?.startDate!,
            endDate: documentSnapshot.data()?.endDate!,
            experience: documentSnapshot.data()?.experience,
            images: documentSnapshot.data()?.images,
          });

          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    };

    getProjectsPosts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(imageList);

  return (
    <Box sx={{ pb: 8, pt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "75vw", flexWrap: "wrap" }}>
          <Box
            sx={{
              width: "100%",
              height: 350,
              backgroundImage: 'url("/images/programmng-language.jpg")',
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "end",
            }}
          />
          <Typography
            sx={{
              mt: 2,
              color: "white",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 40,
            }}
          >
            {projectDetails?.heading}
          </Typography>

          <Stack direction="row" spacing={2}>
            <Box
              sx={{
                width: 160,
                backgroundColor: "#33393f",
                px: 1,
                py: 1,
                borderRadius: 2,
              }}
              display="flex"
              justifyContent="space-around"
            >
              <Typography sx={{ color: "#fe6c0a", fontSize: 12 }}>
                ⌛ {projectDetails?.startDate} - {projectDetails?.endDate}
              </Typography>
            </Box>

            <Box
              sx={{
                maxWidth: 250,
                backgroundColor: "#33393f",
                px: 1,
                py: 1,
                borderRadius: 2,
              }}
              display="flex"
              justifyContent="space-around"
            >
              <Typography sx={{ color: "#fe6c0a", fontSize: 12 }}>
                🧑‍💻
                {projectDetails?.techStack?.map((tech, index) => {
                  return <> #{tech} </>;
                })}
              </Typography>
            </Box>
          </Stack>

          <Typography sx={{ mt: 2, color: "white", fontSize: 14 }}>
            {projectDetails?.description}
          </Typography>

          <Typography
            sx={{
              mt: 4,
              color: "#fe6c0a",
              fontSize: 20,
            }}
          >
            Trials and Triumphs
          </Typography>

          {projectDetails?.experience?.map((detail, index) => (
            <Box
              key={index}
              sx={{
                mt: 2,
                borderRadius: 2,
                py: 1,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Arial,Tahoma,sans-serif",
                  color: "white",
                  fontSize: 16,
                }}
              >
                💭 {detail.question}
              </Typography>

              <Divider sx={{ borderColor: "white", mt: 1, mb: 1 }} />

              <Typography
                sx={{
                  fontFamily: "Arial,Tahoma,sans-serif",
                  color: "white",
                  fontSize: 14,
                }}
              >
                {detail.answer}
              </Typography>
            </Box>
          ))}

          <Typography
            sx={{
              mt: 4,
              color: "#fe6c0a",
              fontSize: 20,
            }}
          >
            Project Gallery
          </Typography>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            {projectDetails?.images?.map((image, index) => (
              <Grid
                key={index}
                item
                xs={12}
                md={index === 1 || index === 2 ? 4 : 8}
              >
                <Box
                  onClick={() => {
                    setSelectedImage(image);
                    setImageModalOpen(true);
                  }}
                  sx={{
                    cursor: "pointer",
                    height: 300,
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "end",
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Modal
        open={imageModalOpen}
        onClose={() => {
          setImageModalOpen(false);
          setSelectedImage(null);
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          overflow: "auto",
          p: 20,
          backdropFilter: "blur(8px)",
        }}
      >
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Stack
            width="100%"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography fontSize={20} sx={{ color: "white" }}>
              Project image
            </Typography>

            <Tooltip title="Close image">
              <IconButton
                onClick={() => {
                  setImageModalOpen(false);
                  setSelectedImage(null);
                }}
              >
                <HighlightOffOutlinedIcon
                  sx={{ color: "white", fontSize: 30 }}
                />
              </IconButton>
            </Tooltip>
          </Stack>

          <img
            src={selectedImage ?? ""}
            alt=""
            style={{
              marginTop: 10,
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          />
        </Stack>
      </Modal>
    </Box>
  );
};

export default SingleProject;
