import { useLoginMutation } from "./app/apiSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { closeModal } from "./app/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";

const LoginForm = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.modal.show);
  const [login] = useLoginMutation();
  const [formData, setFormData] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(formData);
    if (response.error) {
      alert("Incorrect password or username");
    } else {
      navigate("/");
    }
  };

  const handleClose = () => {
    dispatch(closeModal());
    navigate("/");
  };

  return (
    <Modal show={show} onHide={handleClose} keyboard={false}>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              name="username"
              type="text"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              name="password"
              type="password"
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            className="btn btn-primary"
            variant="primary"
            type="submit"
            value="Login"
          >
            Log In
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default LoginForm;
