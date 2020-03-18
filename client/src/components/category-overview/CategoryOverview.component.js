import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link, useRouteMatch, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import CategoryPreview from "../category-preview/CategoryPreview.component";

import {
  selectCategories,
  selectProducts
} from "../../redux/shop/shop.selectors";
import { getProducts } from "../../redux/shop/shop.actions";

import "./CategoryOverview.styles.scss";

const CategoryOverview = ({ categories, getProducts, products }) => {
  /** ACCESS LOCATION OBJECT */
  const location = useLocation();

  /** RELATIVE PATH FROM URL */
  const { url } = useRouteMatch();

  /** FETCH PRODUCTS ON BTN CLICK */
  const handleFetch = e => {
    products.length === 0 && getProducts();
  };

  return (
    <div className="category-overview">
      <h1 className="main-header">
        Browse the Lil Herbal{" "}
        <span className="herb">
          <i className="fas fa-feather-alt"></i>
        </span>{" "}
        In-Shop Collections!
      </h1>

      <div className="to-products">
        <Link
          to={{
            pathname: `${url}/products`,
            state: { from: location.pathname }
          }}
          onClick={handleFetch}
          className="btn btn-dark"
        >
          Or view all products <i className="fas fa-caret-right"></i>
        </Link>
      </div>

      {categories.map(({ id, ...rest }) => (
        <CategoryPreview key={id} {...rest} />
      ))}
    </div>
  );
};

CategoryOverview.propTypes = {
  categories: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
  getProducts: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  categories: selectCategories,
  products: selectProducts
});

const mapDispatchToProps = {
  getProducts: () => getProducts()
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryOverview);
