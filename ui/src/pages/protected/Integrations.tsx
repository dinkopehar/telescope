import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../store/headerSlice";
import Integration from "../../features/integrations";

const InternalPage = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Integrations" }));
  }, []);

  return <Integration />;
};

export default InternalPage;
