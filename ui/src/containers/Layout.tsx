import "react-notifications/lib/notifications.css";
import { useDispatch, useSelector } from "react-redux";

import { removeNotificationMessage } from "../store/headerSlice";
import PageContent from "./PageContent";
import LeftSidebar from "./LeftSidebar";
import ModalLayout from "./ModalLayout";

function Layout() {
  const dispatch = useDispatch();
  const { newNotificationMessage, newNotificationStatus } = useSelector(
    (state) => state.header,
  );

  return (
    <>
      <div className="drawer  lg:drawer-open">
        <input
          id="left-sidebar-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <PageContent />
        <LeftSidebar />
      </div>

      {/* Modal layout container */}
      <ModalLayout />
    </>
  );
}

export default Layout;
