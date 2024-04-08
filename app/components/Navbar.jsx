"use client";

import Link from "next/link";
import Image from "next/image";
import { logout } from "@/utils/actions";
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";

export default function Navbar({ session }) {
  const [show, setShow] = useState(false);
  const LogInOutButton = session ? <LogOutButton session={session} /> : <LogInButton />;

  useEffect(() => {
    const handleNav = () => {
      setShow(false);
    };

    window.addEventListener('resize', handleNav);

    return () => {
      window.removeEventListener('resize', handleNav);
    };
  }, []);

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
      <nav className="nav__list-container">
        <ul className="nav__list">
          <NavLinks />
        </ul>
      </nav>
      {
        session &&
        <div className={show ? "open" : "hidden"}>
          <button className="btn btn__round">{session.fullName}</button>
        </div>
      }
      {LogInOutButton}
      <div className="btn--toggle">
        <button type="button" onClick={() => setShow(true)} >
          <FiMenu size={32} />
        </button>
      </div>
      <div className={show ? "nav__toggle-container open" : "nav__toggle-container"} onClick={() => setShow(false)}>
        <div className="nav__toggle-menu">
          <ul className="nav__list--toggle">
            <NavLinks />
            <li>
              {session ? <LogOutButton show={show} /> : <LogInButton show={show} />}
            </li>
            <li className="nav__list__item">
              <button type="button" onClick={() => setShow(false)}>CLOSE</button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

function NavLinks() {
  const linkItems = ["Home", "Product", "About", "Contact"];
  const links = linkItems.map((link, index) => {
    const path = link === "Home" ? "/" : `/${link.toLowerCase()}`;
    return (
      <li key={index} className="nav__list__item">
        <Link className="" href={path}>{link}</Link>
      </li>
    )
  })
  return links;
}

function LogInButton({ show }) {
  return (
    <div className={show ? "nav__controls open" : "nav__controls"}>
      <Link className="btn btn--nav" href="/login">Login</Link>
    </div>
  )
}

function LogOutButton({ show }) {
  return (
    <div className={show ? "nav__controls open" : "nav__controls"}>
      <form action={async () => {
        await logout();
      }}>
        <button className="btn" type="submit">Logout</button>
      </form>
    </div>
  )
}