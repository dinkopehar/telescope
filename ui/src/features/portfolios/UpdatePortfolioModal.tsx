import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../../store/headerSlice";
import { updatePortfolio } from "./portfolioSlice";

function UpdatePortfolioModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const { name, id } = extraObject;
  const [portfolioObj, setPortfolioObj] = useState({});

  const saveNewPortfolio = () => {
    if (portfolioObj.name.trim() === "")
      return setErrorMessage("Name of portfolio is required!");
    else {
      const newObj = { id: id, name: portfolioObj.name };
      dispatch(updatePortfolio(newObj));
      dispatch(showNotification({ message: "Updated!", status: 1 }));
      closeModal();
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setPortfolioObj({ ...portfolioObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={name}
        updateType="name"
        containerStyle="mt-4"
        labelTitle="New Name of the Portfolio"
        updateFormValue={updateFormValue}
      />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          className="btn btn-primary px-6"
          onClick={() => saveNewPortfolio()}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default UpdatePortfolioModalBody;
