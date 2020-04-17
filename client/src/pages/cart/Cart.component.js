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
    <div className="page">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-header cart-header">
          <h1>
            <span>
              <i className="fas fa-shopping-cart"></i>
            </span>{" "}
            Cart
          </h1>
          <div className="cart-total">TT${(cartTotal / 100).toFixed(2)}</div>
        </div>

        <div className="form-group">
          {cart.map((cartItem) => (
            <CartItem key={cartItem._id} item={cartItem} />
          ))}
        </div>

        <div className="form-actions">
          <button className="btn btn-danger" onClick={handleDelete}>
            Clear Cart <i className="fas fa-trash-alt"></i>
          </button>

          <button type="submit" className="btn btn-gold">
            Checkout
          </button>
        </div>
      </form>
    </div>
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
