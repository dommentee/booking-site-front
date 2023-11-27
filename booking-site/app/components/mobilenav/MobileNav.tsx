import React from "react";
import Link from "next/link";
import "../mobilenav/style.scss";

const MobileNav = (props: any) => {
  return (
    <div className="mobile-nav" id="">
      <Link href="/pages/houserules" className="" onClick={props.noNav}>
        <div className="nav-button">House rules</div>
      </Link>
      <a
        href="https://slayitkita.square.site/"
        target="_blank"
        className=""
        onClick={props.noNav}
      >
        Book now
      </a>
      <Link href="/pages/signup" className="" onClick={props.noNav}>
        Signup
      </Link>
      <Link href="/pages/login" onClick={props.noNav}>
        <div className="session-button" id="login">
          login
        </div>
      </Link>
    </div>
  );
};

export default MobileNav;
