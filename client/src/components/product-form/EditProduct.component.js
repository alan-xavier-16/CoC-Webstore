import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import PropTypes from "prop-types";

import { editProduct } from "../../redux/shop/shop.actions";
import { selectProductItem } from "../../redux/shop/shop.selectors";

const EditProduct = ({ editProduct, product }) => {
  const { _id } = product;
  /* URL PARAMS, HISTORY && LOCATION OBJECT */
  const location = useLocation();
  const history = useHistory();

  // FORM LOGIC
  const [formData, setFormData] = useState({
    name: product.name ? product.name : "",
    description: product.description ? product.description : "",
    price: product.price ? (product.price / 100).toFixed(2) : "",
    inventory: product.inventory ? product.inventory : 1
  });
  const { name, description, price, inventory } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    editProduct(_id, formData);
  };

  return (
    <div className="product-form">
      <div className="product-form-header">
        <h1>Update {name} to your Shop!</h1>
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
          Update Product <i className="fas fa-plus-square"></i>
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

EditProduct.propTypes = {
  editProduct: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProp = createStructuredSelector({
  product: selectProductItem
});

const mapDispatchToProps = {
  editProduct: (productId, formData) => editProduct(productId, formData)
};

export default connect(mapStateToProp, mapDispatchToProps)(EditProduct);
