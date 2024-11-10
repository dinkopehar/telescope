import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../../store/headerSlice";
import { createProperty } from "./propertiesSlice";

function AddPortfolioModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [portfolioObj, setPortfolioObj] = useState({ name: "" });

  const saveNewPortfolio = () => {
    if (portfolioObj.name.trim() === "")
      return setErrorMessage("Name of Property is required!");
    else {
      dispatch(createProperty(portfolioObj.name));
      dispatch(showNotification({ message: "New Property Added!", status: 1 }));
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
        defaultValue={portfolioObj.name}
        updateType="name"
        containerStyle="mt-4"
        labelTitle="Name of the Property"
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

export default AddPortfolioModalBody;
