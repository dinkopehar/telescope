import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../store/headerSlice";
import Portfolios from "../../features/portfolios";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Leads" }));
  }, []);

  return <Portfolios />;
}

export default InternalPage;
