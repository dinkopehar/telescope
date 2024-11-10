import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../../store/modalSlice";
import { RootState, AppDispatch } from "../../store";
import { getPortfolios, setData } from "./portfolioSlice";
import SearchBar from "../../components/Input/SearchBar";

import TrashIcon from "@heroicons/react/24/outline/TrashIcon";

interface ModalBodyTypes {
  USER_DETAIL: string;
  PORTFOLIO_ADD_NEW: string;
  CONFIRMATION: string;
  DEFAULT: string;
}

interface ConfirmationModalCloseTypes {
  PORTFOLIO_DELETE: string;
}

const MODAL_BODY_TYPES: ModalBodyTypes = {
  USER_DETAIL: "USER_DETAIL",
  PORTFOLIO_ADD_NEW: "PORTFOLIO_ADD_NEW",
  CONFIRMATION: "CONFIRMATION",
  DEFAULT: "",
};

const CONFIRMATION_MODAL_CLOSE_TYPES: ConfirmationModalCloseTypes = {
  PORTFOLIO_DELETE: "PORTFOLIO_DELETE",
};

interface Portfolio {
  id: number;
  name: string;
}

const TopSideButtons = ({ removeFilter, applySearch }) => {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");

  const removeAppliedFilter = () => {
    setSearchText("");
  };

  useEffect(() => {
    if (searchText == "") {
      removeAppliedFilter();
    } else {
      applySearch(searchText);
    }
  }, [searchText]);

  const openAddNewPortfolioModal = () => {
    dispatch(
      openModal({
        title: "Add New Portfolio",
        bodyType: MODAL_BODY_TYPES.PORTFOLIO_ADD_NEW,
        extraObject: {},
      }),
    );
  };

  return (
    <div className="inline-block float-right">
      <SearchBar
        searchText={searchText}
        styleClass="mr-4"
        setSearchText={setSearchText}
      />
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewPortfolioModal()}
      >
        Add New
      </button>
    </div>
  );
};

function Portfolios() {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.portfolio);

  useEffect(() => {
    dispatch(getPortfolios());
  }, [dispatch]);

  const getDummyStatus = (): JSX.Element => {
    switch (Math.floor(Math.random() * 5)) {
      case 0:
        return <div className="badge">Not Interested</div>;
      case 1:
        return <div className="badge badge-primary">In Progress</div>;
      case 2:
        return <div className="badge badge-secondary">Sold</div>;
      case 3:
        return <div className="badge badge-accent">Need Followup</div>;
      case 4:
        return <div className="badge badge-ghost">Open</div>;
      default:
        return <div className="badge">Not Interested</div>;
    }
  };

  const deleteCurrentPortfolio = (index: number) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this Portfolio?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.PORTFOLIO_DELETE,
          index,
        },
      }),
    );
  };

  // Search according to name
  const applySearch = (value) => {
    let filteredPortfolios = data.filter((portfolio) => {
      return portfolio.name.toLowerCase().includes(value.toLowerCase());
    });
    dispatch(setData(filteredPortfolios));
  };

  return (
    <>
      <TitleCard
        title="Current Portfolios"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons applySearch={applySearch} />}
      >
        {/* Leads List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Created At</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((portfolio: Portfolio, k: number) => {
                return (
                  <tr key={k}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-bold">{portfolio.id}</div>
                        </div>
                      </div>
                    </td>
                    <td>{portfolio.name}</td>
                    <td>
                      {moment(new Date())
                        .add(-5 * (k + 2), "days")
                        .format("DD MMM YY")}
                    </td>
                    <td>{getDummyStatus()}</td>
                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentPortfolio(portfolio.id)}
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

export default Portfolios;
