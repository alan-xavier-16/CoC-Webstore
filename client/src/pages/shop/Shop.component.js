import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, useRouteMatch } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import PropTypes from "prop-types";

import Popup from "../../components/layout/popup/Popup.component";
import AdminRoute from "../../components/routing/AdminRoute.component";

import CategoryOverviewContainer from "../../components/category-overview/CategoryOverview.container";
import CategoryContainer from "../category/Category.container";
import AddCategory from "../../components/category-form/AddCategory.component";

import ProductsOverviewContainer from "../../components/products-overview/ProductsOverview.container";
import ProductContainer from "../product/Product.container";

import { getCategories } from "../../redux/shop/shop.actions";
import { selectCategories } from "../../redux/shop/shop.selectors";
import { selectIsAuthenticated } from "../../redux/auth/auth.selectors";

import "./Shop.styles.scss";

/*
Renders:
- Categories Overview by default
- Has an option for ALL Products Overview instead
- Has routes to:
  - Category Container with Products
  - Product Item
  - Create Category
*/

const Shop = ({ isAuthenticated, getCategories, categories }) => {
  // FETCH RESOURCES
  useEffect(() => {
    categories.length === 0 && getCategories();
  }, [getCategories, categories]);

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
      <AdminRoute path={`${path}/create-category`} component={AddCategory} />

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
  isAuthenticated: selectIsAuthenticated,
  categories: selectCategories
});

const mapDispatchToProps = {
  getCategories: () => getCategories()
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
