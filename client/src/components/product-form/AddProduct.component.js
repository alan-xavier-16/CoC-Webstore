import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";

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
    inventory: 1
  });
  const { name, description, price, inventory } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    addProduct(categorySlug, formData, history, location);
    setFormData({ name: "", description: "", price: "", inventory: 1 });
  };

  return (
    <div className="product-form">
      <div className="product-form-header">
        <h1>Add a New Product to your Shop!</h1>
      </div>

      <form className="form" onSubmit={handleSubmit}>
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

        <button type="submit" className="btn btn-gold">
          Add Product <i className="fas fa-plus-square"></i>
        </button>
      </form>

      {location.state && location.state.from && (
        <Link className="btn btn-dark" to={location.state.from}>
          Go Back
        </Link>
      )}
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
