import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import PropTypes from "prop-types";

import PayPalButton from "../../components/paypal-button/PayPalButton.component";

import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";

import { addOrder } from "../../redux/orders/order.actions";

const Checkout = ({ cart, cartTotal, addOrder }) => {
  // CREATE ORDER ITEM
  let orderItem = {
    amount: cartTotal,
    items: cart.map((cartItem) => ({
      name: cartItem.product.name,
      price: cartItem.product.price,
      quantity: cartItem.quantity,
    })),
    paymentData: {},
  };

  /* CHECKOUT METHODS */
  const onSuccess = (paymentData) => {
    orderItem = { ...orderItem, paymentData };
    addOrder(orderItem);
  };
  const onError = (error) => {
    console.log(`Something went wrong with payment ${error}`);
  };
  const onCancel = () => {
    console.log(`Cancelled payment`);
  };

  return (
    <div className="checkout-page page">
      <div className="page-header">
        <h1 className="main-header">Proceed to Checkout</h1>
        <p className="lead">Choose either PayPal or WiPay</p>
      </div>

      <PayPalButton
        orderItem={orderItem}
        onSuccess={onSuccess}
        onError={onError}
        onCancel={onCancel}
      />
    </div>
  );
};

Checkout.propTypes = {
  cart: PropTypes.array.isRequired,
  cartTotal: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  cart: selectCartItems,
  cartTotal: selectCartTotal,
});

const mapDispatchToProps = {
  addOrder: (orderData) => addOrder(orderData),
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
