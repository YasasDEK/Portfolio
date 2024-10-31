import {
  Box,
  Stack,
  Typography,
  Divider,
  Grid,
  Modal,
  IconButton,
  Tooltip,
  Link,
} from "@mui/material";
import { getDoc, doc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { database } from "../../../config/firebase";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import SingleProjectPageSkeleton from "../SingleProjectPageSkeleton";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { customStyles } from "./index.styles";

const smallBoxIndex = [1, 2, 5, 6];

interface Project {
  date: string;
  description: string[];
  heading: string;
  startDate: string;
  endDate: string;
  techStack: string[];
  images: string[];
  experience: {
    question: string;
    answer: string[];
  }[];
  themeImage: string;
  mainFeatures: string[];
  url?: string;
}

const SingleProject = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const projectId = queryParams.get("projectId");

  const isDataFetched = useRef(false);

  const [loading, setLoading] = useState(true);
  const [projectDetails, setProjectDetails] = useState<Project | null>(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const durationAndStack = (
    <Box sx={customStyles.durationAndStack}>
      <Box sx={customStyles.durationBox}>
        <Typography sx={customStyles.durationText}>
          ⌛ {projectDetails?.startDate} - {projectDetails?.endDate}
        </Typography>
      </Box>

      <Stack direction="row" spacing={1} sx={customStyles.techStackContainer}>
        🧑‍💻
        {projectDetails?.techStack?.map((tech, index) => (
          <Typography key={index} sx={customStyles.durationText}>
            #{tech}
          </Typography>
        ))}
      </Stack>

      {projectDetails?.url && (
        <Box sx={customStyles.linkBox}>
          <Link
            href={projectDetails?.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Tooltip title="View the Project">
              <IconButton size="small" sx={customStyles.linkButton}>
                <RocketLaunchIcon sx={customStyles.rocketIyles} />
              </IconButton>
            </Tooltip>
          </Link>
        </Box>
      )}
    </Box>
  );

  const imageViewModal = (
    <Modal
      open={imageModalOpen}
      onClose={() => {
        setImageModalOpen(false);
        setSelectedImage(null);
      }}
      sx={customStyles.modal}
    >
      <Stack sx={customStyles.modalContent}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={customStyles.modalHeader}
        >
          <Typography fontSize={20} sx={customStyles.headingText}>
            Project image
          </Typography>

          <Tooltip title="Close image">
            <IconButton
              onClick={() => {
                setImageModalOpen(false);
                setSelectedImage(null);
              }}
            >
              <HighlightOffOutlinedIcon sx={{ color: "white", fontSize: 30 }} />
            </IconButton>
          </Tooltip>
        </Stack>

        <img
          src={selectedImage ?? ""}
          alt=""
          style={{
            maxWidth: "100%",
            height: "80%",
          }}
        />
      </Stack>
    </Modal>
  );

  const photoGallery = (
    <>
      <Typography sx={customStyles.galleryTitle}>Project Gallery</Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {projectDetails?.images?.map((image, index) => (
          <Grid
            key={index}
            item
            xs={12}
            md={smallBoxIndex.includes(index) ? 4 : 8}
          >
            <Box
              onClick={() => {
                setSelectedImage(image);
                setImageModalOpen(true);
              }}
              sx={{
                ...customStyles.galleryImage,
                backgroundImage: `url(${image})`,
              }}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );

  const trialsAndTruimps = (
    <>
      <Typography sx={customStyles.galleryTitle}>
        Trials and Triumphs
      </Typography>

      {projectDetails?.experience?.map((detail, index) => (
        <Box key={index} sx={customStyles.trialBox}>
          <Typography sx={customStyles.feature}>
            💭 {detail.question}
          </Typography>

          <Divider sx={customStyles.divider} />

          <Typography sx={customStyles.trialAnswer}>{detail.answer}</Typography>
        </Box>
      ))}
    </>
  );

  const mainFeatures = (
    <>
      <Typography sx={customStyles.galleryTitle}>Main Features</Typography>

      {projectDetails?.mainFeatures?.map((detail, index) => (
        <Box key={index} sx={customStyles.featureBox}>
          <Typography sx={customStyles.feature}>🛸 {detail}</Typography>
        </Box>
      ))}
    </>
  );

  const singlePageContent = (
    <Box sx={customStyles.singlePageContentContainer}>
      <Box
        sx={{
          ...customStyles.imageContainer,
          backgroundImage: `url(${projectDetails?.themeImage})`,
        }}
      >
        <Box sx={customStyles.singlePageImage} />
      </Box>

      <Typography sx={customStyles.heading}>
        {projectDetails?.heading}
      </Typography>

      {durationAndStack}

      <Typography sx={customStyles.description}>
        {projectDetails?.description.map((value) => value)}
      </Typography>

      {projectDetails?.mainFeatures.length! > 0 && mainFeatures}

      {projectDetails?.experience.length! > 0 && trialsAndTruimps}

      {projectDetails?.images.length! > 0 && photoGallery}

      {imageViewModal}
    </Box>
  );

  useEffect(() => {
    if (isDataFetched.current) return;

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
            themeImage: documentSnapshot.data()?.themeImage,
            mainFeatures: documentSnapshot.data()?.mainFeatures,
            url: documentSnapshot.data()?.url,
          });

          setLoading(false);
        } catch (_error) {
          setLoading(false);
        }
      }
    };

    getProjectsPosts();

    isDataFetched.current = true;
  }, [projectId]);

  return (
    <Box sx={customStyles.mainBox}>
      <Box sx={customStyles.innerBox}>
        {loading ? <SingleProjectPageSkeleton /> : singlePageContent}
      </Box>
    </Box>
  );
};

export default SingleProject;
