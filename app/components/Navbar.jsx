import Link from "next/link";
import Image from "next/image";
import { getSession } from "@/utils/session";
import { logout } from "@/utils/actions";
import { redirect } from "next/navigation";

const links = ["Home", "Product", "About", "Contact"];

export default async function Navbar() {
  const data = await getSession();
  const session = data?.payload ?? null;

  return (
    <header className="navbar">
      <div>
        <Link href="/">
          <div className="navbar__logo">
            <Image src="/wehabu.png"
              alt="logo"
              width={80}
              height={80}
              style={{ objectFit: "contain" }}
              priority={true}
            />
            <span className="navbar__logo__text">Wehabu</span>
          </div>
        </Link>
      </div>
      <nav>
        <ul className="navbar__list">
          {
            links.map((link, index) => {
              const path = link === "Home" ? "/" : `/${link.toLowerCase()}`;
              return (
                <li key={index} className="navbar__list__item">
                  <Link className="" href={path}>{link}</Link>
                </li>
              )
            })
          }
        </ul>
      </nav>
      {
        session
          ?
          <div className="navbar__controls">
            <div>
              <button className="btn btn__round">{session.fullName}</button>
            </div>
            <form action={async () => {
              "use server"
              await logout();
              redirect("/login", "replace");
            }}>
              <button className="btn" type="submit">Logout</button>
            </form>
          </div>
          :
          <div>
            <Link className="btn btn--nav" href="/login">Login</Link>
          </div>
      }
    </header>
  )
}