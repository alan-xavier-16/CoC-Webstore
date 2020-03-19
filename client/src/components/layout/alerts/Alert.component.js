import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { removeAlert } from "../../../redux/alerts/alert.actions";

const Alert = ({ alerts, removeAlert }) => {
  return (
    <>
      {alerts.length > 0 && (
        <div className="alerts">
          {alerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.alertType}`}>
              <h3>{alert.msg}</h3>
              <button
                className={`btn btn-${alert.alertType}`}
                onClick={() => removeAlert(alert.id)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
  removeAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

const mapDispatchToProps = {
  removeAlert: alertId => removeAlert(alertId)
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
