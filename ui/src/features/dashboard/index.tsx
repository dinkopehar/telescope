import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import BuildingOfficeIcon from "@heroicons/react/24/outline/BuildingOfficeIcon";
import BuildingLibraryIcon from "@heroicons/react/24/outline/BuildingLibraryIcon";
import BanknotesIcon from "@heroicons/react/24/outline/BanknotesIcon";

import LineChart from "./LineChart";
import BarChart from "./BarChart";
import DashboardTopBar from "./DashboardTopBar";
import DashboardStats from "./DashboardStats";

interface StatisticsItem {
  title: string;
  value: string;
  icon: JSX.Element;
}

const data: StatisticsItem[] = [
  {
    title: "Number of portfolios",
    value: "75",
    icon: <BuildingOfficeIcon className="w-8 h-8" />,
  },
  {
    title: "Number of properties",
    value: "1.1K",
    icon: <BuildingLibraryIcon className="w-8 h-8" />,
  },
  {
    title: "Estimated value of properties",
    value: "4 500 000 €",
    icon: <BanknotesIcon className="w-8 h-8" />,
  },
  {
    title: "Active Users",
    value: "3",
    icon: <UsersIcon className="w-8 h-8" />,
  },
];

const Dashboard: React.FC = () => {
  return (
    <>
      {/** ---------------------- Select Period Content ------------------------- */}
      <DashboardTopBar />

      {/** ---------------------- Different stats content 1 ------------------------- */}
      <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
        {data.map((d, k) => {
          return <DashboardStats key={k} {...d} colorIndex={k} />;
        })}
      </div>

      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <LineChart />
        <BarChart />
      </div>
    </>
  );
};

export default Dashboard;
