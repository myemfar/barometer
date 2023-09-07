import { useCreateInventoryMutation, useGetIngredientsQuery } from "./app/apiSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const InventoryForm = () => {
  const [inventory] = useCreateInventoryMutation();
  const [formData, setFormData] = useState();
  const navigate = useNavigate();
  const ingredients = useGetIngredientsQuery();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = inventory(formData);
    if (response.error) {
      alert("Unable to create inventory");
    } else {
      navigate("/inventory/mine");
    }
  };

  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">My Inventory</h5>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Ingredient:</label>
            <div className="mb-3">
            <label className="form-label">Add ingredient:</label>
            <input
              className="form-control"
              onChange={handleChange}
              name="ingredient_id"
              list="datalistOptions2"
              id="ingredientsDataList"
              placeholder="Type to search..."
            />
            <datalist id="datalistOptions2">
              {ingredients.data &&
                ingredients.data.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
            </datalist>
          </div>
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
            <input className="btn btn-primary" type="submit" value="create" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryForm;