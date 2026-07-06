import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Logout,
  Dashboard,
  Work,
  ChevronLeft,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { DashboardBg } from "../components/common/Illustrations";

const DRAWER_WIDTH = 260;

export default function DashboardLayout({ title, sidebarItems, roleColor }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const drawerWidth = collapsed ? 72 : DRAWER_WIDTH;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#0B0F1E", position: "relative" }}>
      <DashboardBg />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar>
          <IconButton onClick={() => setCollapsed(!collapsed)} edge="start" sx={{ mr: 2 }}>
            {collapsed ? <MenuIcon /> : <ChevronLeft />}
          </IconButton>
          <Typography variant="h6" fontWeight={700} sx={{ flex: 1 }}>
            {title}
          </Typography>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Avatar sx={{ width: 34, height: 34, bgcolor: roleColor || "#6366F1", fontSize: 13, fontWeight: 700 }}>
              {user?.fullName?.charAt(0)}
            </Avatar>
          </IconButton>
          <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)} transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            PaperProps={{ sx: { mt: 1, minWidth: 180, borderRadius: 3 } }}>
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="body2" fontWeight={700}>{user?.fullName}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: "capitalize" }}>{user?.role}</Typography>
            </Box>
            <Divider />
            <MenuItem onClick={handleLogout}><Logout fontSize="small" sx={{ mr: 1.5 }} /> Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          transition: "all 0.3s ease",
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            transition: "all 0.3s ease",
            overflowX: "hidden",
          },
        }}
      >
        <Toolbar sx={{ display: "flex", alignItems: "center", gap: 1, px: collapsed ? 1 : 2 }}>
          <Work sx={{ color: "#6366F1", fontSize: 28 }} />
          {!collapsed && (
            <Typography variant="h6" fontWeight={800} sx={{
              background: "linear-gradient(135deg, #6366F1, #A78BFA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>InternHub</Typography>
          )}
        </Toolbar>
        <Divider />
        <List sx={{ px: 1, pt: 1 }}>
          {sidebarItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    borderRadius: 3,
                    minHeight: 48,
                    justifyContent: collapsed ? "center" : "initial",
                    px: collapsed ? 1 : 2,
                    bgcolor: active ? "rgba(99,102,241,0.12)" : "transparent",
                    "&:hover": { bgcolor: "rgba(99,102,241,0.08)" },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: collapsed ? 0 : 40, justifyContent: "center", color: active ? "#6366F1" : "#64748B" }}>
                    {item.icon}
                  </ListItemIcon>
                  {!collapsed && <ListItemText primary={item.label} sx={{ "& .MuiListItemText-primary": { fontSize: 14, fontWeight: active ? 700 : 500, color: active ? "#6366F1" : "#94A3B8" } }} />}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Box sx={{ mt: "auto", p: collapsed ? 1 : 2 }}>
          <ListItemButton
            onClick={handleLogout}
            sx={{ borderRadius: 3, justifyContent: collapsed ? "center" : "initial" }}
          >
            <ListItemIcon sx={{ minWidth: collapsed ? 0 : 40, justifyContent: "center", color: "#EF4444" }}>
              <Logout />
            </ListItemIcon>
            {!collapsed && <ListItemText primary="Logout" sx={{ "& .MuiListItemText-primary": { fontSize: 14, color: "#EF4444" } }} />}
          </ListItemButton>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flex: 1,
          p: { xs: 2, md: 3 },
          mt: 8,
          overflow: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
