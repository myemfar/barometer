import React, { useState, useEffect } from "react";
import {
  useGetDrinkByNameQuery,
  useCreateDrinkTagsMutation,
  useGetTagsQuery,
  useGetRecipeForDrinkQuery,
  useDeleteRecipeMutation,
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
  const { data: steps, isLoading: stepsLoading } = useGetRecipeForDrinkQuery(
    params.id
  );
  const [deleteRecipe] = useDeleteRecipeMutation();
  if (drinksLoading || tagsLoading || stepsLoading) return <div>Loading..</div>;

  const handleRecipeDelete = (e) => {
    const drink = params.id;
    const recipe = e.target.value;
    if (!drink || !recipe) {
      alert("Invalid drink or recipe value");
      return;
    }
    deleteRecipe({ drink_id: drink, recipe_id: recipe })
      .unwrap()
      .then((result) => {
        alert("Recipe succesfully deleted");
      })
      .catch((error) => {
        alert("WHY IS THERE ERROR HERE");
      });
  };

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
          <div>
            <h3 className="display-5 fw-bold">Recipe</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Ingredient</th>
                  <th>Picture</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {steps &&
                  steps.map((item) => (
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
                          onClick={handleRecipeDelete}
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
      </div>
    </div>
  );
};

export default DrinkDetail;