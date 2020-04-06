import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./DashboardBtns.styles.scss";

const DashboardBtns = ({
  pathName,
  btns: { add, edit, remove, photo },
  removeAction,
}) => {
  /* LOCATION OBJECT */
  const location = useLocation();

  return (
    <div className="dashboard-btns">
      {add && (
        <Link
          to={{
            pathname: `${pathName}`,
            state: { from: location.pathname },
          }}
          className="btn btn-success"
        >
          <i className="fas fa-plus-square"></i>
        </Link>
      )}

      {remove && (
        <button className="btn btn-danger" onClick={removeAction}>
          <i className="fas fa-minus-square"></i>
        </button>
      )}

      {edit && (
        <Link
          to={{
            pathname: `${pathName}/edit`,
            state: { from: location.pathname },
          }}
          className="btn btn-primary"
        >
          <i className="fas fa-pencil-alt"></i>
        </Link>
      )}

      {photo && (
        <Link
          className="btn btn-success "
          to={{
            pathname: `${pathName}/photo-upload`,
            state: { from: location.pathname },
          }}
        >
          <i className="fas fa-camera"></i>
        </Link>
      )}
    </div>
  );
};

export default DashboardBtns;
