import DashboardLayout from "./DashboardLayout";
import { adminMenus } from "../components/admin/AdminSidebar";

function AdminLayout({ children }) {
  return (
    <DashboardLayout basePath="admin" menus={adminMenus}>
      {children}
    </DashboardLayout>
  );
}

export default AdminLayout;
