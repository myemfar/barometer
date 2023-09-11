import React from "react";
import {
  useGetInventoryByUserQuery,
  useDeleteIngredientMutation,
} from "./app/apiSlice";

import { NavLink } from "react-router-dom";
import fillupload from "./images/fillupload.gif";
import { openModal } from "./app/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import "./Inventory.css";

const Inventory = () => {
  const [deleteIngredient] = useDeleteIngredientMutation();
  const dispatch = useDispatch();
  const searchCriteria = useSelector((state) => state.search.value);

  const handleIngredientDelete = (e) => {
    const ingredient = { ingredient_id: e.target.value };
    deleteIngredient(ingredient)
      .unwrap()
      .then(() => {
        alert("Ingredient succesfully deleted");
      })
      .catch(() => {
        alert("Unable to delete ingredient");
      });
  };

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const { data: inventory, isLoading } = useGetInventoryByUserQuery();

  if (isLoading) {
    return (
      <div className="centered-spinner">
        <img src={fillupload} />
        <div>Pouring...</div>
      </div>
    );
  }

  return (
    
    <div className="px-4 py-5 my-5 text-center inventory-font">
      <h1 className="display-5 fw-bold">Inventory</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">BAROMETER: WE HELP U MAKE DRANK</p>
      </div>
      
      <div>
        <NavLink
          className="btn btn-secondary"
          aria-current="page"
          onClick={handleOpenModal}
          to="/inventory/new"
        >
          Add to Inventory
        </NavLink>
        {/* <div className= "inventory-table inventory-font"> */}
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Picture</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory &&
              inventory.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>
                    <img
                      src={item.image_url}
                      alt={item.name}
                      style={{ maxHeight: "100px", width: "auto" }}
                    />
                  </td>
                  <td>{item.quantity}</td>
                  <td>
                    <button
                      onClick={handleIngredientDelete}
                      value={item.id}
                      key={item.id}
                      className="btn btn-secondary"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
    // </div>
  );
};

export default Inventory;
