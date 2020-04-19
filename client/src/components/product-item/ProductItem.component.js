import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import PropTypes from "prop-types";

import { modifyCartItem } from "../../redux/cart/cart.actions";
import { selectIsAuthenticated } from "../../redux/auth/auth.selectors";

import "./ProductItem.styles.scss";

const ProductItem = ({ product, modifyCartItem, isAuthenticated }) => {
  const { photo, name, price, description, inventory, slug } = product;

  // ADD TO CART
  const handleModify = (e) => {
    const item = { product };
    modifyCartItem(item);
  };

  // ACCESS LOCATION OBJECT
  const location = useLocation();
  const { url } = useRouteMatch();

  return (
    <div className="card">
      <Link
        to={{
          pathname: `${url}/${slug}`,
          state: { from: location.pathname },
        }}
      >
        <img
          src={`/uploads/${photo[0]}`}
          alt={`product`}
          className={`card-img ${inventory === 0 && "disabled"}`}
        />
        {inventory === 0 && <span className="img-text">Out of Stock</span>}
      </Link>

      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="price">TT${(price / 100).toFixed(2)}</p>
        <p className="card-description">{description}</p>

        <button
          className={`btn btn-gold ${
            (inventory === 0 || !isAuthenticated) && "disabled"
          }`}
          disabled={!inventory || !isAuthenticated}
          onClick={handleModify}
        >
          <i className="fas fa-cart-plus"></i> Add To Cart
        </button>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  modifyCartItem: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
});

const mapDispatchToProps = {
  modifyCartItem: (item) => modifyCartItem(item),
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
