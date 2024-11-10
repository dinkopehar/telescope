import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../../store/modalSlice";
import { RootState } from "../../store";
import { getProperties } from "./propertiesSlice";

import TrashIcon from "@heroicons/react/24/outline/TrashIcon";

interface ModalBodyTypes {
  USER_DETAIL: string;
  PROPERTY_ADD_NEW: string;
  CONFIRMATION: string;
  MAP: string;
  DEFAULT: string;
}

interface ConfirmationModalCloseTypes {
  PROPERTY_DELETE: string;
}

const MODAL_BODY_TYPES: ModalBodyTypes = {
  USER_DETAIL: "USER_DETAIL",
  PROPERTY_ADD_NEW: "PROPERTY_ADD_NEW",
  MAP: "MAP",
  CONFIRMATION: "CONFIRMATION",
  DEFAULT: "",
};

const CONFIRMATION_MODAL_CLOSE_TYPES: ConfirmationModalCloseTypes = {
  PROPERTY_DELETE: "PROPERTY_DELETE",
};

interface Property {
  id: number;
  portfolio: string;
  address: string;
  estimated_value: number;
  construction_year: number;
  square_footage: number;
}

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewPropertyModal = () => {
    dispatch(
      openModal({
        title: "Add New Property",
        bodyType: MODAL_BODY_TYPES.PROPERTY_ADD_NEW,
        extraObject: {},
      }),
    );
  };

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewPropertyModal()}
      >
        Add New
      </button>
    </div>
  );
};

function Properties() {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.properties);

  const parseCoordinates = (coordinateString) => {
    // Remove the "SRID=4326;POINT " part and any parentheses
    const coordinates = coordinateString
      .replace("SRID=4326;POINT ", "")
      .replace(/[()]/g, "");

    const [longitude, latitude] = coordinates.split(" ").map(Number);

    return `LNG: ${latitude}, LAT:${longitude}`;
  };

  const openMapModal = () => {
    dispatch(
      openModal({
        title: "Place on Map",
        bodyType: MODAL_BODY_TYPES.MAP,
        extraObject: {},
      }),
    );
  };

  useEffect(() => {
    dispatch(getProperties());
  }, [dispatch]);

  const deleteCurrentProperty = (index: number) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this Property?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.PROPERTY_DELETE,
          index,
        },
      }),
    );
  };

  return (
    <>
      <TitleCard
        title="Current Properties"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* Leads List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Id</th>
                <th>Portfolio</th>
                <th>Address</th>
                <th>Estimated Value</th>
                <th>Construction Year</th>
                <th>Square Footage</th>
              </tr>
            </thead>
            <tbody>
              {data.map((properties: Property, k: number) => {
                return (
                  <tr key={k}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-bold">{properties.id}</div>
                        </div>
                      </div>
                    </td>
                    <td>{properties.portfolio}</td>
                    <td onClick={() => openMapModal(properties.address)}>
                      {parseCoordinates(properties.address)}
                    </td>
                    <td>{properties.estimated_value}</td>
                    <td>{properties.construction_year}</td>
                    <td>{properties.square_footage}</td>
                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentProperty(properties.id)}
                      >
                        <TrashIcon className="w-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Properties;
