import { NavLink } from "react-router-dom";
import { useGetTokenQuery } from "./app/apiSlice";

const Nav = () => {
    const { data: account } = useGetTokenQuery();
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">Barometer</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                { !account && <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/login">
                  Log in
                </NavLink>
              </li>}
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
              </li>
              { account && <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="">
                  New Drink
                </NavLink>
              </li>}
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="">
                  Drinks
                </NavLink>
              </li>
              { account && <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="">
                  Inventory
                </NavLink>
              </li>}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Nav;
