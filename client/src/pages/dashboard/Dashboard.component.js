import React from "react";
import { Route, useRouteMatch } from "react-router-dom";

import DashboardOverviewContainer from "../../components/dashboard-overview/DashboardOverview.container";
import DashboardItemContainer from "../../components/dashboard-item/DashboardItem.container";

/*
Renders an Admin Dashboard Page with ROUTES:
  - /dashboard
  - /dashboard/services
  - /dashboard/courses
  - /dashboard/shop (default view is 'Categories' with a btn to swtich to 'Products')
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
