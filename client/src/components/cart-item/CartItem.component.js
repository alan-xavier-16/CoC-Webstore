import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import PropTypes from "prop-types";

import Slider from "../slider/Slider.component";

import { modifyCartItem, clearCartItem } from "../../redux/cart/cart.actions";

const CartItem = ({ item, modifyCartItem, clearCartItem }) => {
  // ACCESS LOCATION OBJECT
  const location = useLocation();

  const {
    product: { name, photo, price, inventory, details, slug },
  } = item;

  /* Set Quantity of Product on Form */
  const [formData, setFormData] = useState({
    quantity: item.quantity ? item.quantity : 1,
  });
  const { quantity } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Modify Cart Item Button
  const handleModify = (e) => {
    e.preventDefault();
    const updatedItem = { ...item, ...formData };
    modifyCartItem(updatedItem);
  };

  // Remove Cart Item Button
  const handleRemove = (e) => {
    e.preventDefault();
    const removeItem = { ...item };
    clearCartItem(removeItem);
  };

  return (
    <div className="product-card">
      <Link
        to={{
          pathname: `/shop/products/${slug}`,
          state: { from: location.pathname },
        }}
      >
        <div className={`card-img ${inventory === 0 && "disabled"}`}>
          <Slider photo={photo} />
          {inventory === 0 && (
            <span className="img-no-stock">Out of Stock</span>
          )}
        </div>
      </Link>

      <div className="product-card-body">
        <div className="product-card-detail">
          <div className="product-card-header">
            <h3 className="card-title">{name}</h3>
            <div className="card-price">TT${(price / 100).toFixed(2)}</div>
          </div>
        </div>

        <div className="card-body">
          <div className="card-body-item card-details">
            <div className="card-lead">Details:</div>
            <ul className="card-list">
              {details.map((detail) => (
                <li key={detail._id} className="card-list-item">
                  <span>{detail.title}</span>: {detail.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="card-body-item card-quantity">
            <div className="card-lead">Quantity:</div>
            <input
              type="number"
              name="quantity"
              value={quantity}
              onChange={handleChange}
              min="1"
              className="lead"
            />
          </div>

          <div className="card-body-item cart-item-total">
            <div className="card-lead">Total:</div>
            <div className="cart-total">
              TT${((quantity * price) / 100).toFixed(2)}
            </div>
          </div>

          <div className="user-actions">
            <button className="btn btn-warning" onClick={handleRemove}>
              <i className="fas fa-trash-alt"></i>
            </button>
            <button className="btn btn-primary" onClick={handleModify}>
              <i className="fas fa-save"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  modifyCartItem: PropTypes.func.isRequired,
  clearCartItem: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  modifyCartItem: (cartItem) => modifyCartItem(cartItem),
  clearCartItem: (cartItem) => clearCartItem(cartItem),
};

export default connect(null, mapDispatchToProps)(CartItem);
