import React, { useState, useEffect } from "react";
import { useGetDrinkQuery } from "./app/apiSlice";
import { useGetTokenQuery } from "./app/apiSlice";

const Drinks = () => {
  const drinks = useGetDrinkQuery();

  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Drank</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">BAROMETER: WE HELP U MAKE DRANK</p>
      </div>
      <div>
        <button>Add drink</button>
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
            {drinks.data &&
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
    </div>
  );
};

export default Drinks;
