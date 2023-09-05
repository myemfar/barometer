import { useCreateDrinkMutation } from "./app/apiSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DrinkForm = () => {
  const [drinks] = useCreateDrinkMutation();
  const [formData, setFormData] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = drinks(formData);
    if (response.error) {
      alert("Unable to create drink");
    } else {
      navigate("/drinks");
    }
  };

  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">Drink Creation</h5>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              name="name"
              type="text"
              className="form-control"
              onChange={handleChange}
            />
          </div>
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
            <input className="btn btn-primary" type="submit" value="create" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default DrinkForm;
