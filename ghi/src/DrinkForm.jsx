import { useCreateDrinkMutation } from "./app/apiSlice";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { closeModal } from "./app/modalSlice";

const DrinkForm = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.modal.show);
  const [drinks] = useCreateDrinkMutation();
  const [formData, setFormData] = useState();
  const navigate = useNavigate();

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
    const response = drinks(formData);
    if (response.error) {
      alert("Unable to create drink");
    } else {
      navigate("/drinks");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} keyboard={false}>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Drink Creation</Modal.Title>
        </Modal.Header>

        <Modal.Body>
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
        </Modal.Body>

        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
          <Button className="btn btn-secondary" variant="primary" type="submit">
            Create
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default DrinkForm;
