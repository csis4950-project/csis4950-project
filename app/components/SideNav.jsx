"use client";

import Link from "next/link";
import { useState } from "react";

export default function SideNav({ curOrg, isAdmin }) {
  const [show, setShow] = useState(false);


  return (
    <aside className="user-page-layout__side-nav">
      <div className="side-nav">
        <div>
          <button className="side-nav__btn--open" type="button" onClick={() => setShow(!show)}><span className="side-nav__btn__text">{show ? "<" : ">"}</span></button>
        </div>
        <nav className={show ? "nav over-wrap" : "nav"} onClick={() => setShow(false)}>
          <div className="nav__title">
            <p className="nav__title__text">Organization</p>
          </div>
          <ul className="nav__list">
            <li className="nav__list__item">
              <Link className="nav__list__item__text" href="/user/dashboard">{curOrg.name}</Link>
            </li>
          </ul>
          <div className="nav__title">
            <p className="nav__title__text">DASHBOARD</p>
          </div>
          <ul className="nav__list">
            <li className="nav__list__item">
              <Link className="nav__list__item__text" href="/user/dashboard">Dashboard</Link>
            </li>
            <li className="nav__list__item">
              <Link className="nav__list__item__text" href="/user/dashboard/announcement">Announcement</Link>
            </li>
            <li className="nav__list__item">
              <Link className="nav__list__item__text" href="/user/dashboard/request">Request</Link>
            </li>
            <li className="nav__list__item">
              <Link className="nav__list__item__text" href="/user/dashboard/availability">Availability</Link>
            </li>
          </ul>
          <div className="nav__title">
            <p className="nav__title__text">SERVICES</p>
          </div>
          <ul className="nav__list">
            <li className="nav__list__item">
              <Link className="nav__list__item__text" href="/user/calendar">Calendar</Link>
            </li>
            <li className="nav__list__item">
              <Link className="nav__list__item__text" href="/user/summary">Summary</Link>
            </li>
            <li className="nav__list__item">
              <Link className="nav__list__item__text" href="/user/work">Work</Link>
            </li>
          </ul>
          {isAdmin &&
            <>
              <div className="nav__title">
                <p className="nav__title__text">SECURITY</p>
              </div>
              <ul className="nav__list">
                <li className="nav__list__item">
                  <Link className="nav__list__item__text" href="/user/departments">Departments</Link>
                </li>
                <li className="nav__list__item">
                  <Link className="nav__list__item__text" href="/user/permissions">Permissions</Link>
                </li>
              </ul>
            </>
          }
          <div className="side-nav__btn--close">
            <button className="btn" onClick={() => setShow(false)}>CLOSE</button>
          </div>
        </nav>
      </div>
    </aside>
  )
}