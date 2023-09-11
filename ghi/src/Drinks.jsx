import React from "react";
import {
  useGetDrinkQuery,
  useDeleteDrinkMutation,
  useGetDrinkTagsQuery,
  useGetTokenQuery,
} from "./app/apiSlice";
import Search from "./Search";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import fillupload from "./images/fillupload.gif";
import { openModal } from "./app/modalSlice";
import "./Drinks.css";

const Drinks = () => {
  const dispatch = useDispatch();
  const searchCriteria = useSelector((state) => state.search.value);
  const drinks = useGetDrinkQuery();
  const { data: tokenData, isLoading: tokenDataLoading } = useGetTokenQuery();
  const { data: drinkTags, isLoading: drinkTagsLoading } = useGetDrinkTagsQuery(
    {
      skip: !tokenData,
    }
  );
  const [drinkDelete] = useDeleteDrinkMutation();

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const filteredData = () => {
    if (searchCriteria)
      return drinks.data.filter((item) => item.name.includes(searchCriteria));
  };
  const handleDrinkDelete = (e) => {
    const deleteData = {
      id: e.target.value,
    };
    drinkDelete({ drink_id: e.target.value, data: deleteData })
      .unwrap()
      .then(() => {
        alert("Drink succesfully deleted");
      })
      .catch(() => {
        alert("WHY IS THERE ERROR HERE");
      });
  };
  if (drinkTagsLoading || tokenDataLoading) {
    return (
      <div className="centered-spinner">
        <img src={fillupload} />
        <div>Pouring...</div>
      </div>
    );
  }

  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Drank</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">BAROMETER: WE HELP U MAKE DRANK</p>
      </div>
      <div className="my-3">
        <NavLink
          className="btn btn-primary mx-2"
          aria-current="page"
          to="/drinks/new"
          onClick={handleOpenModal}
          style={{
            display: !tokenData ? "none" : "inline-block",
          }}
        >
          Create Drink
        </NavLink>
      </div>
      <div className="d-flex justify-content-center">
        <Search />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Description</th>
            <th>Instructions</th>
            {tokenData && <th>Tags</th>}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchCriteria &&
            drinks.data &&
            filteredData().map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <img
                    src={item.image_url}
                    alt={item.name}
                    style={{ maxHeight: "100px", width: "auto" }}
                  />
                </td>
                <td>{item.description}</td>
                <td>{item.instructions}</td>
                <td>
                  {tokenData && Array.isArray(drinkTags) && drinkTags.length > 0
                    ? drinkTags
                        .filter((tag) => tag.drink_id === item.id)
                        .map((tag) => (
                          <span
                            key={tag.id}
                            className="badge bg-secondary me-1"
                          >
                            {tag.tag_name}
                          </span>
                        ))
                    : "No tags available"}
                </td>
                <td>
                  <NavLink
                    className="btn btn-secondary"
                    aria-current="page"
                    to={`/drinks/${item.id}`}
                  >
                    Details
                  </NavLink>
                  {tokenData && item.user_id === tokenData.id ? (
                    <button
                      onClick={handleDrinkDelete}
                      className="btn btn-danger"
                      value={item.id}
                      key={item.id}
                    >
                      Delete Drink
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          {!searchCriteria &&
            drinks.data &&
            drinks.data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <img
                    src={item.image_url}
                    alt={item.name}
                    style={{ maxHeight: "100px", width: "auto" }}
                  />
                </td>
                <td>{item.description}</td>
                <td>{item.instructions}</td>
                <td>
                  {Array.isArray(drinkTags) && drinkTags.length > 0
                    ? drinkTags
                        .filter((tag) => tag.drink_id === item.id)
                        .map((tag) => (
                          <span
                            key={tag.id}
                            className="badge bg-secondary me-1"
                          >
                            {tag.tag_name}
                          </span>
                        ))
                    : "No tags available"}
                </td>
                <td>
                  <NavLink
                    className="btn btn-secondary"
                    aria-current="page"
                    to={`/drinks/${item.id}`}
                  >
                    Details
                  </NavLink>
                  {tokenData && item.user_id === tokenData.id ? (
                    <button
                      onClick={handleDrinkDelete}
                      className="btn btn-danger"
                      value={item.id}
                      key={item.id}
                    >
                      Delete Drink
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Drinks;
