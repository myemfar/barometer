import { NavLink } from "react-router-dom";
import { useGetTokenQuery, useLogOutMutation } from "./app/apiSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { openModal } from "./app/modalSlice";
import { useDispatch } from "react-redux";

const Nav = () => {
  const { data: account } = useGetTokenQuery();
  const [logOut, logoutResponse] = useLogOutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  useEffect(() => {
    if (logoutResponse.data) navigate("/");
  }, [logoutResponse, navigate]);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bartop-bg">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Barometer
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              {account && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    onClick={handleOpenModal}
                    to="/drinks/new"
                  >
                    New Drink
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/drinks">
                  Drinks
                </NavLink>
              </li>
              {account && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/inventory/mine"
                  >
                    Inventory
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/drinks/random"
                >
                  Random Drink
                </NavLink>
              </li>
            </ul>
          </div>
          <div
            className="collapse navbar-collapse justify-content-md-end"
            id="navbarRightAlighnContent"
          >
            {!account && (
              <li className="nav-item">
                <NavLink
                  className="btn btn-info"
                  aria-current="page"
                  onClick={handleOpenModal}
                  to="/signUp"
                >
                  Sign Up
                </NavLink>
              </li>
            )}
            {account && (
              <li className="nav-item justify-content-md-end">
                <NavLink
                  onClick={logOut}
                  className="btn btn-secondary justify-content-md-end"
                  aria-current="page"
                  to="/"
                >
                  Log Out
                </NavLink>
              </li>
            )}
            {!account && (
              <li className="nav-item">
                <NavLink
                  className="btn btn-secondary"
                  aria-current="page"
                  onClick={handleOpenModal}
                  to="/login"
                >
                  Log in
                </NavLink>
              </li>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
