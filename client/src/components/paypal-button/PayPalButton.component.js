import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import { compose } from "redux";

/* PAYPAL CONFIG */
const CLIENT = {
  sandbox: process.env.REACT_APP_PAYPAL_TEST_CLIENT_ID,
  production: process.env.REACT_APP_PAYPAL_CLIENT_ID,
};
const CLIENT_ID =
  process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;

let PayPalButton = ({ isScriptLoaded, isScriptLoadSucceed, ...rest }) => {
  const { orderItem, onSuccess, onError, onCancel } = rest;
  const [showBtn, setShowBtn] = useState(false);

  /* BIND REACT && REACTDOM TO WINDOW OBJECT FOR PAYPAL */
  window.React = React;
  window.ReactDOM = ReactDOM;

  /* PAYPAL API LOADS ASYNCRONOUSLY */
  /* RENDER BUTTON WITH REACT-ASYNC-SCRIPT-LOADER WHEN LOADED */
  useEffect(() => {
    if (isScriptLoaded && isScriptLoadSucceed) {
      PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
      setShowBtn(true);
    }
  }, [isScriptLoaded, isScriptLoadSucceed]);

  /* PAYPAL BTN METHODS */
  const createOrder = (data, actions) => {
    data = orderItem;

    return actions.order.create({
      purchase_units: [
        {
          description: `Paypal Payment`,
          amount: {
            currency_code: "USD",
            value: data.amount,
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    try {
      await actions.order.capture();

      const paymentData = {
        paypal: {
          payerID: data.payerID,
          orderID: data.orderID,
        },
      };

      onSuccess(paymentData);
      setShowBtn(false);
    } catch (err) {
      onError(err);
    }
  };

  return (
    <div className="paypal-btn">
      {showBtn && (
        <PayPalButton
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
          onCancel={onCancel}
        />
      )}
    </div>
  );
};

export default compose(
  scriptLoader(`https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`)
)(PayPalButton);
