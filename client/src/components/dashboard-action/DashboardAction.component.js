import React from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logo from "../layout/navbar/triquetra-svg.svg";

import "./DashboardAction.styles.scss";

/*
Renders LINKS to each RESOURCE in database with FETCH actions:
  - Services
  - Shop: Categories by Default
  - Courses
  - Users
*/
const DashboardAction = ({ resource }) => {
  // RELATIVE LINK & LOCATION OBJECT
  const location = useLocation();
  return (
    <div className="dashboard-action card">
      <Link
        to={{
          pathname: `/${resource}`,
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
