import Link from "next/link";
import Image from "next/image";
export default function Navbar() {

  return (
    <header className="navbar">
      <nav>
        <Link href="/">
          <div className="logo">
            <Image src="/wehabu.png"
              alt="main_image1"
              width={80}
              height={80}
              style={{ objectFit: "contain" }}
            />
            <span>wehabu</span>
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
          <Link href="/login">Login</Link>
        </div>
      </nav>
    </header>
  )
}