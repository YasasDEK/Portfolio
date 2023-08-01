import { Box, Button, Divider } from "@mui/material";
import { useRecoilState } from "recoil";
import { currentViewPageState } from "../../State/atom";
const Header = () => {
  const pages = ["Projects", "Home", "Blog"];
  const [selectedPage, setSelectedPage] = useRecoilState(currentViewPageState);

  const handlePageChange = (page: "Projects" | "Home" | "Blog") => {
    setSelectedPage(page);
    window.history.pushState(
      {},
      "",
      page === "Home" ? "/" : page.toLowerCase()
    );
  };

  return (
    <Box
      zIndex={1}
      width="100vw"
      height={70}
      sx={{ position: "fixed", background: "#18191d" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          background: "#18191d",
        }}
      >
        {pages.map((page) => (
          <Button
            variant="text"
            onClick={() =>
              handlePageChange(page as "Projects" | "Home" | "Blog")
            }
            key={page}
            sx={{ my: 2, color: page === selectedPage ? "#fe6c0a" : "white" }}
          >
            {page}
          </Button>
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Divider sx={{ width: "75vw", background: "white" }} />
      </Box>
    </Box>
  );
};

export default Header;
