import DashboardLayout from "./DashboardLayout";
import { studentMenus } from "../components/student/StudentSidebar";

function StudentLayout({ children }) {
  return (
    <DashboardLayout basePath="student" menus={studentMenus}>
      {children}
    </DashboardLayout>
  );
}

export default StudentLayout;
