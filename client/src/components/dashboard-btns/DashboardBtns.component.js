import React from "react";
import { Link, useLocation } from "react-router-dom";

const DashboardBtns = ({
  pathName,
  btns: { add, edit, remove, photo },
  removeAction,
}) => {
  /* LOCATION OBJECT */
  const location = useLocation();

  return (
    <>
      {add && (
        <Link
          to={{
            pathname: `${pathName}`,
            state: { from: location.pathname },
          }}
          className="btn btn-success"
        >
          <i className="far fa-plus-square"></i>
        </Link>
      )}

      {remove && (
        <button className="btn btn-danger" onClick={removeAction}>
          <i className="fas fa-trash-alt"></i>
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
          <i className="fas fa-edit"></i>
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
    </>
  );
};

export default DashboardBtns;
