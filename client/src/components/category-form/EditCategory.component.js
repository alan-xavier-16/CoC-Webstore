import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { editCategory } from "../../redux/shop/shop.actions";
import { selectCategory } from "../../redux/shop/shop.selectors";

import "./CategoryForm.styles.scss";

const EditCategory = ({ editCategory, category }) => {
  const { _id } = category;
  // FORM LOGIC
  const [formData, setFormData] = useState({
    name: category.name ? category.name : "",
    description: category.description ? category.description : ""
  });
  const { name, description } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    editCategory(_id, { name, description });
  };

  return (
    <div className="category-form">
      <div className="category-form-header">
        <h1>{`Update ${category.name}!`}</h1>
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
          Update Category <i className="fas fa-plus-square"></i>
        </button>
      </form>
    </div>
  );
};

EditCategory.propTypes = {
  editCategory: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  category: selectCategory(ownProps.match.params.categorySlug)(state)
});

const mapDispatchToProps = {
  editCategory: (categoryId, formData) => editCategory(categoryId, formData)
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCategory);
