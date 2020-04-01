import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useRouteMatch, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { login } from "../../redux/auth/auth.actions";

const SignIn = ({ login }) => {
  // RELATIVE LINK
  const { url } = useRouteMatch();
  // LOCATION OBJECT
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [pwdType, setPwdType] = useState("password");

  const { email, password } = formData;

  // Form Input Changes
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form Submit
  const handleSubmit = e => {
    e.preventDefault();
    login(formData);
    setFormData({ email: "", password: "" });
  };

  return (
    <div className="signin">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h1>Sign In</h1>
          <p>
            <i className="fas fa-sign-in-alt"></i> Welcome back
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="johndoe@gmail.com"
            required
          />
        </div>

        <div className="form-group form-group-icon">
          <label htmlFor="password">Password</label>
          <input
            type={pwdType}
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            minLength="6"
          />
          <i
            className="fas fa-eye-slash"
            onClick={e =>
              pwdType === "text" ? setPwdType("password") : setPwdType("text")
            }
          ></i>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-gold">
            Sign In
          </button>

          {location.state && location.state.from ? (
            <Link className="btn btn-dark" to={location.state.from}>
              <i className="fas fa-angle-left"></i>
            </Link>
          ) : (
            <Link className="btn btn-dark" to="/">
              <i className="fas fa-angle-left"></i>
            </Link>
          )}
        </div>
      </form>

      <div className="signin-actions">
        <Link
          to={{
            pathname: `${url}/signup`,
            state: { from: location.pathname }
          }}
        >
          New to Circles? <span>Sign Up Now</span>
        </Link>

        <Link to={`${url}/identity`}>Forgot Password?</Link>
      </div>
    </div>
  );
};

SignIn.propTypes = {
  login: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  login: formData => login(formData)
};

export default connect(null, mapDispatchToProps)(SignIn);
