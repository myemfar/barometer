import {
  useCreateInventoryMutation,
  useGetIngredientsQuery,
} from "./app/apiSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { closeModal } from "./app/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";

const InventoryForm = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.modal.show);
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

  const handleClose = () => {
    dispatch(closeModal());
    navigate("/inventory/mine");
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
    <Modal show={show} onHide={handleClose} keyboard={false}>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>My Inventory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Ingredient:</label>
            <div className="mb-3">
              <label className="form-label">Add ingredient:</label>
              <input
                className="form-control"
                onChange={handleChange}
                name="name"
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className="btn btn-primary" variant="primary" type="submit">
            Add
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default InventoryForm;
