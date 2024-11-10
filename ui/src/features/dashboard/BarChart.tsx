import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import TitleCard from "./../../components/Cards/TitleCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function BarChart(): JSX.Element {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Revenue by Month",
        data: labels.map(() => {
          return Math.floor(Math.random() * 70000 + 20000);
        }),
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  return (
    <TitleCard title={"Revenue"}>
      <Bar options={options} data={data} />
    </TitleCard>
  );
}

export default BarChart;
