import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { selectCategories } from "../../redux/shop/shop.selectors";
import CategoryPreview from "../category-preview/CategoryPreview.component";

import "./CategoryOverview.styles.scss";

const CategoryOverview = ({ categories }) => {
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
        <Link to="/products" className="btn btn-dark">
          Or shop by products <i className="fas fa-caret-right"></i>
        </Link>
      </div>

      {categories.map(({ id, ...rest }) => (
        <CategoryPreview key={id} {...rest} />
      ))}
    </div>
  );
};

CategoryOverview.propTypes = {
  categories: PropTypes.array.isRequired
};

const mapStateToProps = createStructuredSelector({
  categories: selectCategories
});

export default connect(mapStateToProps)(CategoryOverview);
