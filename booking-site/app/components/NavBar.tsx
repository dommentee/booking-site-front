"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import HamburgerBtn from "./hamburgerbtn/HamburgerBtn";
import MobileNav from "./mobilenav/MobileNav";
import { useGlobalContext } from "../context";
import { api } from "../Helpers/Api";
import { User } from "../Helpers/Users";

const NavBar = () => {
  const userContext = useGlobalContext();
  const user: User = userContext?.user || null;

  //state of mobile nav
  let [showNav, setShowNav] = useState(false);

  const toggleNav = () => {
    setShowNav(!showNav);
  };
  //closing nav when link is clicked
  const noNav = () => {
    setShowNav(false);
  };

  const currentApi = api(api);
  //log out user and set state in globally
  const removeUserContextr = useGlobalContext();
  const removeUser = removeUserContextr?.removeUser;
  const logoutUser = async () => {
    try {
      const response = await fetch(`${currentApi}/auth/logout`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        removeUser();
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="w-full flex items-center justify-between bg-white sticky top-0 z-50 shadow-lg space-x-4 p-5">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center justify-between space-x-4">
            <Link href="/" className="text-grey-800 text-lg" onClick={noNav}>
              LOGO
            </Link>
            <Link
              href="/pages/services"
              className="border-b-2 border-transparent hover:border-b-2 hover:border-green-300"
            >
              <div className="nav-button">Book now</div>
            </Link>
          </div>
          <Link
            href="/pages/houserules"
            className="border-b-2 border-transparent hover:border-b-2 hover:border-green-300 hidden md:block"
          >
            <div className="nav-button">House rules</div>
          </Link>
        </div>
        {user! && user.role === "user" ? (
          <div className="flex items-center justify-between space-x-4">
            <span>{user.firstName}</span>
            <Link href="/pages/account" className="hidden md:block">
              <div>account</div>
            </Link>
            <button onClick={logoutUser}>logout</button>
            <div onClick={toggleNav}>
              <HamburgerBtn showNav={showNav} toggleNav={toggleNav} />
            </div>
          </div>
        ) : (
          <></>
        )}
        {user! && user.role === "admin" ? (
          <div className="flex items-center justify-between space-x-4">
            <span>{user.firstName}</span>
            <Link href="/pages/admin" className="hidden md:block">
              <div>admin</div>
            </Link>
            <button onClick={logoutUser}>logout</button>
            <div onClick={toggleNav}>
              <HamburgerBtn showNav={showNav} toggleNav={toggleNav} />
            </div>
          </div>
        ) : (
          <></>
        )}
        {user ? (
          <></>
        ) : (
          <div className="flex items-center justify-between space-x-4">
            <Link href="/pages/login" className="hidden md:block">
              <div>login</div>
            </Link>
            <Link href="/pages/signup" className="hidden md:block">
              <div>signup</div>
            </Link>
            <div onClick={toggleNav}>
              <HamburgerBtn showNav={showNav} toggleNav={toggleNav} />
            </div>
          </div>
        )}
      </div>
      {showNav ? (
        <div className="mobile-nav-container mobile-nav-visible md:hidden lg:hidden xl:hidden">
          <MobileNav noNav={noNav} />
        </div>
      ) : (
        <div className="mobile-nav-container mobile-nav-hidden md:hidden lg:hidden xl:hidden">
          <MobileNav />
        </div>
      )}
    </>
  );
};

export default NavBar;
