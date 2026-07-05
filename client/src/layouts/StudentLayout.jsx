import DashboardLayout from "./DashboardLayout";
import {
  Dashboard,
  Work,
  Assignment,
  Person,
  Search,
} from "@mui/icons-material";

const sidebarItems = [
  { label: "Dashboard", path: "/student/dashboard", icon: <Dashboard /> },
  { label: "Browse Internships", path: "/student/browse", icon: <Search /> },
  { label: "My Applications", path: "/student/applications", icon: <Assignment /> },
  { label: "My Profile", path: "/student/profile", icon: <Person /> },
];

export default function StudentLayout({ children }) {
  return (
    <DashboardLayout title="Student Dashboard" sidebarItems={sidebarItems} roleColor="#6366F1">
      {children}
    </DashboardLayout>
  );
}
