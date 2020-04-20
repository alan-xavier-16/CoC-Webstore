import React, { useState } from "react";
import "./Search.styles.scss";

const Search = ({ getAction }) => {
  const [search, setSearch] = useState("");

  // Form Input Changes
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  // Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let queryParams = null;
    if (search !== "") {
      queryParams = { search };
    }
    getAction(queryParams);
    setSearch("");
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-group">
        <label htmlFor="search"></label>
        <input
          type="text"
          name="search"
          value={search}
          placeholder="Search..."
          onChange={handleChange}
        />

        <div className="search-action">
          <button type="submit" className="btn btn-gold">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
