import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import { Box } from "@mui/material";
import { RecoilRoot } from "recoil";
import "./App.css";

interface IRoute {
  path: string;
  element: JSX.Element;
}

function App() {
  const appRoutes: IRoute[] = [
    { path: "/", element: <HomePage /> },
    { path: "/blog", element: <HomePage /> },
    { path: "/projects", element: <HomePage /> },
  ];

  return (
    <Box sx={{ p: 0, m: 0, background: "#18191d", minHeight: "100vh" }}>
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
}

export default App;
