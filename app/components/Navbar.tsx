"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "../auth";
import { parseJwt } from "../utils/parseJwt";

const Navbar = () => {
  const [user, setuser] = useState({
    userId: null,
    email: "",
  });
  const { isAuthenticated, logoutAuth } = useAuth();

  const handleLogout = () => {
    logoutAuth();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken: any = parseJwt(token!);
    if (decodedToken) {
      console.log(decodedToken);
      setuser({ email: decodedToken.email, userId: decodedToken.userId });
    } else {
      setuser({ email: "", userId: null });
    }
  }, [isAuthenticated]);
  return (
    <nav className="lg:px-16 px-6 bg-purple-600 shadow-md flex items-center lg:py-0 py-2 flex-row justify-between">
      <div className="flex w-full">
        <a href="/" className="flex text-lg font-semibold">
          <img
            src="https://dev.rz-codes.com/static/logo-275e932fd817cc84d99d91f7519a9a22.svg"
            width="50"
            height="50"
            className="p-2"
            alt="Rz Codes Logo"
          />
          <div className="mt-3 text-white-600">Staff Management</div>
        </a>
      </div>

      <div className="flex items-center lg:w-auto w-full justify-end" id="menu">
        {user.userId && (
          <nav className="flex items-center">
            <ul className="text-xl text-center items-center gap-x-5 pt-4 md:gap-x-4 lg:text-lg lg:flex  lg:pt-0">
              <li className="py-2 lg:py-0 "></li>
            </ul>
            <div className="group inline-block relative">
              <div className="text-white-600  relative">{user.email}</div>
              {/* <button className="dropbtn">Dropdown</button> */}
              <div className="group-hover:block hidden absolute z-10 bg-purple-600   w-40">
                <a
                  className="block py-5 px-4 hover:bg-purple-300"
                  href={`/user/${user.userId}`}
                >
                  Profile
                </a>
                <a
                  className="block py-5 px-4 hover:bg-purple-300"
                  href="#"
                  onClick={() => handleLogout()}
                >
                  Log out
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
