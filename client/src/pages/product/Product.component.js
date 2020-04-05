import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation, useRouteMatch, useHistory } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import PropTypes from "prop-types";

import DashboardBtns from "../../components/dashboard-btns/DashboardBtns.component";

import { selectProductItem } from "../../redux/shop/shop.selectors";
import {
  selectIsAuthenticated,
  selectUser,
} from "../../redux/auth/auth.selectors";

import { modifyCartItem } from "../../redux/cart/cart.actions";
import { deleteProduct } from "../../redux/shop/shop.actions";

import "./Product.styles.scss";

const Product = ({
  product,
  isAuthenticated,
  modifyCartItem,
  user,
  deleteProduct,
}) => {
  // RELATIVE LINK, HISTORY & LOCATION OBJECT
  const location = useLocation();
  const history = useHistory();
  const { url } = useRouteMatch();

  // FORM LOGIC
  const [formData, setFormData] = useState({
    quantity: 1,
  });
  const {
    _id,
    photo,
    name,
    price,
    description,
    inventory,
    details,
    slug,
  } = product;

  // CHANGE QUANTITY
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { quantity } = formData;

  // ADD PRODUCT TO CART
  const handleModify = (e) => {
    const item = { product: { ...product }, ...formData };
    modifyCartItem(item);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  /**  DELETE ACTION */
  const handleDelete = (e) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${name}? This cannot be undone.`
      )
    ) {
      deleteProduct(_id, history);
    }
  };

  return (
    <form className="product" onSubmit={handleSubmit}>
      <div className="product-card">
        <div className={`product-card-img ${inventory === 0 && "disabled"}`}>
          <img src={`/uploads/${photo[0]}`} alt={`product`} />

          {inventory === 0 && <div className="img-text">Out of Stock</div>}

          {user.role && user.role === "admin" && (
            <div className="img-link">
              <Link
                className="btn btn-success"
                to={{
                  pathname: `/shop/products/${slug}/photo-upload`,
                  state: { from: location.pathname },
                }}
              >
                <i className="fas fa-camera"></i>
              </Link>
            </div>
          )}
        </div>

        <div className="product-card-body">
          {user.role && user.role === "admin" && (
            <DashboardBtns
              btns={{ add: false, edit: true, remove: true }}
              removeAction={handleDelete}
              pathName={`${url}`}
            />
          )}

          <div className="product-card-detail">
            <div className="product-card-header">
              <h3 className="card-title">{name}</h3>
              <div className="card-price">TT${(price / 100).toFixed(2)}</div>
            </div>

            <div className="card-body">
              <div className="card-body-item card-description">
                <div className="card-lead">Description:</div>
                <div>{description}</div>
              </div>

              <div className="card-body-item card-quantity">
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

              {user.role && user.role === "admin" && (
                <div className="card-body-item card-quantity">
                  <div className="card-lead">Inventory:</div>
                  <input
                    type="number"
                    name="inventory"
                    value={inventory}
                    onChange={handleChange}
                    min="1"
                    className="lead"
                  />
                </div>
              )}

              <div className="card-body-item card-details">
                <div className="card-lead">Details:</div>
                <ul className="card-list">
                  {details.map((detail) => (
                    <li key={detail._id} className="card-list-item">
                      <span>{detail.title}</span>: {detail.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="user-actions">
            <button
              className={`btn btn-gold ${
                (inventory === 0 || !isAuthenticated) && "disabled"
              }`}
              disabled={!inventory || !isAuthenticated}
              onClick={handleModify}
            >
              <i className="fas fa-cart-plus"></i> Add To Cart
            </button>

            {location.state && location.state.from && (
              <Link className="btn btn-dark" to={location.state.from}>
                <i className="fas fa-feather-alt"></i> Back to Shop
              </Link>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  modifyCartItem: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  product: selectProductItem,
  isAuthenticated: selectIsAuthenticated,
  user: selectUser,
});

const mapDispatchToProps = {
  modifyCartItem: (item) => modifyCartItem(item),
  deleteProduct: (productId, history) => deleteProduct(productId, history),
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
