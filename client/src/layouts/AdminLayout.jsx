import DashboardLayout from "./DashboardLayout";
import {
  Dashboard,
  People,
  Business,
  Work,
  Assignment,
} from "@mui/icons-material";

const sidebarItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: <Dashboard /> },
  { label: "Users", path: "/admin/users", icon: <People /> },
  { label: "Companies", path: "/admin/companies", icon: <Business /> },
  { label: "Internships", path: "/admin/internships", icon: <Work /> },
  { label: "Applications", path: "/admin/applications", icon: <Assignment /> },
];

export default function AdminLayout({ children }) {
  return (
    <DashboardLayout title="Admin Dashboard" sidebarItems={sidebarItems} roleColor="#EC4899">
      {children}
    </DashboardLayout>
  );
}
