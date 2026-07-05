import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "../components/common/PrivateRoute";

import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "../pages/NotFound";

import StudentDashboard from "../pages/student/StudentDashboard";
import BrowseInternships from "../pages/student/BrowseInternships";
import MyApplications from "../pages/student/MyApplications";
import StudentProfile from "../pages/student/StudentProfile";

import CompanyDashboard from "../pages/company/CompanyDashboard";
import CompanyProfile from "../pages/company/CompanyProfile";
import PostInternship from "../pages/company/PostInternship";
import ManageInternships from "../pages/company/ManageInternships";
import Applicants from "../pages/company/Applicants";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/Users";
import AdminCompanies from "../pages/admin/Companies";
import AdminInternships from "../pages/admin/Internships";
import AdminApplications from "../pages/admin/Applications";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route
            path="/student/dashboard"
            element={<PrivateRoute roles={["student"]}><StudentDashboard /></PrivateRoute>}
          />
          <Route
            path="/student/browse"
            element={<PrivateRoute roles={["student"]}><BrowseInternships /></PrivateRoute>}
          />
          <Route
            path="/student/applications"
            element={<PrivateRoute roles={["student"]}><MyApplications /></PrivateRoute>}
          />
          <Route
            path="/student/profile"
            element={<PrivateRoute roles={["student"]}><StudentProfile /></PrivateRoute>}
          />

          <Route
            path="/company/dashboard"
            element={<PrivateRoute roles={["company"]}><CompanyDashboard /></PrivateRoute>}
          />
          <Route
            path="/company/profile"
            element={<PrivateRoute roles={["company"]}><CompanyProfile /></PrivateRoute>}
          />
          <Route
            path="/company/post-internship"
            element={<PrivateRoute roles={["company"]}><PostInternship /></PrivateRoute>}
          />
          <Route
            path="/company/manage-internships"
            element={<PrivateRoute roles={["company"]}><ManageInternships /></PrivateRoute>}
          />
          <Route
            path="/company/applicants"
            element={<PrivateRoute roles={["company"]}><Applicants /></PrivateRoute>}
          />

          <Route
            path="/admin/dashboard"
            element={<PrivateRoute roles={["admin"]}><AdminDashboard /></PrivateRoute>}
          />
          <Route
            path="/admin/users"
            element={<PrivateRoute roles={["admin"]}><AdminUsers /></PrivateRoute>}
          />
          <Route
            path="/admin/companies"
            element={<PrivateRoute roles={["admin"]}><AdminCompanies /></PrivateRoute>}
          />
          <Route
            path="/admin/internships"
            element={<PrivateRoute roles={["admin"]}><AdminInternships /></PrivateRoute>}
          />
          <Route
            path="/admin/applications"
            element={<PrivateRoute roles={["admin"]}><AdminApplications /></PrivateRoute>}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
