import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, useRouteMatch } from "react-router-dom";
import PropTypes from "prop-types";

import CategoryOverviewContainer from "../../components/category-overview/CategoryOverview.container";
import CategoryContainer from "../category/Category.container";

import { getCategories } from "../../redux/shop/shop.actions";

const Shop = ({ getCategories }) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  /** Create relative path */
  let { path } = useRouteMatch();

  return (
    <div className="shop-page">
      <Route exact path={`${path}`} component={CategoryOverviewContainer} />
      <Route path={`${path}/:categorySlug`} component={CategoryContainer} />
    </div>
  );
};

Shop.propTypes = {
  getCategories: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  getCategories: () => getCategories()
};

export default connect(null, mapDispatchToProps)(Shop);
