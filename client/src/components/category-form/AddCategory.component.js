import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addCategory } from "../../redux/shop/shop.actions";

import "./CategoryForm.styles.scss";

const AddCategory = ({ addCategory }) => {
  // FORM LOGIC
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });
  const { name, description } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    addCategory({ name, description });
    setFormData({ name: "", description: "" });
  };

  return (
    <div className="category-form">
      <div className="category-form-header">
        <h1>Add a New Category to your Shop!</h1>
      </div>

      <form className="form" onSubmit={handleSubmit}>
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
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-gold">
          Add Category <i className="fas fa-plus-square"></i>
        </button>
      </form>
    </div>
  );
};

AddCategory.propTypes = {
  addCategory: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  addCategory: formData => addCategory(formData)
};

export default connect(null, mapDispatchToProps)(AddCategory);
