import { useDispatch, useSelector } from "react-redux";
import { deletePortfolio } from "../features/portfolios/portfolioSlice";
import { showNotification } from "../store/headerSlice";
import { deleteProperty } from "../features/properties/propertiesSlice";

function ConfirmationModalBody({ extraObject, closeModal }) {
  const dispatch = useDispatch();

  const { message, type, _id, index } = extraObject;

  const proceedWithYes = async () => {
    if (type === "PORTFOLIO_DELETE") {
      dispatch(deletePortfolio(index));
      dispatch(showNotification({ message: "Portfolio Deleted!", status: 1 }));
    } else if (type === "PROPERTY_DELETE") {
      dispatch(deleteProperty(index));
      dispatch(showNotification({ message: "Property Deleted!", status: 1 }));
    }
    closeModal();
  };

  return (
    <>
      <p className=" text-xl mt-8 text-center">{message}</p>

      <div className="modal-action mt-12">
        <button className="btn btn-outline   " onClick={() => closeModal()}>
          Cancel
        </button>

        <button
          className="btn btn-primary w-36"
          onClick={() => proceedWithYes()}
        >
          Yes
        </button>
      </div>
    </>
  );
}

export default ConfirmationModalBody;
