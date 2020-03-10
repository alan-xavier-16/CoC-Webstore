import React from "react";
import "./WithSpinner.styles.scss";

const WithSpinner = WrappedComponent => {
  const Spinner = ({ loading, ...rest }) => {
    return loading ? (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    ) : (
      <WrappedComponent {...rest} />
    );
  };
  return Spinner;
};

export default WithSpinner;
