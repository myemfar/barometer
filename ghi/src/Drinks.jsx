import React from "react";
import {
  useGetDrinkQuery,
  useDeleteDrinkMutation,
  useGetDrinkTagsQuery,
  useGetTokenQuery,
} from "./app/apiSlice";
import Search from "./Search";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import fillupload from "./images/fillupload.gif";
import { openModal } from "./app/modalSlice";
import "./Drinks.css";
import DrinkCard from "./DrinkCard";

const DrinkList = ({ drinks, tokenData, handleDrinkDelete, drinkTags }) => {
  return (
    <div className="row">
      {drinks.data.map((item) => (
        <DrinkCard
          key={item.id}
          item={item}
          tokenData={tokenData}
          handleDrinkDelete={handleDrinkDelete}
          drinkTags={drinkTags}
        />
      ))}
    </div>
  );
};




const Drinks = () => {
  const dispatch = useDispatch();
  const drinks = useGetDrinkQuery();
  const { data: tokenData, isLoading: tokenDataLoading } = useGetTokenQuery();
  const { data: drinkTags, isLoading: drinkTagsLoading } = useGetDrinkTagsQuery(
    {
      skip: !tokenData,
    }
  );
  const [drinkDelete] = useDeleteDrinkMutation();

  const handleOpenModal = () => {
    dispatch(openModal());
  };


  const handleDrinkDelete = (e) => {
    const deleteData = {
      id: e.target.value,
    };
    drinkDelete({ drink_id: e.target.value, data: deleteData })
      .unwrap()
      .then(() => {
        alert("Drink succesfully deleted");
      })
      .catch(() => {
        alert("WHY IS THERE ERROR HERE");
      });
  };
  if (drinkTagsLoading || tokenDataLoading) {
    return (
      <div className="centered-spinner">
        <img src={fillupload} />
        <div>Pouring...</div>
      </div>
    );
  }

  return (
    <div className="px-4 py-5 my-5 text-center">
      <div className= "drink-container drink-font">
      <h1 className="display-5 fw-bold">Drinks</h1>
      
      <div className="my-3">
        <NavLink
          className="btn btn-secondary mx-2"
          aria-current="page"
          to="/drinks/new"
          onClick={handleOpenModal}
          style={{
            display: !tokenData ? "none" : "inline-block",
          }}
        >
          Create Drink
        </NavLink>
      </div>
      <div className="d-flex justify-content-center">
        <Search />
      </div>
      </div>
      <div className= "card-grid">
      {drinks.data && (
        <DrinkList
          drinks={drinks}
          tokenData={tokenData}
          handleDrinkDelete={handleDrinkDelete}
          drinkTags={drinkTags}
        />
      )}</div>
    </div>
  );
};

export default Drinks;
