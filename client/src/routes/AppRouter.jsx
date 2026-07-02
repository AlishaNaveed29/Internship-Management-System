import { Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "../layouts/MainLayout";

// Public Pages
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "../pages/NotFound";

// Student Pages
import StudentDashboard from "../pages/student/StudentDashboard";
import StudentProfile from "../pages/student/StudentProfile";
import BrowseInternships from "../pages/student/BrowseInternships";
import MyApplications from "../pages/student/MyApplications";

// Company Pages
import CompanyDashboard from "../pages/company/CompanyDashboard";
import CompanyProfile from "../pages/company/CompanyProfile";
import PostInternship from "../pages/company/PostInternship";
import ManageInternships from "../pages/company/ManageInternships";
import Applicants from "../pages/company/Applicants";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import Users from "../pages/admin/Users";
import Companies from "../pages/admin/Companies";
import AdminInternships from "../pages/admin/Internships";
import AdminApplications from "../pages/admin/Applications";

// Protected Route
import PrivateRoute from "../components/common/PrivateRoute";

function AppRouter() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Student Routes */}
      <Route
        path="/student/dashboard"
        element={
          <PrivateRoute allowedRoles={["student"]}>
            <StudentDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/student/profile"
        element={
          <PrivateRoute allowedRoles={["student"]}>
            <StudentProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/student/internships"
        element={
          <PrivateRoute allowedRoles={["student"]}>
            <BrowseInternships />
          </PrivateRoute>
        }
      />
      <Route
        path="/student/applications"
        element={
          <PrivateRoute allowedRoles={["student"]}>
            <MyApplications />
          </PrivateRoute>
        }
      />

      {/* Company Routes */}
      <Route
        path="/company/dashboard"
        element={
          <PrivateRoute allowedRoles={["company"]}>
            <CompanyDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/company/profile"
        element={
          <PrivateRoute allowedRoles={["company"]}>
            <CompanyProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/company/post-internship"
        element={
          <PrivateRoute allowedRoles={["company"]}>
            <PostInternship />
          </PrivateRoute>
        }
      />
      <Route
        path="/company/manage-internships"
        element={
          <PrivateRoute allowedRoles={["company"]}>
            <ManageInternships />
          </PrivateRoute>
        }
      />
      <Route
        path="/company/applicants"
        element={
          <PrivateRoute allowedRoles={["company"]}>
            <Applicants />
          </PrivateRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <Users />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/companies"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <Companies />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/internships"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminInternships />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/applications"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminApplications />
          </PrivateRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
