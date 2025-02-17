import { sideBarRoutes } from "../pages/routes";
import { NavLink, Link, useLocation } from "react-router-dom";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";

interface Route {
  path: string;
  name: string;
  icon: React.ReactNode;
  submenu?: boolean;
}

function LeftSidebar(): JSX.Element {
  const location = useLocation();

  const close = (): void => {
    document.getElementById("left-sidebar-drawer")?.click();
  };

  return (
    <div className="drawer-side  z-30  ">
      <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
      <ul className="menu  pt-2 w-80 bg-base-100 min-h-full   text-base-content">
        <button
          className="btn btn-ghost bg-base-300  btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden"
          onClick={close}
        >
          <XMarkIcon className="h-5 inline-block w-5" />
        </button>

        <li className="mb-2 font-semibold text-xl">
          <Link to={"/app/welcome"}>Telescope</Link>{" "}
        </li>
        {sideBarRoutes.map((route: Route, k: number) => {
          return (
            <li className="" key={k}>
              <NavLink
                end
                to={route.path}
                className={({ isActive }) =>
                  `${isActive ? "font-semibold  bg-base-200 " : "font-normal"}`
                }
              >
                {route.icon} {route.name}
                {location.pathname === route.path ? (
                  <span
                    className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                    aria-hidden="true"
                  ></span>
                ) : null}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LeftSidebar;
