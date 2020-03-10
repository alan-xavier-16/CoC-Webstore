import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import PropTypes from "prop-types";

import { selectCartItemsCount } from "../../redux/cart/cart.selectors";
import { toggleCart } from "../../redux/cart/cart.actions";

import "./CartIcon.styles.scss";

const CartIcon = ({ itemCount, toggleCart }) => {
  return (
    <div className="cart-icon" onClick={toggleCart}>
      <i className="fas fa-cart-arrow-down"></i>
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

CartIcon.propTypes = {
  itemCount: PropTypes.number.isRequired,
  toggleCart: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount
});

const mapDispatchToProps = {
  toggleCart: () => toggleCart()
};

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
