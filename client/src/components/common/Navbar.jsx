import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Work,
  Dashboard,
  Person,
  Logout,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";

const navLinks = [
  { title: "Home", path: "/" },
  { title: "Find Internships", path: "/student/internships" },
  { title: "For Companies", path: "/company/dashboard" },
];

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getDashboardPath = () => {
    if (!user) return "/login";
    if (user.role === "student") return "/student/dashboard";
    if (user.role === "company") return "/company/dashboard";
    return "/admin/dashboard";
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(99,102,241,0.1)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: 70 }}>
            <Work sx={{ color: "#6366F1", mr: 1, fontSize: 28 }} />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                background: "linear-gradient(135deg, #6366F1, #818CF8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mr: "auto",
              }}
            >
              InternHub
            </Typography>

            {isMobile ? (
              <IconButton onClick={() => setMobileOpen(true)} sx={{ color: "#1E293B" }}>
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {navLinks.map((link) => (
                  <Button
                    key={link.title}
                    component={Link}
                    to={link.path}
                    sx={{
                      color: "#475569",
                      fontWeight: 500,
                      px: 2,
                      "&:hover": { color: "#6366F1", background: "rgba(99,102,241,0.08)" },
                    }}
                  >
                    {link.title}
                  </Button>
                ))}

                {user ? (
                  <>
                    <Button
                      component={Link}
                      to={getDashboardPath()}
                      variant="outlined"
                      startIcon={<Dashboard />}
                      sx={{ ml: 2, borderColor: "#6366F1", color: "#6366F1" }}
                    >
                      Dashboard
                    </Button>
                    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ ml: 1 }}>
                      <Avatar
                        sx={{
                          width: 36,
                          height: 36,
                          background: "linear-gradient(135deg, #6366F1, #818CF8)",
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                      >
                        {user?.fullName?.charAt(0) || "U"}
                      </Avatar>
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={() => setAnchorEl(null)}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                      PaperProps={{
                        sx: { mt: 1, borderRadius: 3, minWidth: 200, p: 1 },
                      }}
                    >
                      <Box sx={{ px: 2, py: 1 }}>
                        <Typography variant="subtitle2" fontWeight={700}>
                          {user.fullName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {user.email}
                        </Typography>
                      </Box>
                      <Divider sx={{ my: 1 }} />
                      <MenuItem onClick={() => { setAnchorEl(null); navigate(getDashboardPath()); }}>
                        <Dashboard sx={{ mr: 1.5, fontSize: 20 }} /> Dashboard
                      </MenuItem>
                      <MenuItem onClick={() => { setAnchorEl(null); navigate(`/${user.role}/profile`); }}>
                        <Person sx={{ mr: 1.5, fontSize: 20 }} /> Profile
                      </MenuItem>
                      <Divider sx={{ my: 1 }} />
                      <MenuItem onClick={handleLogout}>
                        <Logout sx={{ mr: 1.5, fontSize: 20 }} /> Logout
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Box sx={{ display: "flex", gap: 1, ml: 3 }}>
                    <Button component={Link} to="/login" variant="outlined" sx={{ borderColor: "#6366F1", color: "#6366F1" }}>
                      Login
                    </Button>
                    <Button component={Link} to="/register" variant="contained">
                      Get Started
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{ sx: { width: 280, p: 2 } }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 3, px: 1 }}>
          <Work sx={{ color: "#6366F1", mr: 1 }} />
          <Typography variant="h6" fontWeight={800} sx={{ color: "#6366F1" }}>
            InternHub
          </Typography>
        </Box>
        <List>
          {navLinks.map((link) => (
            <ListItemButton
              key={link.title}
              component={Link}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              sx={{ borderRadius: 2, mb: 0.5 }}
            >
              <ListItemText primary={link.title} />
            </ListItemButton>
          ))}
          <Divider sx={{ my: 2 }} />
          {user ? (
            <>
              <ListItemButton component={Link} to={getDashboardPath()} onClick={() => setMobileOpen(false)} sx={{ borderRadius: 2 }}>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
              <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2, color: "#EF4444" }}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </>
          ) : (
            <>
              <ListItemButton component={Link} to="/login" onClick={() => setMobileOpen(false)} sx={{ borderRadius: 2 }}>
                <ListItemText primary="Login" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/register"
                onClick={() => setMobileOpen(false)}
                sx={{ borderRadius: 2, bgcolor: "#6366F1", color: "#fff", "&:hover": { bgcolor: "#4F46E5" } }}
              >
                <ListItemText primary="Get Started" />
              </ListItemButton>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;
