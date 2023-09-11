import { useUpdateDrinkMutation, useGetDrinkByIDQuery } from "./app/apiSlice";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fillupload from "./images/fillupload.gif";
import "./DrinkUpdateForm.css";
import { Modal, Button } from "react-bootstrap";
import { closeModal } from "./app/modalSlice";
import { useSelector, useDispatch } from "react-redux";

const DrinkUpdateForm = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const show = useSelector((state) => state.modal.show);
  const [drinkUpdate] = useUpdateDrinkMutation();
  const navigate = useNavigate();
  const { data: drink, isLoading: drinksLoading } = useGetDrinkByIDQuery(
    params.id
  );
  const [formData, setFormData] = useState({
    name: drink.name,
    description: drink.description,
    instructions: drink.instructions,
    image_url: drink.image_url,
  });

  const handleClose = () => {
    dispatch(closeModal());
    navigate("/drinks");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
    <Modal show={show} onHide={handleClose} keyboard={false}>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Update Drink</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Description:</label>
            <input
              name="description"
              type="text"
              defaultValue={formData.description}
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
              defaultValue={formData.instructions}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Image URL:</label>
            <input
              name="image_url"
              type="text"
              className="form-control"
              defaultValue={formData.image_url}
              onChange={handleChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className="btn btn-primary" variant="primary" type="submit">
            Update
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default DrinkUpdateForm;
