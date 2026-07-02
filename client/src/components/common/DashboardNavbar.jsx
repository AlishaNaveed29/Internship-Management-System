import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Chip,
} from "@mui/material";
import {
  Notifications,
  Logout,
  Person,
  Dashboard,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const roleColors = {
  student: { bg: "#EFF6FF", color: "#3B82F6", label: "Student" },
  company: { bg: "#ECFDF5", color: "#10B981", label: "Company" },
  admin: { bg: "#FEF2F2", color: "#EF4444", label: "Admin" },
};

function DashboardNavbar({ sidebarWidth = 280 }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchor, setNotifAnchor] = useState(null);

  const roleInfo = roleColors[user?.role] || roleColors.student;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${sidebarWidth}px)`,
        ml: `${sidebarWidth}px`,
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid #F1F5F9",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "flex-end", gap: 1, minHeight: 70 }}>
        <IconButton onClick={(e) => setNotifAnchor(e.currentTarget)} sx={{ color: "#64748B" }}>
          <Notifications />
        </IconButton>

        <Menu
          anchorEl={notifAnchor}
          open={Boolean(notifAnchor)}
          onClose={() => setNotifAnchor(null)}
          PaperProps={{ sx: { borderRadius: 3, minWidth: 320, p: 1, mt: 1 } }}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle2" fontWeight={700}>Notifications</Typography>
          </Box>
          <Divider />
          <MenuItem sx={{ borderRadius: 2, my: 0.5 }}>
            <Box>
              <Typography variant="body2" fontWeight={600}>New application received</Typography>
              <Typography variant="caption" color="text.secondary">2 min ago</Typography>
            </Box>
          </MenuItem>
          <MenuItem sx={{ borderRadius: 2, my: 0.5 }}>
            <Box>
              <Typography variant="body2" fontWeight={600}>Internship status updated</Typography>
              <Typography variant="caption" color="text.secondary">1 hour ago</Typography>
            </Box>
          </MenuItem>
        </Menu>

        <Chip
          label={roleInfo.label}
          size="small"
          sx={{
            bgcolor: roleInfo.bg,
            color: roleInfo.color,
            fontWeight: 700,
            fontSize: 11,
            px: 0.5,
          }}
        />

        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
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
          PaperProps={{ sx: { mt: 1, borderRadius: 3, minWidth: 220, p: 1 } }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle2" fontWeight={700}>{user?.fullName}</Typography>
            <Typography variant="caption" color="text.secondary">{user?.email}</Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <MenuItem onClick={() => { setAnchorEl(null); navigate(`/${user?.role}/profile`); }} sx={{ borderRadius: 2 }}>
            <Person sx={{ mr: 1.5, fontSize: 20 }} /> Profile
          </MenuItem>
          <MenuItem onClick={() => { setAnchorEl(null); navigate(`/${user?.role}/dashboard`); }} sx={{ borderRadius: 2 }}>
            <Dashboard sx={{ mr: 1.5, fontSize: 20 }} /> Dashboard
          </MenuItem>
          <Divider sx={{ my: 1 }} />
          <MenuItem onClick={handleLogout} sx={{ borderRadius: 2, color: "#EF4444" }}>
            <Logout sx={{ mr: 1.5, fontSize: 20 }} /> Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default DashboardNavbar;
