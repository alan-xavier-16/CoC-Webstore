import React from "react";
import { Route, useRouteMatch } from "react-router-dom";

import DashboardOverviewContainer from "../../components/dashboard-overview/DashboardOverview.container";

/*
Renders an Admin Dashboard Page with ROUTES:
  - /dashboard
*/
const Dashboard = props => {
  // ACCESS PATH FROM APP
  const { path } = useRouteMatch();

  return (
    <div className="dashboard">
      <Route exact path={`${path}`} component={DashboardOverviewContainer} />
    </div>
  );
};

export default Dashboard;
