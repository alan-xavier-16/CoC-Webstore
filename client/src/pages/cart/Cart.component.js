import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import CartItem from "../../components/cart-item/CartItem.component";

import {
  selectCartItems,
  selectCartTotal
} from "../../redux/cart/cart.selectors";
import { deleteCart } from "../../redux/cart/cart.actions";

import "./Cart.styles.scss";

const Cart = ({ cart, total, deleteCart }) => {
  let history = useHistory();
  const handleDelete = e => {
    deleteCart(history);
    history.push("/shop");
  };

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

      <div className="cart-btns">
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete Cart <i className="fas fa-trash-alt"></i>
        </button>
        <button className="btn btn-gold">
          To Checkout <i className="fas fa-money-check-alt"></i>
        </button>
      </div>
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  deleteCart: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  cart: selectCartItems,
  total: selectCartTotal
});

const mapDispatchToProps = {
  deleteCart: () => deleteCart()
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
