import React, { useState, useEffect } from "react";
import {
  useGetDrinkByNameQuery,
  useCreateDrinkTagsMutation,
  useGetTagsQuery,
} from "./app/apiSlice";
import { useGetTokenQuery } from "./app/apiSlice";
import { useParams, useNavigate } from "react-router-dom";

const DrinkDetail = () => {
  const params = useParams();
  const [createDrinkTags] = useCreateDrinkTagsMutation();
  const { data: drink, isLoading: drinksLoading } = useGetDrinkByNameQuery(
    params.id
  );
  const navigate = useNavigate();
  const { data: tags, isLoading: tagsLoading } = useGetTagsQuery();

  if (drinksLoading || tagsLoading) return <div>Loading..</div>;

  const handleButton = (e) => {
    const tagData = { tag_id: e.target.value, drink_id: params.id };
    createDrinkTags(tagData)
      .unwrap()
      .then((result) => {
        alert("Tag succesfully added");
      })
      .catch((error) => {
        alert("Drink already tagged");
      });
  };

  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Drink Detail</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">BAROMETER: WE HELP U MAKE DRANK</p>
      </div>
      <div>
        {tags &&
          tags.map((item) => (
            <button onClick={handleButton} value={item.id} key={item.id}>
              {item.tag_name}{" "}
            </button>
          ))}
        <div className="card">
          <img
            src={drink.image_url}
            className="card-img-top rounded mx-auto d-block"
            alt={drink.name}
            style={{ maxHeight: "500px", width: "500px" }}
          />

          <div className="card-body">
            <h5 className="card-title">{drink.name}</h5>
            <p className="card-text">{drink.descriptions}</p>
            <p className="card-text">{drink.instructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinkDetail;
