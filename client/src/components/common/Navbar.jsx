import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Work,
  Logout,
  Dashboard,
  Person,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Browse Internships", path: "/internships" },
  ];

  const dashboardMap = { student: "/student/dashboard", company: "/company/dashboard", admin: "/admin/dashboard" };

  return (
    <>
      <AppBar position="fixed" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: 72 }}>
            <Work sx={{ color: "#6366F1", mr: 1, fontSize: 28 }} />
            <Typography
              variant="h5"
              fontWeight={800}
              sx={{
                background: "linear-gradient(135deg, #6366F1, #A78BFA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                cursor: "pointer",
                mr: 4,
              }}
              onClick={() => navigate("/")}
            >
              InternHub
            </Typography>

            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, flex: 1 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  component={RouterLink}
                  to={item.path}
                  sx={{ color: "#94A3B8", "&:hover": { color: "#fff" } }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
              {isAuthenticated ? (
                <>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Dashboard />}
                    onClick={() => navigate(dashboardMap[user?.role] || "/")}
                    sx={{ display: { xs: "none", md: "flex" } }}
                  >
                    Dashboard
                  </Button>
                  <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                    <Avatar sx={{ width: 36, height: 36, bgcolor: "#6366F1", fontSize: 14, fontWeight: 700 }}>
                      {user?.fullName?.charAt(0)}
                    </Avatar>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={!!anchorEl}
                    onClose={() => setAnchorEl(null)}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    PaperProps={{ sx: { mt: 1, minWidth: 200, borderRadius: 3 } }}
                  >
                    <Box sx={{ px: 2, py: 1 }}>
                      <Typography variant="body2" fontWeight={700}>{user?.fullName}</Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ textTransform: "capitalize" }}>{user?.role}</Typography>
                    </Box>
                    <Divider />
                    <MenuItem onClick={() => { setAnchorEl(null); navigate(dashboardMap[user?.role]); }}>
                      <Dashboard fontSize="small" sx={{ mr: 1.5 }} /> Dashboard
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Logout fontSize="small" sx={{ mr: 1.5 }} /> Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button variant="outlined" size="small" onClick={() => navigate("/login")}>Sign In</Button>
                  <Button variant="contained" size="small" onClick={() => navigate("/register")}>Get Started</Button>
                </>
              )}
              <IconButton sx={{ display: { md: "none" }, color: "#fff" }} onClick={() => setMobileOpen(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 280, pt: 2 }}>
          <Box sx={{ px: 2, mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
            <Work sx={{ color: "#6366F1" }} />
            <Typography variant="h6" fontWeight={800} sx={{ background: "linear-gradient(135deg, #6366F1, #A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>InternHub</Typography>
          </Box>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton onClick={() => { navigate(item.path); setMobileOpen(false); }}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ my: 1 }} />
            {isAuthenticated ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => { navigate(dashboardMap[user?.role]); setMobileOpen(false); }}>
                    <Dashboard sx={{ mr: 1.5 }} /> <ListItemText primary="Dashboard" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleLogout}>
                    <Logout sx={{ mr: 1.5 }} /> <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => { navigate("/login"); setMobileOpen(false); }}>
                    <ListItemText primary="Sign In" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => { navigate("/register"); setMobileOpen(false); }}>
                    <ListItemText primary="Get Started" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
      <Toolbar sx={{ height: 72 }} />
    </>
  );
}
