import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import { createCategory } from "../../redux/shop/shop.actions";
import { selectCategory } from "../../redux/shop/shop.selectors";

const EditCategory = ({ createCategory, category }) => {
  /* LOCATION OBJECT */
  const location = useLocation();
  const history = useHistory();

  // FORM LOGIC
  const [formData, setFormData] = useState({
    name: category.name ? category.name : "",
    description: category.description ? category.description : "",
  });
  const { name, description } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory(formData, history, location, category._id, true);
  };

  return (
    <div className="category-form">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h1>{`Update ${category.name}`}</h1>
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
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-gold">
            <i className="fas fa-save"></i>
          </button>

          {location.state && location.state.from && (
            <Link className="btn btn-dark" to={location.state.from}>
              <i className="fas fa-angle-left"></i>
            </Link>
          )}
        </div>
      </form>
    </div>
  );
};

EditCategory.propTypes = {
  createCategory: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  category: selectCategory(ownProps.match.params.categorySlug)(state),
});

const mapDispatchToProps = {
  createCategory: (formData, history, location, categoryId, edit) =>
    createCategory(formData, history, location, categoryId, edit),
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCategory);
