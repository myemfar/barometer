import { useCreateRecipeMutation } from "./app/apiSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetIngredientsQuery } from "./app/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import { useGetDrinkQuery } from "./app/apiSlice";
import { Modal, Button } from "react-bootstrap";
import { closeModal } from "./app/modalSlice";
import { useParams } from "react-router-dom";

const RecipeForm = () => {
  const dispatch = useDispatch();
  const { drinkName } = useParams();
  const show = useSelector((state) => state.modal.show);
  const [recipe] = useCreateRecipeMutation();
  const [formData, setFormData] = useState({
    drink_name: drinkName,
    ingredient_name: "",
    quantity: "",
  });
  const ingredients = useGetIngredientsQuery();
  const drinks = useGetDrinkQuery();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    dispatch(closeModal());
    navigate("/drinks");
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
    <Modal show={show} onHide={handleClose} keyboard={false}>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Recipe Creation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Select Drink:</label>
            <input
              className="form-control"
              onChange={handleChange}
              name="drink_name"
              list="datalistOptions"
              id="drinksDataList"
              value={formData.drink_name}
            />
          </div>
          <div className="mb-3">
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
              value={formData.ingredient_name}
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
              value={formData.quantity}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button className="btn btn-primary" variant="primary" type="submit">
            Add ingredient
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default RecipeForm;
