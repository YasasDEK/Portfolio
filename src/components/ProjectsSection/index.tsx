import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { database } from "../../config/firebase";
import { Box, Stack, Typography } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { currentViewPageState } from "../../State/atom";
import CustomSkeleton from "../Shared/CustomSkeleton";
import { useNavigate } from "react-router-dom";
import { customStyles } from "./index.styles";

interface ProjectsList {
  id: string;
  themeImage: string;
  heading: string;
  shortDescription: string;
  projectsDate: string;
}

const ProjectsSection = () => {
  const navigate = useNavigate();

  const [projectsList, setProjectsList] = useState<ProjectsList[]>([]);
  const projectsListRef = collection(database, "projects");

  const isDataFetched = useRef(false);

  const [loading, setLoading] = useState(false);
  const setSelectedPage = useSetRecoilState(currentViewPageState);

  useEffect(() => {
    if (isDataFetched.current) return;

    setLoading(true);

    const getProjectsPosts = async () => {
      setSelectedPage("Projects");

      try {
        const projectsQuery = query(projectsListRef, orderBy("date"));

        const data = (await getDocs(projectsQuery)).docs.map((doc) => ({
          id: doc.id,
          themeImage: doc.data().themeImage,
          heading: doc.data().heading,
          shortDescription: doc.data().shortDescription,
          projectsDate: doc.data().date,
        }));

        setProjectsList(data);

        setLoading(false);
      } catch (_error) {}
    };

    getProjectsPosts();

    isDataFetched.current = true;
  }, [projectsListRef, setSelectedPage]);

  return (
    <Box sx={customStyles.containerStyles}>
      <Box sx={customStyles.centerBox}>
        <Box sx={customStyles.titleBoxStyles}>
          <Typography sx={customStyles.titleStyles}>Projects</Typography>
        </Box>
      </Box>

      <Box sx={{ ...customStyles.contentBoxStyles, mt: loading ? -12 : -2 }}>
        <Stack direction="row" sx={customStyles.stackStyles}>
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <CustomSkeleton key={index} index={index} />
              ))
            : projectsList.map((project, index) => (
                <Box
                  onClick={() => navigate(`/project?projectId=${project.id}`)}
                  key={index}
                  sx={{
                    ...customStyles.projectBoxStyles,
                    backgroundImage: project?.themeImage
                      ? `url(${project.themeImage})`
                      : "none",
                  }}
                >
                  <Stack sx={customStyles.innerStackStyles}>
                    <Typography sx={customStyles.projectTitleStyles}>
                      {project.heading}
                    </Typography>

                    <br />

                    <Typography sx={customStyles.projectDescriptionStyles}>
                      {project.shortDescription}
                    </Typography>
                  </Stack>
                </Box>
              ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default ProjectsSection;
