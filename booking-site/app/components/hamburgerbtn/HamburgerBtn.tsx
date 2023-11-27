"use client";
import React from "react";
import "../hamburgerbtn/style.scss";

const hamburgerBtn = (props: any) => {
  return (
    <>
      {props.showNav ? (
        <div
          className="hover:cursor-pointer md:hidden lg:hidden xl:hidden"
          onClick={props.toggleNav}
        >
          <div className="w-8 h-1 mb-1 bg-gray-800" id="barone"></div>
          <div className="w-8 h-1 mb-1 bg-gray-800" id="bartwo"></div>
          <div className="w-8 h-1 bg-gray-800" id="barthree"></div>
        </div>
      ) : (
        <div
          className="hover:cursor-pointer md:hidden lg:hidden xl:hidden"
          onClick={props.toggleNav}
        >
          <div className="w-8 h-1 mb-1 bg-gray-800 transition duration-200"></div>
          <div className="w-8 h-1 mb-1 bg-gray-800 transition duration-200"></div>
          <div className="w-8 h-1 bg-gray-800 transition duration-200"></div>
        </div>
      )}
    </>
  );
};

export default hamburgerBtn;
