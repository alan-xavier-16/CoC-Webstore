import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, useRouteMatch } from "react-router-dom";
import PropTypes from "prop-types";

import ProductsOverviewContainer from "../../components/products-overview/ProductsOverview.container";
import ProductsItem from "../../components/product-item/ProductItem.component";

import { getProducts } from "../../redux/product/product.actions";

const Products = ({ getProducts }) => {
  // Fetch ALL products on page load
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // Relative Path for Products
  const { path } = useRouteMatch();

  return (
    <div className="products-page">
      <Route exact path={`${path}`} component={ProductsOverviewContainer} />
      <Route exact path={`${path}/:productSlug`} component={ProductsItem} />
    </div>
  );
};

Products.propTypes = {
  getProducts: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  getProducts: () => getProducts()
};

export default connect(null, mapDispatchToProps)(Products);
