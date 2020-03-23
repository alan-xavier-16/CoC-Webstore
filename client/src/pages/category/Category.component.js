import React from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import ProductItem from "../../components/product-item/ProductItem.component";
import { selectCategory } from "../../redux/shop/shop.selectors";

import "./Category.styles.scss";

const Category = ({ category }) => {
  const { name, description, products } = category;

  // ACCESS LOCATION OBJECT
  const location = useLocation();

  return (
    <div className="category">
      <div className="category-header">
        <h1 className="main-header">{name}</h1>
        <p className="lead">{description}</p>
      </div>

      <div className="category-cards">
        <div className="cards">
          {products &&
            products.map(product => (
              <ProductItem key={product._id} product={product} />
            ))}
        </div>
      </div>

      {location.state && location.state.from ? (
        <Link className="btn btn-dark" to={location.state.from}>
          <i className="fas fa-feather-alt"></i> Back to Shop
        </Link>
      ) : (
        <Link className="btn btn-dark" to={`/shop`}>
          <i className="fas fa-feather-alt"></i> Back to Shop
        </Link>
      )}
    </div>
  );
};

Category.propTypes = {
  category: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  category: selectCategory(ownProps.match.params.categorySlug)(state)
});

export default connect(mapStateToProps)(Category);
