import React, { useState, useEffect } from "react";
import { useGetInventoryByUserQuery } from "./app/apiSlice";
import { useGetTokenQuery } from "./app/apiSlice";

const Inventory = () => {
  // const account = useGetTokenQuery();
  // const accountId = account?.data?.id || undefined;
  const inventory = useGetInventoryByUserQuery();
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Inventory</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">BAROMETER: WE HELP U MAKE DRANK</p>
      </div>
      <div>
        <button>Add to inventory</button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Picture</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {inventory.data &&
              inventory.data.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>
                    <img
                      src={
                        item.image_url.startsWith("http://") ||
                        item.image_url.startsWith("https://")
                          ? item.image_url
                          : "https://" + item.image_url
                      }
                      alt={item.name}
                      style={{ maxHeight: "100px", width: "auto" }}
                    />
                  </td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
