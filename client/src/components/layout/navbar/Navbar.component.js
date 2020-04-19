import React, { useState, useEffect } from "react";
import logo from "./triquetra-svg.svg";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import PropTypes from "prop-types";

import CartIcon from "../../cart-icon/CartIcon.component";
import CartDropdown from "../../cart-dropdown/CartDropdown.component";

import {
  selectIsAuthenticated,
  selectUser,
} from "../../../redux/auth/auth.selectors";
import { selectCartHidden } from "../../../redux/cart/cart.selectors";

import { logout } from "../../../redux/auth/auth.actions";

import "./Navbar.styles.scss";

const Navbar = ({ isAuthenticated, logout, hidden, user }) => {
  const [active, setActive] = useState(false);

  /* Get Window Width on Resize Event */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) {
        setActive(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Logout User Action
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  // Access Route String
  const location = useLocation();

  return (
    <nav className="navbar bg-gold">
      <a className="navbar-logo" href="/">
        <img src={logo} alt="logo" />
      </a>

      <div className="navbar-nav">
        <ul
          className={`navbar-pages ${active ? "active" : ""}`}
          onClick={() => setActive(false)}
        >
          <li>
            <Link
              className="nav-link"
              to={{ pathname: "/services", state: { from: location.pathname } }}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              className="nav-link"
              to={{
                pathname: "/shop-by-categories",
                state: { from: location.pathname },
              }}
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              className="nav-link"
              to={{ pathname: "/courses", state: { from: location.pathname } }}
            >
              Courses
            </Link>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <a className="nav-link" href="/" onClick={handleLogout}>
                  Logout
                </a>
              </li>
              {user.role === "admin" && (
                <li>
                  <Link
                    className="nav-link"
                    to={{
                      pathname: "/dashboard",
                      state: { from: location.pathname },
                    }}
                  >
                    Dashboard
                  </Link>
                </li>
              )}
            </>
          ) : (
            <>
              <li>
                <Link
                  className="nav-link"
                  to={{
                    pathname: "/signin",
                    state: { from: location.pathname },
                  }}
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  className="nav-link"
                  to={{
                    pathname: "/signin/signup",
                    state: { from: location.pathname },
                  }}
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>

        {isAuthenticated && <CartIcon />}
      </div>

      {!hidden && <CartDropdown />}

      <div className="navbar-toggle" onClick={() => setActive(!active)}>
        {!active ? (
          <i className="fas fa-bars"></i>
        ) : (
          <i className="fas fa-times"></i>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  hidden: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
  hidden: selectCartHidden,
  user: selectUser,
});

const mapDispatchToProps = {
  logout: () => logout(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
