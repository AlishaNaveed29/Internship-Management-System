import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Work } from "@mui/icons-material";

function DashboardSidebar({ menus = [], sidebarWidth = 280 }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sidebarWidth,
          boxSizing: "border-box",
          bgcolor: "#0F172A",
          borderRight: "none",
          left: 0,
          top: 0,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          px: 3,
          py: 2.5,
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        <Work sx={{ color: "#818CF8", mr: 1.5, fontSize: 28 }} />
        <Typography
          variant="h6"
          fontWeight={800}
          sx={{ color: "#fff" }}
        >
          InternHub
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

      <Toolbar />

      <List sx={{ px: 2 }}>
        {menus.map((menu) => {
          const isActive = location.pathname === menu.path;
          return (
            <ListItemButton
              key={menu.title}
              onClick={() => navigate(menu.path)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                py: 1.2,
                bgcolor: isActive ? "rgba(99,102,241,0.15)" : "transparent",
                "&:hover": {
                  bgcolor: isActive
                    ? "rgba(99,102,241,0.2)"
                    : "rgba(255,255,255,0.05)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? "#818CF8" : "#64748B",
                  minWidth: 40,
                }}
              >
                {menu.icon}
              </ListItemIcon>
              <ListItemText
                primary={menu.title}
                sx={{
                  "& .MuiListItemText-primary": {
                    color: isActive ? "#fff" : "#94A3B8",
                    fontWeight: isActive ? 600 : 400,
                    fontSize: "0.9rem",
                  },
                }}
              />
              {menu.badge && (
                <Box
                  sx={{
                    bgcolor: "#EF4444",
                    color: "#fff",
                    borderRadius: "50%",
                    width: 22,
                    height: 22,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {menu.badge}
                </Box>
              )}
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
}

export default DashboardSidebar;
