import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { search, reset } from "./app/drinkSearchSlice";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const searchCritera = useSelector((state) => state.search.value);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(search(searchInput));
  };

  return (
    <form className="row" onSubmit={handleSubmit}>
      <div className="col">
        <input
          className="form-control form-control-lg"
          type="text"
          placeholder=""
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div className="col">
        <button className="btn btn-lg btn-light" type="submit">
          Search
        </button>
        <button
          className="btn btn-lg btn-link"
          type="button"
          onClick={() => {
            dispatch(reset());
            setSearchInput("");
          }}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default Search;
