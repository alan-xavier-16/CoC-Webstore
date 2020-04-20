import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import Pagination from "../layout/pagination/Pagination.component";
import Search from "../layout/search/Search.component";
import ProductItem from "../product-item/ProductItem.component";

import {
  selectProducts,
  selectPagination,
} from "../../redux/shop/shop.selectors";
import { getProducts } from "../../redux/shop/shop.actions";

const ProductsOverview = ({ products, pagination, getProducts }) => {
  /** LOCATION OBJECT & RELATIVE PATH FROM URL */
  const location = useLocation();

  return (
    <div className="product-overview">
      <h1 className="page-header">
        Browse the Lil Herbal{" "}
        <span>
          <i className="fas fa-feather-alt"></i>
        </span>{" "}
        In-Shop Products!
      </h1>

      <div className="user-actions">
        <Link
          to={{
            pathname: `/shop-by-categories`,
            state: { from: location.pathname },
          }}
          className="btn btn-dark"
        >
          Or view all categories <i className="fas fa-caret-right"></i>
        </Link>

        <Search getAction={getProducts} />
      </div>

      <div className="preview">
        <div className="cards">
          {Object.keys(products).length !== 0 ? (
            Object.entries(products).map(([slug, product]) => (
              <ProductItem key={slug} product={product} />
            ))
          ) : (
            <p className="lead">No items found</p>
          )}
        </div>
      </div>

      <Pagination pagination={pagination} getAction={getProducts} />
    </div>
  );
};

ProductsOverview.propTypes = {
  products: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  products: selectProducts,
  pagination: selectPagination,
});

const mapDispatchToProps = {
  getProducts: (params) => getProducts(params),
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsOverview);
