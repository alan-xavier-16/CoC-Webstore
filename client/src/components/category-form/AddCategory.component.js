import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { createCategory } from "../../redux/shop/shop.actions";

const AddCategory = ({ createCategory }) => {
  /* RELATIVE LINK, HISTORY && LOCATION OBJECT */
  const location = useLocation();
  const history = useHistory();

  // FORM LOGIC
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const { name, description } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory(formData, history, location);
  };

  return (
    <div className="category-form">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h1>Add a New Category</h1>
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Eg. Tarot Cards"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            placeholder="A short description of the category"
            name="description"
            value={description}
            rows="5"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-gold">
            <i className="fas fa-plus-square"></i>
          </button>

          {location.state && location.state.from && (
            <Link className="btn btn-dark" to={location.state.from}>
              Go Back
            </Link>
          )}
        </div>
      </form>
    </div>
  );
};

AddCategory.propTypes = {
  createCategory: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  createCategory: (formData, history, location) =>
    createCategory(formData, history, location),
};

export default connect(null, mapDispatchToProps)(AddCategory);
