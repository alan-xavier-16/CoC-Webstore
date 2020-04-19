import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Switch, Route, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import AdminRoute from "./components/routing/AdminRoute.component";
import PrivateRoute from "./components/routing/PrivateRoute.component";
import UserRoute from "./components/routing/UserRoute.component";
import Dashboard from "./pages/dashboard/Dashboard.component";
import Landing from "./pages/landing/Landing.component";
import Navbar from "./components/layout/navbar/Navbar.component";
import Alert from "./components/layout/alerts/Alert.component";
import Footer from "./components/layout/footer/Footer.component";
import SignInAndSignUp from "./pages/signInAndsignUp/SignInAndSignUp.component";
import ShopCategories from "./pages/shop/Shop.categories.component";
import ShopProducts from "./pages/shop/Shop.products.component";
import Cart from "./pages/cart/Cart.component";

import Checkout from "./pages/checkout/Checkout.component";

import { loadUser } from "./redux/auth/auth.actions";
import { selectIsAuthenticated } from "./redux/auth/auth.selectors";

import "./App.scss";

const App = ({ loadUser, isAuthenticated }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Access Route String
  const location = useLocation();

  return (
    <>
      {!location.pathname.includes("/signin") && <Navbar />}
      <Route exact path="/" component={Landing} />

      {location.pathname !== "/" && (
        <div className="container">
          <Alert />
          <Switch>
            <Route path="/shop-by-categories" component={ShopCategories} />
            <Route path="/shop-by-products" component={ShopProducts} />

            <PrivateRoute path="/cart" component={Cart} />
            <AdminRoute path="/dashboard" component={Dashboard} />
            <UserRoute path="/signin" component={SignInAndSignUp} />

            <PrivateRoute path="/checkout" component={Checkout} />
          </Switch>
        </div>
      )}

      {!location.pathname.includes("/signin") && <Footer />}
    </>
  );
};

App.propTypes = {
  loadUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
});

const mapDispatchToProps = {
  loadUser: () => loadUser(),
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
