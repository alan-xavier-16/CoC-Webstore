import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { selectProductItem } from "../../redux/product/product.selectors";
import { selectIsAuthenticated } from "../../redux/auth/auth.selectors";
import { modifyCartItem } from "../../redux/cart/cart.actions";

const ProductItem = ({ product, isAuthenticated, modifyCartItem }) => {
  console.log(product);
  const { photo, name, price, description, inventory } = product;

  const handleClick = e => {
    const item = { product };
    modifyCartItem(item);
  };

  return (
    <div className="product-card">
      <div className={`card-img ${inventory === 0 && "disabled"}`}>
        <img src={`../uploads/${photo}`} alt={`product-${name}`} />
        {inventory === 0 && <span className="img-no-stock">Out of Stock</span>}
      </div>

      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="price">TT${price}</p>
        <p className="card-description">{description}</p>

        <button
          className={`btn btn-gold ${inventory === 0 &&
            "disabled"} ${!isAuthenticated && "hide"}`}
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

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  product: selectProductItem(ownProps.match.params.productSlug)(state),
  isAuthenticated: selectIsAuthenticated(state)
});

const mapDispatchToProps = {
  modifyCartItem: item => modifyCartItem(item)
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
