import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import { resetPassword } from "../../redux/auth/auth.actions";
import { setAlert } from "../../redux/alerts/alert.actions";

const ResetPassword = ({ resetPassword }) => {
  /* GET RESET TOKEN FROM URL PARAM */
  const { resetToken } = useParams();

  /* HISTORY FOR PUSHING USER TO LANDING */
  const history = useHistory();

  const [formData, setFormData] = useState({
    password: "",
    confirmPwd: ""
  });

  const [pwdType, setPwdType] = useState({
    pwd1: "password",
    pwd2: "password"
  });

  const { password, confirmPwd } = formData;

  // Form Input Changes
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form Submit
  const handleSubmit = e => {
    e.preventDefault();
    if (password !== confirmPwd) {
      setAlert(`Passwords do not match`, "danger");
      setFormData({ password: "", confirmPwd: "" });
    } else {
      resetPassword({ resetToken, password, history });
      setFormData({ password: "", confirmPwd: "" });
    }
  };

  return (
    <div className="forgot-password">
      <div className="form-header">
        <h1>Reset Password</h1>
        <p>You can reset your password here</p>
      </div>

      <form className="form" onSubmit={handleSubmit}>
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
          Update Password
        </button>
      </form>

      <div className="signin-actions">
        <Link to={`/signin`}>Sign In</Link>
      </div>
    </div>
  );
};

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  resetPassword: formData => resetPassword(formData)
};

export default connect(null, mapDispatchToProps)(ResetPassword);
