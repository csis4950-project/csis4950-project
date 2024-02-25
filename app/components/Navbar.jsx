import Link from "next/link";
import Image from "next/image";
import { getSession } from "@/utils/session";
import { logout } from "@/utils/actions";
import { redirect } from "next/navigation";

export default async function Navbar() {
  const session = await getSession();

  return (
    <header className="navbar">
      <nav>
        <Link href="/">
          <div className="logo">
            <Image src="/wehabu.png"
              alt="logo"
              width={80}
              height={80}
              style={{ objectFit: "contain" }}
              priority={true}
            />
            <span>Wehabu</span>
          </div>
        </Link>
        <ul>
          <li>
            <Link className="" href="">Home</Link>
          </li>
          <li>
            <Link className="" href="/">Product</Link>
          </li>
          <li>
            <Link className="" href="/">About</Link>
          </li>
          <li>
            <Link className="" href="/">Contact</Link>
          </li>
        </ul>
        <div className="link">

          {session
            ? <form action={async () => {
              "use server"
              await logout();
              redirect("/login", "replace");
            }}>
              <button type="submit">Logout</button>
            </form>
            : <Link href="/login">Login</Link>}
        </div>
      </nav>
    </header>
  )
}