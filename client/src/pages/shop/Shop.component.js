import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, useRouteMatch } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import PropTypes from "prop-types";

import CategoryOverviewContainer from "../../components/category-overview/CategoryOverview.container";
import CategoryContainer from "../category/Category.container";
import Popup from "../../components/layout/popup/Popup.component";

import { getCategories } from "../../redux/shop/shop.actions";
import { selectIsAuthenticated } from "../../redux/auth/auth.selectors";
import { getProducts } from "../../redux/product/product.actions";

const Shop = ({ getCategories, isAuthenticated, getProducts }) => {
  // Fetch Categories & Products on Page Load
  useEffect(() => {
    getCategories();
    getProducts();
  }, [getCategories, getProducts]);

  /** Create relative path for routes */
  let { path } = useRouteMatch();

  return (
    <div className="shop-page">
      {!isAuthenticated && (
        <Popup>Please sign in to add items to your cart!</Popup>
      )}

      <Route exact path={`${path}`} component={CategoryOverviewContainer} />
      <Route path={`${path}/:categorySlug`} component={CategoryContainer} />
    </div>
  );
};

Shop.propTypes = {
  getCategories: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  getProducts: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated
});

const mapDispatchToProps = {
  getCategories: () => getCategories(),
  getProducts: () => getProducts()
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
