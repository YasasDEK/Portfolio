import { Box, Stack, Typography } from "@mui/material";
import { query, collection, orderBy, limit, getDocs } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { database } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { currentViewPageState } from "../../../State/atom";
import RecentPosts from "../../Shared/RecentPosts";
import { customStyles } from "../../Shared/RecentPosts/index.styles";

interface ProjectsList {
  id: string;
  themeImage: string;
  heading: string;
  shortDescription: string;
  projectsDate: string;
}

const RecentProjects = () => {
  const navigate = useNavigate();

  const isDataFetched = useRef(false);

  const [loading, setLoading] = useState(true);
  const [projectsList, setProjectsList] = useState<ProjectsList[]>([]);
  const projectsListRef = collection(database, "projects");
  const setSelectedPage = useSetRecoilState(currentViewPageState);

  useEffect(() => {
    if (isDataFetched.current) return;

    setLoading(true);

    const getProjectsPosts = async () => {
      try {
        const projectsQuery = query(projectsListRef, orderBy("date"), limit(3));

        const data = (await getDocs(projectsQuery)).docs.map((doc) => ({
          id: doc.id,
          themeImage: doc.data().themeImage,
          heading: doc.data().heading,
          shortDescription: doc.data().shortDescription,
          projectsDate: doc.data().projectsDate,
        }));

        setProjectsList(data);
        setLoading(false);
      } catch (_error) {
        setLoading(false);
      }
    };

    getProjectsPosts();

    isDataFetched.current = true;
  }, [projectsListRef]);

  return (
    <RecentPosts
      loading={loading}
      heading="Recent Projects"
      handleSeerMore={() => {
        setSelectedPage("Projects");
        navigate("/projects");
      }}
      children={projectsList.map((project, index) => (
        <Box
          key={index}
          onClick={() => navigate(`/project?projectId=${project.id}`)}
          sx={{
            ...customStyles.postBox,
            backgroundImage: `url(${project?.themeImage})`,
          }}
        >
          <Stack sx={customStyles.innerPostStack}>
            <Typography sx={customStyles.postTitle}>
              {project.heading}
            </Typography>

            <br />

            <Typography sx={customStyles.postDescription}>
              {project.shortDescription}
            </Typography>
          </Stack>
        </Box>
      ))}
    />
  );
};

export default RecentProjects;
