import { Box, Button, Stack, Typography } from "@mui/material";
import { query, collection, orderBy, limit, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { database } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { currentViewPageState } from "../../State/atom";
import CustomSkeleton from "../Shared/customSkeleton";

interface ProjectsList {
  id: string;
  themeImage: string;
  heading: string;
  shortDescription: string;
  projectsDate: string;
}

const RecentProjects = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [projectsList, setProjectsList] = useState<ProjectsList[]>([]);
  const projectsListRef = collection(database, "projects");
  const setSelectedPage = useSetRecoilState(currentViewPageState);

  useEffect(() => {
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
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getProjectsPosts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ mb: loading ? -10 : 0 }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "75vw", flexWrap: "wrap" }}>
          <Stack
            justifyContent="space-between"
            alignItems="center"
            sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}
          >
            <Box>
              <Typography
                sx={{
                  wordBreak: "break-word",
                  fontSize: 25,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Recent Projects
              </Typography>
            </Box>

            <Box>
              <Button
                variant="outlined"
                onClick={() => {
                  setSelectedPage("Projects");
                  navigate("/projects");
                }}
                sx={{
                  fontSize: 13,
                  fontWeight: "bold",
                  color: "#fe6c0a",
                  border: "1px solid #fe6c0a",
                  "&:hover": {
                    opacity: 0.8,
                    border: "1px solid #fe6c0a",
                  },
                  mt: { xs: 2, md: 0 },
                }}
              >
                See more
              </Button>
            </Box>
          </Stack>

          <Stack
            direction="row"
            sx={{
              width: "75vw",
              flexWrap: "wrap",
              justifyContent: "space-between",
              mt: loading ? -10 : 0,
            }}
          >
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <CustomSkeleton home={true} key={index} index={index} />
                ))
              : projectsList.map((project, index) => (
                  <Box
                    key={index}
                    onClick={() => navigate(`/project?projectId=${project.id}`)}
                    sx={{
                      cursor: "pointer",
                      width: { xs: "100%", md: "30%" },
                      height: 350,
                      mt: 4,
                      backgroundImage: `url(${project?.themeImage})`,
                      backgroundSize: "cover",
                      backgroundColor: "white",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "end",
                      "&:hover": {
                        opacity: 0.8,
                        height: 346,
                        width: { xs: "100%", md: "29.7%" },
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
                        p: 2,
                      }}
                    >
                      <Typography
                        sx={{
                          wordBreak: "break-word",
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
                          wordBreak: "break-word",
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
    </Box>
  );
};

export default RecentProjects;
