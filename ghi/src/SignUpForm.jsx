import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUpMutation } from "./app/apiSlice";

const SignUpForm = () => {
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
        navigate("/home");
        alert("Account successfully created!");
      }
    } else {
      alert("Passwords do not match");
    }
  };
  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">Sign Up</h5>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
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
          <div>
            <input className="btn btn-primary" type="submit" value="Signup" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
