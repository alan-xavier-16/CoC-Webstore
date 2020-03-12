import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Switch, Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import PrivateRoute from "./components/routing/PrivateRoute.component";
import Landing from "./pages/landing/Landing.component";
import Navbar from "./components/layout/navbar/Navbar.component";
import Alert from "./components/layout/alerts/Alert.component";
import Footer from "./components/layout/footer/Footer.component";
import SignInAndSignUp from "./pages/signInAndsignUp/SignInAndSignUp.component";
import Shop from "./pages/shop/Shop.component";
import Cart from "./pages/cart/Cart.component";

import { loadUser } from "./redux/auth/auth.actions";
import { selectIsAuthenticated } from "./redux/auth/auth.selectors";

import "./App.scss";

const App = ({ loadUser, isAuthenticated }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <>
      <Navbar />
      <Route exact path="/" component={Landing} />

      <div className="container">
        <Alert />
        <Switch>
          <Route path="/shop" component={Shop} />
          <PrivateRoute path="/cart" component={Cart} />

          <Route
            exact
            path="/signin"
            render={() =>
              isAuthenticated ? <Redirect to="/" /> : <SignInAndSignUp />
            }
          />
        </Switch>
      </div>

      <Footer />
    </>
  );
};

App.propTypes = {
  loadUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated
});

const mapDispatchToProps = {
  loadUser: () => loadUser()
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
