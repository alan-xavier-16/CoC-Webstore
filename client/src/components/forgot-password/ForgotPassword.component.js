import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { forgotPassword } from "../../redux/auth/auth.actions";

const ForgotPassword = ({ forgotPassword }) => {
  const [formData, setFormData] = useState({
    email: ""
  });

  const { email } = formData;

  // Form Input Changes
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form Submit
  const handleSubmit = e => {
    e.preventDefault();
    forgotPassword(email);
    setFormData({ email: "" });
  };

  return (
    <div className="forgot-password">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h1>Forgot Password?</h1>
          <p>You can reset your password here</p>
        </div>

        <div className="form-group">
          <label htmlFor="email">Reset Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="johndoe@gmail.com"
            required
          />
        </div>

        <button type="submit" className="btn btn-gold">
          Reset Password
        </button>
      </form>

      <div className="signin-actions">
        <Link to={`/signin`}>Back to Sign In</Link>
      </div>
    </div>
  );
};

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  forgotPassword: email => forgotPassword(email)
};

export default connect(null, mapDispatchToProps)(ForgotPassword);
