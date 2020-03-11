import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { modifyCartItem, clearCartItem } from "../../redux/cart/cart.actions";

import "./CartItem.styles.scss";

const CartItem = ({ item, modifyCartItem, clearCartItem }) => {
  const {
    product: { name, photo, description, price, inventory }
  } = item;

  /* Set Quantity of Product on Form */
  const [formData, setFormData] = useState({
    quantity: item.quantity ? item.quantity : 1
  });
  const { quantity } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Modify Cart Item Button
  const handleModify = e => {
    const updatedItem = { ...item, ...formData };
    modifyCartItem(updatedItem);
  };

  // Remove Cart Item Button
  const handleRemove = e => {
    const removeItem = { ...item };
    clearCartItem(removeItem);
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <form className="cart-item" onSubmit={handleSubmit}>
      <div className={`cart-item-img ${inventory === 0 && "disabled"}`}>
        <img src={`../uploads/${photo}`} alt={`product ${name}`} />
        {inventory === 0 && <span className="img-no-stock">Out of Stock</span>}
      </div>

      <div className="cart-item-body">
        <ul className="cart-item-info">
          <li className="cart-item-name">{name}</li>
          <li className="cart-item-description">{`${description.slice(
            0,
            75
          )}...`}</li>
        </ul>

        <div className="cart-item-total">
          <div className="cart-item-price">TT${price}</div>
          <span>x</span>
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={handleChange}
            min="1"
          />
          <div>TT${quantity * price}</div>
        </div>

        <div className="cart-item-buttons">
          <button className="btn btn-warning" onClick={handleRemove}>
            <i className="fas fa-minus-circle"></i>
          </button>
          <button className="btn btn-primary" onClick={handleModify}>
            <i className="fas fa-save"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  modifyCartItem: PropTypes.func.isRequired,
  clearCartItem: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  modifyCartItem: cartItem => modifyCartItem(cartItem),
  clearCartItem: cartItem => clearCartItem(cartItem)
};

export default connect(null, mapDispatchToProps)(CartItem);
