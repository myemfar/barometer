import React, { useState, useEffect } from "react";
import { useGetDrinkByNameQuery } from "./app/apiSlice";
import { useGetTokenQuery } from "./app/apiSlice";
import { useParams } from "react-router-dom";

const DrinkDetail = () => {
  // const account = useGetTokenQuery();
  // const accountId = account?.data?.id || undefined;
  const params = useParams();

  const drink = useGetDrinkByNameQuery(params.id);
  console.log(drink);
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Drink Detail</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">BAROMETER: WE HELP U MAKE DRANK</p>
      </div>
      <div>
        <button>Add to favorites</button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Picture</th>
              <th>Desc.</th>
              <th>Instructions</th>
            </tr>
          </thead>
          <tbody>
            {drink.data &&
              drink.data.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>
                    <img
                      src={item.image_url}
                      alt={item.name}
                      style={{ maxHeight: "100px", width: "auto" }}
                    />
                  </td>
                  <td>{item.descriptions}</td>
                  <td>{item.instructions}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DrinkDetail;
