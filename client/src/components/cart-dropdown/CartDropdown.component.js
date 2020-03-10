import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import CartDropdownItem from "../cart-dropdown-item/CartDropdownItem.component";

import { toggleCart } from "../../redux/cart/cart.actions";
import {
  selectCartItems,
  selectCartTotal
} from "../../redux/cart/cart.selectors";

import "./CartDropDown.styles.scss";

const CartDropdown = ({ cart, total, dispatch }) => {
  /* ACCESS HISTORY OBJECT */
  let history = useHistory();

  /* PUSH USER TO /checkout & CLOSE DROPDOWN */
  const handleClick = () => {
    history.push("/cart");
    dispatch(toggleCart());
  };

  return (
    <div className="cart-dropdown">
      <div className="cart-dropdown-details">
        <div>
          Total: <span className="cart-dropdown-price">TT${total}</span>
        </div>
        <button
          className={`btn btn-gold ${!cart && "disabled"}`}
          disabled={!cart}
          onClick={handleClick}
        >
          Cart <i className="fas fa-angle-right"></i>
        </button>
      </div>

      <div className="cart-items">
        {cart ? (
          cart.map(cartItem => (
            <CartDropdownItem key={cartItem._id} item={cartItem} />
          ))
        ) : (
          <div className="empty-msg">Your cart is empty</div>
        )}
      </div>
    </div>
  );
};

CartDropdown.propTypes = {
  cart: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired
};

const mapStateToProps = createStructuredSelector({
  cart: selectCartItems,
  total: selectCartTotal
});

export default connect(mapStateToProps)(CartDropdown);
