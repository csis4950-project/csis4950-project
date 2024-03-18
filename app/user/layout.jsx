import { getSession } from "@/utils/session";
import SideNav from "../components/SideNav";

export default async function Layout({ children }) {
  const { payload: session } = await getSession();
  const { currentOrganization: curOrg, departments } = session;
  const isAdmin = hasAdminPermission(departments);
  return (
    <section className="user-page-layout">
      <SideNav curOrg={curOrg} isAdmin={isAdmin} />
      <div className="user-page-layout__contents">
        {children}
      </div>
    </section>
  )
}

function hasAdminPermission(departments) {
  for (const department of departments) {
    if (department.role.name === "owner" || department.role.name === "admin") {
      return true;
    }
  }
  return false;
}