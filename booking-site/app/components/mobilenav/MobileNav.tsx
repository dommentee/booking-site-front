import React from "react";
import Link from "next/link";
import "../mobilenav/style.scss";
import { User } from "@/app/Helpers/Users";
import { useGlobalContext } from "@/app/context";

const MobileNav = (props: any) => {
  const userContext = useGlobalContext();
  const user: User = userContext?.user || null;
  return (
    <div className="mobile-nav " id="">
      <Link href="/pages/houserules" className="" onClick={props.noNav}>
        <div className="nav-button">House rules</div>
      </Link>
      <Link
        href="/pages/services"
        className="border-b-2 border-transparent hover:border-b-2 hover:border-green-300"
        onClick={props.noNav}
      >
        <div className="nav-button">Book now</div>
      </Link>

      {user! && user.role === "user" ? (
        <Link href="/pages/account" className="" onClick={props.noNav}>
          <div className="nav-button">account</div>
        </Link>
      ) : (
        <></>
      )}
      {user! && user.role === "admin" ? (
        <Link href="/pages/admin" className="" onClick={props.noNav}>
          <div className="nav-button">admin</div>
        </Link>
      ) : (
        <></>
      )}
      {user ? (
        <></>
      ) : (
        <div className="flex flex-col">
          <Link
            href="/pages/login"
            className="border-b-2 border-transparent hover:border-b-2 hover:border-green-300"
            onClick={props.noNav}
          >
            <div className="nav-button">login</div>
          </Link>
          <Link
            href="/pages/signup"
            className="border-b-2 border-transparent hover:border-b-2 hover:border-green-300"
            onClick={props.noNav}
          >
            <div className="nav-button">signup</div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
