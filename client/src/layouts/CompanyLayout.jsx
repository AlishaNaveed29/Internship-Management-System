import DashboardLayout from "./DashboardLayout";
import { companyMenus } from "../components/company/CompanySidebar";

function CompanyLayout({ children }) {
  return (
    <DashboardLayout basePath="company" menus={companyMenus}>
      {children}
    </DashboardLayout>
  );
}

export default CompanyLayout;
