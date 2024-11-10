import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../store/headerSlice";
import { Link } from "react-router-dom";
import TemplatePointers from "../../components/TemplatePointers";
import { AppDispatch } from "../../store";

function InternalPage() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "" }));
  }, [dispatch]);

  return (
    <div className="hero h-4/5 bg-base-200">
      <div className="hero-content">
        <div className="max-w-md">
          <TemplatePointers />
          <Link to="/app/dashboard">
            <button className="btn bg-base-100 btn-outline">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InternalPage;
