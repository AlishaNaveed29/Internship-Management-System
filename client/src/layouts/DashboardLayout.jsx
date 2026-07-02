import DashboardNavbar from "../components/common/DashboardNavbar";
import DashboardSidebar from "../components/common/DashboardSidebar";
import { Box } from "@mui/material";

const SIDEBAR_WIDTH = 280;

function DashboardLayout({ children, menus = [] }) {
  return (
    <Box sx={{ display: "flex", bgcolor: "#F1F5F9", minHeight: "100vh" }}>
      <DashboardSidebar menus={menus} sidebarWidth={SIDEBAR_WIDTH} />
      <DashboardNavbar sidebarWidth={SIDEBAR_WIDTH} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          mt: "70px",
          minHeight: "calc(100vh - 70px)",
          width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default DashboardLayout;
