import React from "react";
import { connect } from "react-redux";
import { Link, useRouteMatch, useLocation, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import { deleteCategory } from "../../redux/shop/shop.actions";

import "./DashboardBtns.styles.scss";

const DashboardBtns = ({
  details: { name, add, edit, remove },
  deleteCategory
}) => {
  /* RELATIVE LINK, HISTORY && LOCATION OBJECT */
  const { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  /**  DELETE ACTION */
  const handleDelete = e => {
    deleteCategory(remove);
    history.push(`${location.state.from}`);
  };

  return (
    <div className="dashboard-btns">
      <div className="admin-actions">
        {remove && (
          <button className="btn btn-danger" onClick={handleDelete}>
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
          <button className="btn btn-primary">
            <i className="fas fa-pencil-alt"></i>
          </button>
        )}
      </div>
    </div>
  );
};

DashboardBtns.propTypes = {
  deleteCategory: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  deleteCategory: categoryId => deleteCategory(categoryId)
};

export default connect(null, mapDispatchToProps)(DashboardBtns);
