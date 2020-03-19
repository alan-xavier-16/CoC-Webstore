import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import PropTypes from "prop-types";

import {
  selectIsAuthenticated,
  selectAuthLoading,
  selectUser
} from "../../redux/auth/auth.selectors";

const UserRoute = ({
  component: Component,
  isAuthenticated,
  user,
  loading,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated && !loading ? (
          <Redirect
            to={`${
              props.location.state && props.location.state.from
                ? props.location.state.from
                : "/"
            }`}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

UserRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
  loading: selectAuthLoading,
  user: selectUser
});

export default connect(mapStateToProps)(UserRoute);
