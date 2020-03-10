import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { modifyCartItem } from "../../redux/cart/cart.actions";

import "./CategoryItem.styles.scss";

const CategoryItem = ({ product, modifyCartItem }) => {
  const { photo, name, price, description, inventory } = product;

  const handleClick = e => {
    const item = { product };
    modifyCartItem(item);
  };

  return (
    <div className="card">
      <div className={`card-img ${inventory === 0 && "disabled"}`}>
        <img src={`../uploads/${photo}`} alt={`product-${name}`} />
        {inventory === 0 && <span className="img-no-stock">Out of Stock</span>}
      </div>

      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="price">TT${price}</p>
        <p className="card-description">{description}</p>

        <button
          className={`btn btn-gold ${inventory === 0 && "disabled"}`}
          disabled={!inventory}
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
  modifyCartItem: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  modifyCartItem: item => modifyCartItem(item)
};

export default connect(null, mapDispatchToProps)(CategoryItem);
