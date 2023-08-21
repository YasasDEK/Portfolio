import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../../config/firebase";
import { Box, Stack, Typography } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { currentViewPageState } from "../../State/atom";
import CustomSkeleton from "../Shared/customSkeleton";
import { useNavigate } from "react-router-dom";

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
  const [loading, setLoading] = useState(false);
  const setSelectedPage = useSetRecoilState(currentViewPageState);

  useEffect(() => {
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
      } catch (error) {
        console.log(error);
      }
    };

    getProjectsPosts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ pb: 8, pt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "75vw", flexWrap: "wrap" }}>
          <Typography sx={{ fontSize: 25, fontWeight: "bold", color: "white" }}>
            Projects
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: loading ? -12 : -2,
        }}
      >
        <Stack
          direction="row"
          sx={{
            width: "75vw",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <CustomSkeleton key={index} index={index} />
              ))
            : projectsList.map((project, index) => (
                <Box
                  onClick={() => navigate(`/project?projectId=${project.id}`)}
                  key={index}
                  sx={{
                    cursor: "pointer",
                    width: { xs: "100%", md: "45%", xl: "30%" },
                    height: 350,
                    mt: 4,
                    backgroundImage: `url(${project?.themeImage})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "end",
                    "&:hover": {
                      opacity: 0.8,
                      height: 346,
                      width: { xs: "100%", md: "44.7%", xl: "29.7%" },
                      border: "2px solid #fe6c0a",
                    },
                  }}
                >
                  <Stack
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      height: 100,
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      mb: 2,
                      p: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: 24,
                        color: "#fe6c0a",
                        textAlign: "center",
                      }}
                    >
                      {project.heading}
                    </Typography>

                    <br />

                    <Typography
                      sx={{
                        mt: -2,
                        fontSize: 14,
                        color: "white",
                        textAlign: "center",
                      }}
                    >
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
