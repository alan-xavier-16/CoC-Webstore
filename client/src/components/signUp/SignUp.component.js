import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { setAlert } from "../../redux/alerts/alert.actions";
import { register } from "../../redux/auth/auth.actions";

const SignUp = ({ setAlert, register }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPwd: ""
  });

  const [pwdType, setPwdType] = useState({
    pwd1: "password",
    pwd2: "password"
  });

  const { name, email, password, confirmPwd } = formData;

  // Form Input Changes
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form Submit
  const handleSubmit = e => {
    e.preventDefault();
    if (password !== confirmPwd) {
      setAlert(`Passwords do not match`, "danger");
      setFormData({ name: "", email: "", password: "", confirmPwd: "" });
    } else {
      register(formData);
      setFormData({ name: "", email: "", password: "", confirmPwd: "" });
    }
  };

  // Get Location Properties from Links
  const location = useLocation();

  return (
    <div className="signup">
      <div className="form-header">
        <h1>Sign Up</h1>
        <p>
          <i className="fas fa-user-plus"></i> Create an account and begin your
          journey
        </p>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
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

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type={pwdType.pwd1}
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            minLength="6"
          />
          <i
            className="fas fa-eye-slash"
            name="password-field"
            onClick={e =>
              pwdType.pwd1 === "text"
                ? setPwdType({ ...pwdType, pwd1: "password" })
                : setPwdType({ ...pwdType, pwd1: "text" })
            }
          ></i>
        </div>
        <small>
          Password must contain at least six characters and have at least one
          lowercase, one uppercase alphabetical character and one numeric
          character
        </small>

        <div className="form-group">
          <label htmlFor="confirmPwd">Confirm Password</label>
          <input
            type={pwdType.pwd2}
            name="confirmPwd"
            value={confirmPwd}
            onChange={handleChange}
            placeholder="Confirm Password"
            minLength="6"
          />
          <i
            className="fas fa-eye-slash"
            onClick={e =>
              pwdType.pwd2 === "text"
                ? setPwdType({ ...pwdType, pwd2: "password" })
                : setPwdType({ ...pwdType, pwd2: "text" })
            }
          ></i>
        </div>

        <button type="submit" className="btn btn-gold">
          Sign Up
        </button>
      </form>

      <div className="signin-actions">
        <div className="signin-exist">
          <p className="lead">Already have an account?</p>
          <Link
            to={{
              pathname: "/signin",
              state: { from: location.pathname }
            }}
          >
            Sign In
          </Link>
        </div>
      </div>

      {location.state && location.state.from ? (
        <Link className="go-back" to={location.state.from}>
          &times;
        </Link>
      ) : (
        <Link className="go-back" to="/">
          &times;
        </Link>
      )}
    </div>
  );
};

SignUp.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  setAlert: (msg, alertType) => setAlert(msg, alertType),
  register: formData => register(formData)
};

export default connect(null, mapDispatchToProps)(SignUp);
