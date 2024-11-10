interface DashboardStatsProps {
  title: string;
  icon: React.ReactNode;
  value: string | number;
}

function DashboardStats({ title, icon, value }: DashboardStatsProps) {
  const getDescStyle = () => {
    if (Math.random() < 0.5 ? true : false)
      return "font-bold text-green-700 dark:text-green-300";
    else return "font-bold text-rose-500 dark:text-red-400";
  };

  return (
    <div className="stats shadow">
      <div className="stat">
        <div className={`stat-figure dark:text-slate-300 text-primary}`}>
          {icon}
        </div>
        <div className="stat-title dark:text-slate-300">{title}</div>
        <div className={`stat-value dark:text-slate-300 text-primary}`}>
          {value}
        </div>
        <div className={"stat-desc  " + getDescStyle()}>PLACEHOLDER</div>
      </div>
    </div>
  );
}

export default DashboardStats;
