import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { selectProducts } from "../../redux/product/product.selectors";
import CategoryItem from "../category-item/CategoryItem.component";

import "./ProductsOverview.styles.scss";

const ProductsOverview = ({ products }) => {
  return (
    <div className="product-overview">
      <h1 className="main-header">
        Browse the Lil Herbal{" "}
        <span className="herb">
          <i className="fas fa-feather-alt"></i>
        </span>{" "}
        In-Shop Products!
      </h1>

      <div className="to-shop">
        <Link to="/shop" className="btn btn-dark">
          Or shop by categories <i className="fas fa-caret-right"></i>
        </Link>
      </div>

      <div className="product-previews cards">
        {products.map(product => (
          <CategoryItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

ProductsOverview.propTypes = {
  products: PropTypes.array.isRequired
};

const mapStateToProps = createStructuredSelector({
  products: selectProducts
});

export default connect(mapStateToProps)(ProductsOverview);
