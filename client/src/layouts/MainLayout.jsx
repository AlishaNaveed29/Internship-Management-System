import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Box } from "@mui/material";

function MainLayout({ children }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ flex: 1, pt: "70px" }}>{children}</Box>
      <Footer />
    </Box>
  );
}

export default MainLayout;
