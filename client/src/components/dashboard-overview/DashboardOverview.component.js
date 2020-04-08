import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import PropTypes from "prop-types";

import DashboardAction from "../dashboard-action/DashboardAction.component";

import { selectUser } from "../../redux/auth/auth.selectors";

import "./DashboardOverview.styles.scss";

const DashboardOverview = ({ user }) => {
  const resources = process.env.REACT_APP_RESOURCES.split(" ");
  return (
    <div className="dashboard-overview">
      <div className="dashboard-overview-header">
        <h3 className="main-header">
          <i className="fas fa-user-shield"></i> Admin Dashboard
        </h3>
        <p className="lead">
          Welcome <span>{user.name}</span>
        </p>
        <p className="lead">
          Click the buttons below to perform Administrative actions
        </p>
      </div>

      <div className="dashboard-items cards">
        {resources.map((resource) => (
          <DashboardAction key={resource} resource={resource} />
        ))}
      </div>
    </div>
  );
};

DashboardOverview.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
});

export default connect(mapStateToProps)(DashboardOverview);
