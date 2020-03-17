import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { selectProductItem } from "../../redux/product/product.selectors";
import { selectIsAuthenticated } from "../../redux/auth/auth.selectors";
import { modifyCartItem } from "../../redux/cart/cart.actions";

import "./ProductItem.styles.scss";

const ProductItem = ({ product, isAuthenticated, modifyCartItem }) => {
  console.log(product);
  const [formData, setFormData] = useState({
    quantity: 1
  });
  const { photo, name, price, description, inventory } = product;

  // CHANGE QUANTITY
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { quantity } = formData;

  // ADD PRODUCT TO CART
  const handleClick = e => {
    const item = { ...product, ...formData };
    modifyCartItem(item);
  };

  return (
    <form className="product-item">
      <div className="product-card">
        <div className={`product-card-img ${inventory === 0 && "disabled"}`}>
          <img src={`../uploads/${photo}`} alt={`product-${name}`} />
          {inventory === 0 && (
            <span className="img-no-stock">Out of Stock</span>
          )}
        </div>

        <div className="product-card-body">
          <div className="product-card-detail">
            <h3 className="card-title">{name}</h3>
            <div className="card-price">TT${price}</div>

            <div className="card-body">
              <div>
                <div className="card-lead">Description:</div>
                <div className="card-description">{description}</div>
              </div>

              <div>
                <div className="card-lead">Quantity:</div>
                <input
                  type="number"
                  name="quantity"
                  value={quantity}
                  onChange={handleChange}
                  min="1"
                  className="lead"
                />
              </div>
            </div>
          </div>

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
    </form>
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
