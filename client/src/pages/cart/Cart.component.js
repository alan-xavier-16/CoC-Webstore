import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import CartItem from "../../components/cart-item/CartItem.component";

import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";

import { deleteCart } from "../../redux/cart/cart.actions";

import "./Cart.styles.scss";

const Cart = ({ cart, cartTotal, deleteCart }) => {
  let history = useHistory();

  // DELETE ENTIRE CART
  const handleDelete = (e) => {
    deleteCart(history);
    history.push("/shop");
  };

  // TO PAYPAL PORTAL
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/checkout");
  };

  return (
    <form className="cart-page" onSubmit={handleSubmit}>
      <div className="cart-page-header">
        <h1>
          <i className="fas fa-shopping-cart"></i> Cart
        </h1>
        <div className="cart-total">TT${cartTotal}</div>
      </div>

      <div className="cart">
        {cart.map((cartItem) => (
          <CartItem key={cartItem._id} item={cartItem} />
        ))}
      </div>

      <div className="user-actions">
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete Cart <i className="fas fa-trash-alt"></i>
        </button>

        <button type="submit" className="btn btn-gold">
          To Checkout
        </button>
      </div>
    </form>
  );
};

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  cartTotal: PropTypes.number.isRequired,
  deleteCart: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  cart: selectCartItems,
  cartTotal: selectCartTotal,
});

const mapDispatchToProps = {
  deleteCart: () => deleteCart(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
