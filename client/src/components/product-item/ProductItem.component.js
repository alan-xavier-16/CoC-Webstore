import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { modifyCartItem } from "../../redux/cart/cart.actions";
import { selectIsAuthenticated } from "../../redux/auth/auth.selectors";
import { getProduct } from "../../redux/shop/shop.actions";

import "./ProductItem.styles.scss";

const ProductItem = ({
  product,
  modifyCartItem,
  isAuthenticated,
  getProduct
}) => {
  const { photo, name, price, description, inventory, slug } = product;

  // ADD TO CART
  const handleModify = e => {
    const item = { product };
    modifyCartItem(item);
  };

  // FETCH SPECIFIC PRODUCT
  const handleRedirect = e => {
    getProduct(product._id);
  };

  // ACCESS LOCATION OBJECT
  const location = useLocation();

  return (
    <div className="card">
      <div className={`card-img ${inventory === 0 && "disabled"}`}>
        <Link
          to={{
            pathname: `/shop/products/${slug}`,
            state: { from: location.pathname }
          }}
          onClick={handleRedirect}
        >
          <img src={`/uploads/${photo}`} alt={`product-${name}`} />
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
          onClick={handleModify}
        >
          <i className="fas fa-cart-plus"></i>{" "}
          <span className="show-md">Add To Cart</span>
        </button>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  modifyCartItem: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  getProduct: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated
});

const mapDispatchToProps = {
  modifyCartItem: item => modifyCartItem(item),
  getProduct: productSlug => getProduct(productSlug)
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
