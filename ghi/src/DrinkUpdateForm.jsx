import { useUpdateDrinkMutation, useGetDrinkByIDQuery } from "./app/apiSlice";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fillupload from "./images/fillupload.gif";
import "./DrinkUpdateForm.css";

const DrinkUpdateForm = () => {
  const params = useParams();
  const [drinkUpdate] = useUpdateDrinkMutation();
  const [formData, setFormData] = useState();
  const navigate = useNavigate();
  const { data: drink, isLoading: drinksLoading } = useGetDrinkByIDQuery(
    params.id
  );
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      name: drink.name,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = drinkUpdate(formData);
    if (response.error) {
      alert("Unable to update drink");
    } else {
      navigate("/drinks");
    }
  };

  if (drinksLoading) {
    return (
      <div className="centered-spinner">
        <img src={fillupload} />
        <div>Pouring...</div>
      </div>
    );
  }

  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">Update {drink.name}</h5>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Description:</label>
            <input
              name="description"
              type="text"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Instructions:</label>
            <input
              name="instructions"
              type="text"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Image URL:</label>
            <input
              name="image_url"
              type="text"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div>
            <input className="btn btn-primary" type="submit" value="Update" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default DrinkUpdateForm;
