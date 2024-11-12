import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import SelectBox from "../../components/Input/SelectBox";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../../store/headerSlice";
import { createProperty } from "./propertiesSlice";
import { getPortfolios } from "../portfolios/portfolioSlice";

function AddPropertyModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [propertyObj, setPropertyObj] = useState({
    portfolio: "",
    latitude: "",
    longitude: "",
    estimatedValue: "",
    constructionYear: "",
    squareFootage: "",
  });

  const [portfolios, setPortfolios] = useState([{ name: "", id: 0 }]);

  useEffect(() => {
    dispatch(getPortfolios()).then((portfolios) => {
      setPortfolios(portfolios.payload);
      setPropertyObj({ ...propertyObj, portfolio: portfolios.payload[0].id });
    });
  }, [dispatch]);

  const saveNewProperty = () => {
    if (propertyObj.latitude.trim() === "")
      return setErrorMessage("Latitude of Property is required!");
    if (propertyObj.longitude.trim() === "")
      return setErrorMessage("Longitude of Property is required!");
    if (propertyObj.estimatedValue.trim() === "")
      return setErrorMessage("Estimated Value of Property is required!");
    if (propertyObj.constructionYear.trim() === "")
      return setErrorMessage("Construction Year of Property is required!");
    if (propertyObj.squareFootage.trim() === "")
      return setErrorMessage("Square Footage of Property is required!");
    else {
      dispatch(createProperty(propertyObj));
      dispatch(showNotification({ message: "New Property Added!", status: 1 }));
      closeModal();
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setPropertyObj({ ...propertyObj, [updateType]: value });
  };

  const updatePortfolioValue = (portfolio) => {
    const selectedPortfolio = portfolios.find(
      (p) => p.name === portfolio.value,
    );
    if (selectedPortfolio) {
      setPropertyObj({ ...propertyObj, portfolio: selectedPortfolio.id });
    }
  };

  return (
    <>
      <SelectBox
        defaultValue={propertyObj.portfolio}
        updateType="portfolio"
        containerStyle="mt-4"
        options={portfolios}
        labelTitle="Portfolio in which property belongs to"
        updateFormValue={updatePortfolioValue}
      />

      <InputText
        type="number"
        defaultValue={propertyObj.latitude}
        updateType="latitude"
        containerStyle="mt-4"
        labelTitle="Latitude of the Property"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="number"
        defaultValue={propertyObj.longitude}
        updateType="longitude"
        containerStyle="mt-4"
        labelTitle="Longitude of the Property"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="number"
        defaultValue={propertyObj.estimatedValue}
        updateType="estimatedValue"
        containerStyle="mt-4"
        labelTitle="Value of the Property"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="number"
        defaultValue={propertyObj.constructionYear}
        updateType="constructionYear"
        containerStyle="mt-4"
        labelTitle="Construction Year of the Property"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="number"
        defaultValue={propertyObj.squareFootage}
        updateType="squareFootage"
        containerStyle="mt-4"
        labelTitle="Square Footage of the Property"
        updateFormValue={updateFormValue}
      />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          className="btn btn-primary px-6"
          onClick={() => saveNewProperty()}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default AddPropertyModalBody;
