import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import AddDetails from "./AddDetails.component";

import { createProduct } from "../../redux/shop/shop.actions";
import { selectCategory } from "../../redux/shop/shop.selectors";

const AddProduct = ({ createProduct, category }) => {
  /* HISTORY && LOCATION OBJECT */
  const location = useLocation();
  const history = useHistory();

  // USER INTERFACE WARNING
  const [isModified, setIsModified] = useState(false);

  // FORM LOGIC
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    inventory: 1,
    details: [
      {
        title: "",
        text: "",
      },
    ],
  });
  const { name, description, price, inventory, details } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsModified(true);
  };

  const handleDetails = (details) => {
    setFormData({ ...formData, details: [...details] });
    setIsModified(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(formData, history, location, category._id);
  };

  return (
    <div className="product-form">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h1>Add a New Product</h1>
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Lipton Tea"
            required
          />
          <small>Name cannot be more than 30 characters</small>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            placeholder="A short description of the product"
            name="description"
            value={description}
            rows="5"
            onChange={handleChange}
          ></textarea>
          <small>Description cannot be more than 500 characters</small>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={handleChange}
            placeholder="2.00"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="inventory">Inventory</label>
          <input
            type="number"
            name="inventory"
            value={inventory}
            onChange={handleChange}
          />
          <small>
            Items available for sale. Allowable quantities range from 0 to 500.
          </small>
        </div>

        <AddDetails handleDetails={handleDetails} details={details} />

        <div className="form-actions">
          <button
            type="submit"
            className={`btn btn-gold ${!isModified && "disabled"}`}
            disabled={!isModified}
          >
            <i className="fas fa-save"></i> Save Product
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

AddProduct.propTypes = {
  createProduct: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  category: selectCategory(ownProps.match.params.categorySlug)(state),
});

const mapDispatchToProps = {
  createProduct: (formData, history, location, identifier) =>
    createProduct(formData, history, location, identifier),
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
