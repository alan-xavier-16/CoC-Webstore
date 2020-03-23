import React from "react";
import { connect } from "react-redux";
import { Link, useRouteMatch, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import "./DashboardBtns.styles.scss";

const DashboardBtns = ({ details: { name, edit } }) => {
  /* RELATIVE LINK && LOCATION OBJECT */
  const { url } = useRouteMatch();
  const location = useLocation();

  return (
    <div className="dashboard-btns">
      <div className="user-actions">
        <button className="btn btn-danger">
          Delete ALL <i className="fas fa-minus-square"></i>
        </button>

        <Link
          to={{
            pathname: `${url}/create-${name.toLowerCase()}`,
            state: { from: location.pathname }
          }}
          className="btn btn-success"
        >
          Add NEW <i className="fas fa-plus-square"></i>
        </Link>

        {edit && (
          <button className="btn btn-primary">
            Edit {name} <i className="fas fa-pencil-alt"></i>
          </button>
        )}
      </div>
    </div>
  );
};

DashboardBtns.propTypes = {};

export default DashboardBtns;
