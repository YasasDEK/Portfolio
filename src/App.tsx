import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import { Box } from "@mui/material";
import { RecoilRoot } from "recoil";
import "./App.css";
import { colorPalette } from "./components/Shared/pageHelpers";

interface IRoute {
  path: string;
  element: JSX.Element;
}

const customStyles = {
  mainBox: {
    background: colorPalette.blackGrey,
    minHeight: "100vh",
  },
};

const App = () => {
  const appRoutes: IRoute[] = [
    { path: "/", element: <HomePage /> },
    { path: "/blogs", element: <HomePage /> },
    { path: "/blog", element: <HomePage /> },
    { path: "/projects", element: <HomePage /> },
    { path: "/project", element: <HomePage /> },
  ];

  return (
    <Box sx={customStyles.mainBox}>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            {appRoutes.map(({ element, path }, index) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </Box>
  );
};

export default App;
