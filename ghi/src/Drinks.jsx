import React, { useState, useEffect } from "react";
import {
  useGetDrinkQuery,
  useGetTokenQuery,
  useGetTagsQuery,
  useDeleteDrinkMutation,
  useGetDrinkTagsQuery,
} from "./app/apiSlice";
import Search from "./Search";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Drinks = () => {
  const searchCriteria = useSelector((state) => state.search.value);
  const drinks = useGetDrinkQuery();
  const { data: drinkTags, isLoading: drinkTagsLoading } =
    useGetDrinkTagsQuery();
  const [drinkDelete] = useDeleteDrinkMutation();
  const [formData, setFormData] = useState();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
      .then((result) => {
        alert("Drink succesfully deleted");
      })
      .catch((error) => {
        alert("WHY IS THERE ERROR HERE");
      });
  };
  if (drinkTagsLoading) return <div>Loading..</div>;

  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Drank</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">BAROMETER: WE HELP U MAKE DRANK</p>
      </div>
      <NavLink
        className="btn btn-secondary"
        aria-current="page"
        to="/drinks/new"
      >
        Create Drink
      </NavLink>
      <NavLink
        className="btn btn-secondary"
        aria-current="page"
        to="/drinks/recipes"
      >
        Create Recipe
      </NavLink>
      <div>
        <Search />
      </div>
      {/* <div>
        <label className="form-label">Select Tag:</label>
        <input
          className="form-control"
          onChange={handleChange}
          name="tag_id"
          placeholder=""
        />
        <select name="tags" id="tagDropdown">
          {" "}
          {tags.data &&
            tags.data.map((item) => (
              <option value={item.id} id={item.id}>
                {item.tag_name}
              </option>
            ))}{" "}
        </select>
      </div> */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Description</th>
            <th>Instructions</th>
            <th>Tags</th>
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
                  <button
                    onClick={handleDrinkDelete}
                    className="btn btn-danger"
                    value={item.id}
                    key={item.id}
                  >
                    Delete Drink
                  </button>
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
                  <button
                    onClick={handleDrinkDelete}
                    className="btn btn-danger"
                    value={item.id}
                    key={item.id}
                  >
                    Delete Drink
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Drinks;
