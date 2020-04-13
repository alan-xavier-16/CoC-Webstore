import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import ProductItem from "../product-item/ProductItem.component";

import { selectProducts } from "../../redux/shop/shop.selectors";

import "./ProductsOverview.styles.scss";

const ProductsOverview = ({ products }) => {
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
            pathname: `/shop`,
            state: { from: location.pathname },
          }}
          className="btn btn-dark"
        >
          Or view all categories <i className="fas fa-caret-right"></i>
        </Link>
      </div>

      <div className="preview">
        <div className="cards">
          {products &&
            products.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

ProductsOverview.propTypes = {
  products: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  products: selectProducts,
});

export default connect(mapStateToProps)(ProductsOverview);
