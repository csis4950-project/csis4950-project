import { getSession } from "@/utils/session";
import { hasAdminPermission } from "@/utils/utils";
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