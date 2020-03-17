import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, useRouteMatch } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import PropTypes from "prop-types";

import ProductsOverviewContainer from "../../components/products-overview/ProductsOverview.container";
import ProductsItem from "../../components/product-item/ProductItem.component";
import Popup from "../../components/layout/popup/Popup.component";

import { getProducts } from "../../redux/product/product.actions";
import { selectIsAuthenticated } from "../../redux/auth/auth.selectors";

const Products = ({ getProducts, isAuthenticated }) => {
  // Fetch ALL products on page load
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // Relative Path for Products
  const { path } = useRouteMatch();

  return (
    <div className="products-page">
      {!isAuthenticated && (
        <Popup>Please sign in to add items to your cart!</Popup>
      )}

      <Route exact path={`${path}`} component={ProductsOverviewContainer} />
      <Route exact path={`${path}/:productSlug`} component={ProductsItem} />
    </div>
  );
};

Products.propTypes = {
  getProducts: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated
});

const mapDispatchToProps = {
  getProducts: () => getProducts()
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
