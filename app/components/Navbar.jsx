import Link from "next/link";
import Image from "next/image";
export default function Navbar() {

  return (
    <header className="horizontal-navbar">
      <nav className="navbar">
        <div className="logo">
          <Image src="/wehabu.png"
            alt="main_image1"
            width={200}
            height={100}
            style={{ objectFit: "contain" }}
          />
        </div>
        <ul>
          <li>Home</li>
          <li>Product</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <div>
          <Link className="landingpage" href="a">
            Karlo
          </Link>
        </div>
      </nav>
    </header>
  )
}