import React from "react";
import { connect } from "react-redux";
import { Link, useRouteMatch, useLocation } from "react-router-dom";
import logo from "../layout/navbar/triquetra-svg.svg";
import PropTypes from "prop-types";

import { getProducts, getCategories } from "../../redux/shop/shop.actions";

import "./DashboardAction.styles.scss";

/*
Renders LINKS to each RESOURCE in database with FETCH actions:
  - Services
  - Shop:
  - Courses
*/
const DashboardAction = ({ resource, getCategories }) => {
  // RELATIVE LINK & LOCATION OBJECT
  const { url } = useRouteMatch();
  const location = useLocation();

  // Dispatch Action Based on Resource Name
  const handleClick = e => {
    if (resource === "shop") {
      getCategories();
    } else if (resource === "services") {
      console.log(`Dispatch ${resource}`);
    } else if (resource === "courses") {
      console.log(`Dispatch ${resource}`);
    } else if (resource === "users") {
      console.log(`Dispatch ${resource}`);
    }
  };

  return (
    <div className="dashboard-action card">
      <Link
        to={{
          pathname: `${url}/${resource}`,
          state: { from: location.pathname }
        }}
        onClick={handleClick}
      >
        <div className="dashboard-action-content">
          <h3 className="title">{resource.toUpperCase()}</h3>
        </div>

        <img src={logo} alt="logo" />
      </Link>
    </div>
  );
};

DashboardAction.propTypes = {
  getCategories: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  getCategories: () => getCategories()
};

export default connect(null, mapDispatchToProps)(DashboardAction);
