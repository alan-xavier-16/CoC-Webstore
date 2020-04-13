import React from "react";
import { connect } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import PropTypes from "prop-types";

import ProductItem from "../../components/product-item/ProductItem.component";
import DashboardBtns from "../../components/dashboard-btns/DashboardBtns.component";

import { deleteCategory } from "../../redux/shop/shop.actions";

import { selectCategory } from "../../redux/shop/shop.selectors";
import { selectUser } from "../../redux/auth/auth.selectors";

import "./Category.styles.scss";

const Category = ({ category, user, deleteCategory }) => {
  const { _id, name, description, products } = category;
  // RELATIVE LINK & HISTORY OBJECT
  const history = useHistory();
  const { url } = useRouteMatch();

  /**  DELETE ACTION */
  const handleDelete = (e) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${name}? This cannot be undone.`
      )
    ) {
      deleteCategory(_id, history);
    }
  };

  return (
    <div className="category">
      <div className="category-header">
        <h1 className="main-header">{name}</h1>
        <p className="lead">{description}</p>
      </div>

      <div className="user-actions">
        {user.role && user.role === "admin" && (
          <DashboardBtns
            btns={{ add: false, edit: true, remove: true }}
            removeAction={handleDelete}
            pathName={`${url}`}
          />
        )}
      </div>

      <div className="cards">
        {products &&
          products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}

        {user.role && user.role === "admin" && (
          <div className="user-actions card">
            <DashboardBtns
              pathName={`${url}/create-product`}
              btns={{
                add: true,
                edit: false,
                remove: false,
              }}
            />
          </div>
        )}
      </div>

      <Link className="btn btn-dark" to={`/shop`}>
        <i className="fas fa-feather-alt"></i> Back to Shop
      </Link>
    </div>
  );
};

Category.propTypes = {
  category: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  deleteCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  category: selectCategory(ownProps.match.params.categorySlug)(state),
  user: selectUser(state),
});

const mapDispatchToProps = {
  deleteCategory: (categoryId, history) => deleteCategory(categoryId, history),
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
