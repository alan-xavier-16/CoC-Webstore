import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, useRouteMatch } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import PropTypes from "prop-types";

import Popup from "../../components/layout/popup/Popup.component";
import AdminRoute from "../../components/routing/AdminRoute.component";

import ProductsOverviewContainer from "../../components/products-overview/ProductsOverview.container";
import ProductContainer from "../product/Product.container";
import AddProduct from "../../components/product-form/AddProduct.component";
import EditProduct from "../../components/product-form/EditProduct.component";

import FileUpload from "../../components/file-upload/FileUpload.component";

import { getProducts } from "../../redux/shop/shop.actions";
import { selectIsAuthenticated } from "../../redux/auth/auth.selectors";

const ShopProducts = ({ isAuthenticated, getProducts }) => {
  /** RELATIVE PATH FROM APP */
  const { path } = useRouteMatch();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className="page">
      {!isAuthenticated && (
        <Popup>Please sign in to add items to your cart!</Popup>
      )}

      <Route exact path={`${path}`} component={ProductsOverviewContainer} />
      <Route exact path={`${path}/:productSlug`} component={ProductContainer} />
      <AdminRoute
        path={`${path}/categories/:categorySlug/create-product`}
        component={AddProduct}
      />
      <AdminRoute path={`${path}/:productSlug/edit`} component={EditProduct} />
      <AdminRoute
        path={`${path}/:productSlug/photo-upload`}
        component={FileUpload}
      />
    </div>
  );
};

ShopProducts.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  getProducts: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
});

const mapDispatchToProps = {
  getProducts: () => getProducts(),
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopProducts);
