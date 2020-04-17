import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link, useRouteMatch, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import CategoryPreview from "../category-preview/CategoryPreview.component";
import DashboardBtns from "../dashboard-btns/DashboardBtns.component";

import { selectCategories } from "../../redux/shop/shop.selectors";
import { selectUser } from "../../redux/auth/auth.selectors";

import { getProducts } from "../../redux/shop/shop.actions";
import { deleteCategory } from "../../redux/shop/shop.actions";

const CategoryOverview = ({
  categories,
  user,
  getProducts,
  deleteCategory,
}) => {
  /** LOCATION OBJECT & RELATIVE PATH FROM URL */
  const location = useLocation();
  const { url } = useRouteMatch();

  return (
    <div className="category-overview">
      <h1 className="page-header">
        Browse the Lil Herbal{" "}
        <span>
          <i className="fas fa-feather-alt"></i>
        </span>{" "}
        In-Shop Collections!
      </h1>

      <div className="user-actions">
        <Link
          to={{
            pathname: `${url}/products`,
            state: { from: location.pathname },
          }}
          onClick={() => getProducts()}
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
              remove: false,
            }}
          />
        )}
      </div>

      {categories &&
        Object.entries(categories).map(([slug, category]) => (
          <CategoryPreview
            key={slug}
            category={category}
            deleteCategory={deleteCategory}
            user={user}
          />
        ))}
    </div>
  );
};

CategoryOverview.propTypes = {
  categories: PropTypes.object.isRequired,
  getProducts: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  deleteCategory: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  categories: selectCategories,
  user: selectUser,
});

const mapDispatchToProps = {
  getProducts: (categoryId) => getProducts(categoryId),
  deleteCategory: (category, history) => deleteCategory(category, history),
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryOverview);
