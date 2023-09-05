import React, { useState, useEffect } from "react";
import { useGetDrinkQuery } from "./app/apiSlice";
import { useGetTokenQuery } from "./app/apiSlice";
import Search from "./Search";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Drinks = () => {
  const searchCriteria = useSelector((state) => state.search.value);
  const drinks = useGetDrinkQuery();

  const filteredData = () => {
    if (searchCriteria)
      return drinks.data.filter((item) => item.name.includes(searchCriteria));
  };
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Drank</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">BAROMETER: WE HELP U MAKE DRANK</p>
      </div>
      <NavLink className="btn btn-secondary" aria-current="page" to="/drinks/new">
        Create Drink
      </NavLink>
      <NavLink className="btn btn-secondary" aria-current="page" to="/drinks/recipes">
        Create Recipe
      </NavLink>
      <div>
        <Search />
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image_Url</th>
            <th>Description</th>
            <th>Instructions</th>
          </tr>
        </thead>
        <tbody>
          {searchCriteria &&
            drinks.data &&
            filteredData().map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.image_url}</td>
                <td>{item.description}</td>
                <td>{item.instructions}</td>
              </tr>
            ))}
          {!searchCriteria &&
            drinks.data &&
            drinks.data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.image_url}</td>
                <td>{item.description}</td>
                <td>{item.instructions}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Drinks;
