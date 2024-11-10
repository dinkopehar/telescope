import { themeChange } from "theme-change";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";

import { Link } from "react-router-dom";

interface HeaderState {
  header: {
    pageTitle: string;
  };
}

const Header: React.FC = () => {
  const { pageTitle } = useSelector((state: HeaderState) => state.header);
  const [currentTheme, setCurrentTheme] = useState<string | null>(
    localStorage.getItem("theme"),
  );

  useEffect(() => {
    themeChange(false);
    if (currentTheme === null) {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setCurrentTheme("dark");
      } else {
        setCurrentTheme("light");
      }
    }
  }, [currentTheme]);

  function logoutUser(): void {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/";
  }

  return (
    <>
      <div className="navbar sticky top-0 bg-base-100  z-10 shadow-md ">
        {/* Menu toogle for mobile view or small screen */}
        <div className="flex-1">
          <label
            htmlFor="left-sidebar-drawer"
            className="btn btn-primary drawer-button lg:hidden"
          >
            <Bars3Icon className="h-5 inline-block w-5" />
          </label>
          <h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1>
        </div>

        <select className="select select-sm mr-4" data-choose-theme>
          <option disabled defaultValue="light">
            Theme
          </option>
          <option value="light">Default</option>
          <option value="dark">Dark</option>
          <option value="business">Business</option>
          <option value="valentine">Valentine</option>
        </select>

        <div className="dropdown dropdown-end ml-4">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://placecats.com/80/80" alt="profile" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a onClick={logoutUser}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
