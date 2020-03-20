import React from "react";
import { Link, useRouteMatch, useLocation } from "react-router-dom";
import logo from "../layout/navbar/triquetra-svg.svg";

import "./DashboardItem.styles.scss";

const DashboardItem = ({ resource }) => {
  // RELATIVE LINK & LOCATION OBJECT
  const { url } = useRouteMatch();
  const location = useLocation();
  return (
    <div className="dashboard-item card">
      <Link
        to={{
          pathname: `${url}/${resource}`,
          state: { from: location.pathname }
        }}
      >
        <div className="dashboard-item-content">
          <h3 className="title">{resource.toUpperCase()}</h3>
        </div>

        <img src={logo} alt="logo" />
      </Link>
    </div>
  );
};

export default DashboardItem;
