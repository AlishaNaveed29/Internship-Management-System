import {
  Dashboard,
  People,
  Business,
  Work,
  Assignment,
} from "@mui/icons-material";

export const adminMenus = [
  { title: "Dashboard", icon: <Dashboard />, path: "/admin/dashboard" },
  { title: "Users", icon: <People />, path: "/admin/users" },
  { title: "Companies", icon: <Business />, path: "/admin/companies" },
  { title: "Internships", icon: <Work />, path: "/admin/internships" },
  { title: "Applications", icon: <Assignment />, path: "/admin/applications" },
];
