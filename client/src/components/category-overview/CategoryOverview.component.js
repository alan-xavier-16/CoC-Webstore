import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link, useRouteMatch, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import CategoryPreview from "../category-preview/CategoryPreview.component";
import DashboardBtns from "../dashboard-btns/DashboardBtns.component";

import {
  selectCategories,
  selectProducts
} from "../../redux/shop/shop.selectors";
import { selectUser } from "../../redux/auth/auth.selectors";

import { getProducts } from "../../redux/shop/shop.actions";
import { deleteCategory } from "../../redux/shop/shop.actions";

import "./CategoryOverview.styles.scss";

const CategoryOverview = ({
  categories,
  products,
  user,
  getProducts,
  deleteCategory
}) => {
  /** LOCATION OBJECT & RELATIVE PATH FROM URL */
  const location = useLocation();
  const { url } = useRouteMatch();

  /** FETCH PRODUCTS ON BTN CLICK */
  const handleFetch = e => {
    products.length === 0 && getProducts();
  };

  return (
    <div className="category-overview">
      <h1 className="main-header">
        Browse the Lil Herbal{" "}
        <span className="herb">
          <i className="fas fa-feather-alt"></i>
        </span>{" "}
        In-Shop Collections!
      </h1>

      <div className="to-products">
        <Link
          to={{
            pathname: `${url}/products`,
            state: { from: location.pathname }
          }}
          onClick={handleFetch}
          className="btn btn-dark"
        >
          Or view all products <i className="fas fa-caret-right"></i>
        </Link>

        {user.role && user.role === "admin" && (
          <DashboardBtns
            pathName={`${url}/create-category`}
            btns={{
              add: true,
              edit: false,
              remove: false
            }}
          />
        )}
      </div>

      {categories.map(({ id, ...rest }) => (
        <CategoryPreview
          key={id}
          {...rest}
          deleteCategory={deleteCategory}
          user={user}
        />
      ))}
    </div>
  );
};

CategoryOverview.propTypes = {
  categories: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
  getProducts: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  deleteCategory: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  categories: selectCategories,
  products: selectProducts,
  user: selectUser
});

const mapDispatchToProps = {
  getProducts: () => getProducts(),
  deleteCategory: (categoryId, history) => deleteCategory(categoryId, history)
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryOverview);
