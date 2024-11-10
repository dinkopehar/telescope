import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../store/headerSlice";
import Properties from "../../features/properties";

const InternalPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Properties" }));
  }, []);

  return <Properties />;
};

export default InternalPage;
