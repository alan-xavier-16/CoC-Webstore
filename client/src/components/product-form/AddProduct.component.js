import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";

import AddDetails from "./AddDetails.component";

import { addProduct } from "../../redux/shop/shop.actions";

const AddProduct = ({ addProduct }) => {
  /* URL PARAMS, HISTORY && LOCATION OBJECT */
  const { categorySlug } = useParams();
  const location = useLocation();
  const history = useHistory();

  // FORM LOGIC
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    inventory: 1,
    details: []
  });
  const { name, description, price, inventory } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDetails = detailsFromForm => {
    setFormData({ ...formData, details: detailsFromForm });
  };

  const handleSubmit = e => {
    e.preventDefault();
    addProduct(categorySlug, formData, history, location);
    setFormData({
      name: "",
      description: "",
      price: "",
      inventory: 1,
      details: []
    });
  };

  return (
    <div className="product-form">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h1>Add a New Product to your Shop!</h1>
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

        <AddDetails handleDetails={handleDetails} />

        <div className="form-actions">
          <button type="submit" className="btn btn-gold">
            <i className="fas fa-plus-square"></i>
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

AddProduct.propTypes = {
  addProduct: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  addProduct: (categorySlug, formData, history, location) =>
    addProduct(categorySlug, formData, history, location)
};

export default connect(null, mapDispatchToProps)(AddProduct);
