import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, useRouteMatch } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import PropTypes from "prop-types";

import CategoryOverviewContainer from "../../components/category-overview/CategoryOverview.container";
import ProductsOverviewContainer from "../../components/products-overview/ProductsOverview.container";
import CategoryContainer from "../category/Category.container";
import ProductContainer from "../product/Product.container";
import Popup from "../../components/layout/popup/Popup.component";

import { getCategories } from "../../redux/shop/shop.actions";
import { selectIsAuthenticated } from "../../redux/auth/auth.selectors";

/*
Renders:
- Categories Overview by default
- Has an option for ALL Products Overview instead
- Has routes to:
  - Category Container with Products
  - Product Item
*/

const Shop = ({ isAuthenticated, getCategories }) => {
  // FETCH RESOURCES
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  /** RELATIVE PATH FROM APP */
  const { path } = useRouteMatch();

  return (
    <div className="shop-page">
      {!isAuthenticated && (
        <Popup>Please sign in to add items to your cart!</Popup>
      )}

      <Route exact path={`${path}`} component={CategoryOverviewContainer} />
      <Route
        path={`${path}/categories/:categorySlug`}
        component={CategoryContainer}
      />

      <Route
        exact
        path={`${path}/products`}
        component={ProductsOverviewContainer}
      />
      <Route
        path={`${path}/products/:productSlug`}
        component={ProductContainer}
      />
    </div>
  );
};

Shop.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  getCategories: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated
});

const mapDispatchToProps = {
  getCategories: () => getCategories()
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
