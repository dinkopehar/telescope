import ArrowDownTrayIcon from "@heroicons/react/24/outline/ArrowDownTrayIcon";
import EnvelopeIcon from "@heroicons/react/24/outline/EnvelopeIcon";
import EllipsisVerticalIcon from "@heroicons/react/24/outline/EllipsisVerticalIcon";
import ArchiveBoxArrowDownIcon from "@heroicons/react/24/outline/ArchiveBoxArrowDownIcon";

function DashboardTopBar() {
  const handleDownloadReport = () => {
    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,";

    // Add data rows
    csvContent += "Name,Age,Gender,Email,Phone\n";
    csvContent += "John Doe,30,Male,john@example.com,555-123-4567\n";
    csvContent += "Jane Doe,25,Female,jane@example.com,555-123-4568\n";

    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "report.csv");

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className=""></div>
      <div className="text-right ">
        <button
          className="btn btn-ghost btn-sm normal-case"
          onClick={handleDownloadReport}
        >
          <ArchiveBoxArrowDownIcon className="w-4 mr-2" />
          Download Report
        </button>

        <div className="dropdown dropdown-bottom dropdown-end  ml-2">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-sm normal-case btn-square "
          >
            <EllipsisVerticalIcon className="w-5" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu menu-compact  p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>
                <EnvelopeIcon className="w-4" />
                Email Digests
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardTopBar;
