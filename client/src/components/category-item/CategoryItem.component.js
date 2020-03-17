import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { modifyCartItem } from "../../redux/cart/cart.actions";
import { selectIsAuthenticated } from "../../redux/auth/auth.selectors";

import "./CategoryItem.styles.scss";

const CategoryItem = ({ product, modifyCartItem, isAuthenticated }) => {
  const { photo, name, price, description, inventory, slug } = product;

  const handleClick = e => {
    const item = { product };
    modifyCartItem(item);
  };

  return (
    <div className="card">
      <div className={`card-img ${inventory === 0 && "disabled"}`}>
        <Link to={`/products/${slug}`}>
          <img src={`../uploads/${photo}`} alt={`product-${name}`} />
          {inventory === 0 && (
            <span className="img-no-stock">Out of Stock</span>
          )}
        </Link>
      </div>

      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="price">TT${price}</p>
        <p className="card-description">{description}</p>

        <button
          className={`btn btn-gold ${(inventory === 0 || !isAuthenticated) &&
            "disabled"}`}
          disabled={!inventory || !isAuthenticated}
          onClick={handleClick}
        >
          <i className="fas fa-cart-plus"></i>{" "}
          <span className="show-md">Add To Cart</span>
        </button>
      </div>
    </div>
  );
};

CategoryItem.propTypes = {
  product: PropTypes.object.isRequired,
  modifyCartItem: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated
});

const mapDispatchToProps = {
  modifyCartItem: item => modifyCartItem(item)
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);
