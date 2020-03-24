import React from "react";
import { Link, useRouteMatch, useLocation } from "react-router-dom";

import "./DashboardBtns.styles.scss";

const DashboardBtns = ({
  details: { name, add, edit, remove },
  removeAction,
  editItem
}) => {
  /* RELATIVE LINK, HISTORY && LOCATION OBJECT */
  const { url } = useRouteMatch();
  const location = useLocation();

  return (
    <div className="dashboard-btns">
      {remove && (
        <button className="btn btn-danger" onClick={removeAction}>
          <i className="fas fa-minus-square"></i>
        </button>
      )}

      {add && (
        <Link
          to={{
            pathname: `${url}/create-${name.toLowerCase()}`,
            state: { from: location.pathname }
          }}
          className="btn btn-success"
        >
          <i className="fas fa-plus-square"></i>
        </Link>
      )}

      {edit && (
        <Link
          to={{
            pathname: `${editItem}/edit`,
            state: { from: location.pathname }
          }}
          className="btn btn-primary"
        >
          <i className="fas fa-pencil-alt"></i>
        </Link>
      )}
    </div>
  );
};

export default DashboardBtns;
