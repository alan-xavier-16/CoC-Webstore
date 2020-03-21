import React from "react";
import { Link, useRouteMatch, useLocation } from "react-router-dom";

import "./DashboardItem.styles.scss";

const DashboardItem = props => {
  // RELATIVE LINK & LOCATION OBJECT
  const { url } = useRouteMatch();
  const location = useLocation();
  return (
    <div className="dashboard-item">
      <div>ADD BUTTON</div>
      <div>LIST OF ITEMS</div>
      <div>DELETE BUTTON</div>
    </div>
  );
};

export default DashboardItem;
