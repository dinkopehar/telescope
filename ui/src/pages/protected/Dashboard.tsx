import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { setPageTitle } from "../../store/headerSlice";
import Dashboard from "../../features/dashboard";

function InternalPage(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Dashboard" }));
  }, []);

  return <Dashboard />;
}

export default InternalPage;
