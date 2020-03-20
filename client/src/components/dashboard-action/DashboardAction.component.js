import React from "react";
import { Link, useRouteMatch, useLocation } from "react-router-dom";
import logo from "../layout/navbar/triquetra-svg.svg";

import "./DashboardAction.styles.scss";

const DashboardAction = ({ resource }) => {
  // RELATIVE LINK & LOCATION OBJECT
  const { url } = useRouteMatch();
  const location = useLocation();
  return (
    <div className="dashboard-action card">
      {resource !== "shop" ? (
        <Link
          to={{
            pathname: `${url}/${resource}`,
            state: { from: location.pathname }
          }}
        >
          <div className="dashboard-action-content">
            <h3 className="title">{resource.toUpperCase()}</h3>
          </div>

          <img src={logo} alt="logo" />
        </Link>
      ) : (
        <div className="dropdown">
          <div className="dropdown-content">
            <Link
              to={{
                pathname: `${url}/${resource}/categories`,
                state: { from: location.pathname }
              }}
            >
              By Categories
            </Link>

            <Link
              to={{
                pathname: `${url}/${resource}/products`,
                state: { from: location.pathname }
              }}
            >
              By Products
            </Link>
          </div>

          <div className="dashboard-action-content">
            <h3 className="title">{resource.toUpperCase()}</h3>
          </div>

          <img src={logo} alt="logo" />
        </div>
      )}
    </div>
  );
};

export default DashboardAction;
