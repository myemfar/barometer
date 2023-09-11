import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUpMutation } from "./app/apiSlice";
import { closeModal } from "./app/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.modal.show);
  const [signUp] = useSignUpMutation();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [passConfirm, setPassConfirm] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    dispatch(closeModal());
    navigate("/");
  };

  const passConfirmChange = (e) => {
    setPassConfirm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password === passConfirm) {
      const response = await signUp(formData);
      setFormData({});
      if (response.error) {
        alert("Username already exists");
      } else {
        navigate("/");
        alert("Account successfully created!");
      }
    } else {
      alert("Passwords do not match");
    }
  };
  return (
    <Modal show={show} onHide={handleClose} keyboard={false}>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
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
          <div className="mb-3">
            <label className="form-label">Password confirmation:</label>
            <input
              name="password"
              type="password"
              className="form-control"
              onChange={passConfirmChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className="btn btn-primary" variant="primary" type="submit">
            Sign Up
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default SignUpForm;
