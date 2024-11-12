import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../store/modalSlice";
import AddPortfolioModalBody from "../features/portfolios/AddPortfolioModal";
import AddPropertyModalBody from "../features/properties/AddPropertyModal";
import UpdatePortfolioModalBody from "../features/portfolios/UpdatePortfolioModal";
import ConfirmationModalBody from "./ConfirmationModalBody";
import MapModal from "../features/properties/MapModal";

interface ModalState {
  modal: {
    isOpen: boolean;
    bodyType: string;
    size: string;
    extraObject: any;
    title: string;
  };
}

const MODAL_BODY_TYPES = {
  USER_DETAIL: "USER_DETAIL",
  PORTFOLIO_ADD_NEW: "PORTFOLIO_ADD_NEW",
  PROPERTY_ADD_NEW: "PROPERTY_ADD_NEW",
  PORTFOLIO_UPDATE: "PORTFOLIO_UPDATE",
  MAP: "MAP",
  CONFIRMATION: "CONFIRMATION",
  DEFAULT: "",
};

function ModalLayout(): JSX.Element {
  const { isOpen, bodyType, size, extraObject, title } = useSelector(
    (state: ModalState) => state.modal,
  );
  const dispatch = useDispatch();

  const close = (e?: any): void => {
    dispatch(closeModal(e));
  };

  return (
    <>
      <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div
          className={`modal-box w-11/12  ${size === "lg" ? "max-w-5xl" : ""}`}
        >
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => close()}
          >
            ✕
          </button>
          <h3 className="font-semibold text-2xl pb-6 text-center">{title}</h3>

          {/* Loading modal body according to different modal type */}
          {
            {
              [MODAL_BODY_TYPES.PORTFOLIO_ADD_NEW]: (
                <AddPortfolioModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.PORTFOLIO_UPDATE]: (
                <UpdatePortfolioModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.PROPERTY_ADD_NEW]: (
                <AddPropertyModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.CONFIRMATION]: (
                <ConfirmationModalBody
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),
              [MODAL_BODY_TYPES.MAP]: (
                <MapModal extraObject={extraObject} closeModal={close} />
              ),
              [MODAL_BODY_TYPES.DEFAULT]: <div></div>,
            }[bodyType]
          }
        </div>
      </div>
    </>
  );
}

export default ModalLayout;
