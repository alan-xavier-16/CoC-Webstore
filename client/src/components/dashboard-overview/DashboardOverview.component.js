import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import PropTypes from "prop-types";

import { selectUser } from "../../redux/auth/auth.selectors";

import "./DashboardOverview.styles.scss";

const DashboardOverview = ({ user }) => {
  const dashboardItems = ["services", "shop", "courses", "users"];
  return (
    <div className="dashboard-overview">
      <div className="dashboard-overview-header">
        <h3 className="main-header">
          <i className="fas fa-user-shield"></i> Admin Dashboard
        </h3>
        <p className="lead">
          Welcome <span>{user.name}</span>
        </p>
      </div>

      <div className="dashboard-items">
        {dashboardItems.map((item, idx) => (
          <div key={idx}>{item}</div>
        ))}
      </div>
    </div>
  );
};

DashboardOverview.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = createStructuredSelector({
  user: selectUser
});

export default connect(mapStateToProps)(DashboardOverview);
