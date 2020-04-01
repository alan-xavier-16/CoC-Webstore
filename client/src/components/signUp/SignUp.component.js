import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { setAlert } from "../../redux/alerts/alert.actions";
import { register } from "../../redux/auth/auth.actions";

const SignUp = ({ setAlert, register }) => {
  // LOCATION OBJECT
  const location = useLocation();

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

  return (
    <div className="signup">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h1>Sign Up</h1>
          <p>
            <i className="fas fa-user-plus"></i> Create an account and begin
            your journey
          </p>
        </div>

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

        <div className="form-group form-group-icon">
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

        <div className="form-group form-group-icon">
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

        <div className="form-actions">
          <button type="submit" className="btn btn-gold">
            Sign Up
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
            pathname: "/signin",
            state: { from: location.pathname }
          }}
        >
          Already have an account? <span>Sign In</span>
        </Link>
      </div>
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
