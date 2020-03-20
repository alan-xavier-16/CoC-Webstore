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
    </div>
  );
};

export default DashboardAction;
