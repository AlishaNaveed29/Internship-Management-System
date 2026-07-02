import {
  Dashboard,
  Work,
  Assignment,
  Person,
} from "@mui/icons-material";

export const studentMenus = [
  { title: "Dashboard", icon: <Dashboard />, path: "/student/dashboard" },
  { title: "Profile", icon: <Person />, path: "/student/profile" },
  { title: "Browse Internships", icon: <Work />, path: "/student/internships" },
  { title: "My Applications", icon: <Assignment />, path: "/student/applications" },
];
