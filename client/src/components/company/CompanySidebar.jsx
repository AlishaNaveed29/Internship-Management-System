import {
  Dashboard,
  Business,
  PostAdd,
  ListAlt,
  People,
} from "@mui/icons-material";

export const companyMenus = [
  { title: "Dashboard", icon: <Dashboard />, path: "/company/dashboard" },
  { title: "Company Profile", icon: <Business />, path: "/company/profile" },
  { title: "Post Internship", icon: <PostAdd />, path: "/company/post-internship" },
  { title: "Manage Internships", icon: <ListAlt />, path: "/company/manage-internships" },
  { title: "Applicants", icon: <People />, path: "/company/applicants" },
];
