import { useCreateRecipeMutation } from "./app/apiSlice";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useGetIngredientsQuery } from "./app/apiSlice";
import { useGetDrinkQuery } from "./app/apiSlice";

const RecipeForm = () => {
  const [recipe] = useCreateRecipeMutation();
  const [formData, setFormData] = useState();
  const ingredients = useGetIngredientsQuery();
  const drinks = useGetDrinkQuery();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const response = recipe(formData);

    if (response.error) {
      alert("Unable to create recipe");
    } else {
      alert("Recipe added");
    }
  };

  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">Add ingredient to drink</h5>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Select Drink:</label>
            <input
              className="form-control"
              onChange={handleChange}
              name="drink_name"
              list="datalistOptions"
              id="drinksDataList"
              placeholder="Type to search..."
            />
            <datalist id="datalistOptions">
              {drinks.data &&
                drinks.data.map((item) => (
                  <option value={item.name} key={item.id}>
                    {item.name}
                  </option>
                ))}
            </datalist>
          </div>
          <div className="mb-3">
            <label className="form-label">Add ingredient:</label>
            <input
              className="form-control"
              onChange={handleChange}
              name="ingredient_name"
              list="datalistOptions2"
              id="ingredientsDataList"
              placeholder="Type to search..."
            />
            <datalist id="datalistOptions2">
              {ingredients.data &&
                ingredients.data.map((item) => (
                  <option value={item.name} key={item.id}>
                    {item.name}
                  </option>
                ))}
            </datalist>
          </div>
          <div className="mb-3">
            <label className="form-label">Quantity:</label>
            <input
              name="quantity"
              type="text"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div>
            <input className="btn btn-primary" type="submit" value="add" />
          </div>
          <div>
            <NavLink
              className="btn btn-secondary"
              aria-current="page"
              to={`/drinks`}
            >
              Go back
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
