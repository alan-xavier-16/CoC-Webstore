import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import PropTypes from "prop-types";

import CartItem from "../../components/cart-item/CartItem.component";

import {
  selectCartItems,
  selectCartTotal
} from "../../redux/cart/cart.selectors";

import "./Cart.styles.scss";

const Cart = ({ cart, total }) => {
  return (
    <div className="cart-page">
      <div className="cart-page-header">
        <h1>
          <i className="fas fa-shopping-cart"></i> Cart
        </h1>
        <div className="cart-total">TT${total}</div>
      </div>

      <div className="cart">
        {cart.map(cartItem => (
          <CartItem key={cartItem._id} item={cartItem} />
        ))}
      </div>

      <button className="btn btn-gold">
        Proceed To Checkout <i className="fas fa-money-check-alt"></i>
      </button>
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired
};

const mapStateToProps = createStructuredSelector({
  cart: selectCartItems,
  total: selectCartTotal
});

export default connect(mapStateToProps)(Cart);
