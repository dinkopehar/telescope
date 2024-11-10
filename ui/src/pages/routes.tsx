/** Icons are imported separatly to reduce build time */
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import BoltIcon from "@heroicons/react/24/outline/BoltIcon";
import BuildingOfficeIcon from "@heroicons/react/24/outline/BuildingOfficeIcon";
import BuildingLibraryIcon from "@heroicons/react/24/outline/BuildingLibraryIcon";

import { lazy } from "react";

const Dashboard = lazy(() => import("./protected/Dashboard"));
const Welcome = lazy(() => import("./protected/Welcome"));
const Page404 = lazy(() => import("./protected/404"));
const Blank = lazy(() => import("./protected/Blank"));
const Portfolios = lazy(() => import("../pages/protected/Portfolios"));
const Integrations = lazy(() => import("../pages/protected/Integrations"));

const iconClasses: string = `h-6 w-6`;

interface Route {
  path: string;
  name: string;
  icon: any;
}

export const protectedRoutes = [
  {
    path: "/welcome",
    component: Welcome,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/blank",
    component: Blank,
  },
  {
    path: "/portfolios",
    component: Portfolios,
  },
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/integrations",
    component: Integrations,
  },
];

export const sideBarRoutes: Route[] = [
  {
    path: "/app/dashboard",
    icon: <Squares2X2Icon className={iconClasses} />,
    name: "Dashboard",
  },
  {
    path: "/app/portfolios",
    icon: <BuildingOfficeIcon className={iconClasses} />,
    name: "Portfolios",
  },
  {
    path: "/app/properties", // url
    icon: <BuildingLibraryIcon className={iconClasses} />,
    name: "Properties",
  },
  {
    path: "/app/integrations", // url
    icon: <BoltIcon className={iconClasses} />,
    name: "Integrations",
  },
];
