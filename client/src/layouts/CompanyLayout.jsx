import DashboardLayout from "./DashboardLayout";
import {
  Dashboard,
  Work,
  People,
  Person,
  Add,
} from "@mui/icons-material";

const sidebarItems = [
  { label: "Dashboard", path: "/company/dashboard", icon: <Dashboard /> },
  { label: "Post Internship", path: "/company/post-internship", icon: <Add /> },
  { label: "Manage Internships", path: "/company/manage-internships", icon: <Work /> },
  { label: "Applicants", path: "/company/applicants", icon: <People /> },
  { label: "Company Profile", path: "/company/profile", icon: <Person /> },
];

export default function CompanyLayout({ children }) {
  return (
    <DashboardLayout title="Company Dashboard" sidebarItems={sidebarItems} roleColor="#14B8A6">
      {children}
    </DashboardLayout>
  );
}
