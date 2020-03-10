import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { updateCartItem } from "../../redux/cart/cart.actions";

import "./CartItem.styles.scss";

const CartItem = ({ item, updateCartItem }) => {
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

  const handleSubmit = e => {
    e.preventDefault();
    const updatedItem = { ...item, ...formData };
    updateCartItem(updatedItem);
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
          <button className="btn btn-warning">
            <i className="fas fa-trash-alt"></i>
          </button>
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-save"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  updateCartItem: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  updateCartItem: cartItemId => updateCartItem(cartItemId)
};

export default connect(null, mapDispatchToProps)(CartItem);
