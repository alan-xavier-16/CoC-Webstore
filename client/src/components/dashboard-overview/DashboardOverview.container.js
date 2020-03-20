import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import WithSpinner from "../layout/spinner/WithSpinner.component";
import DashboardOverview from "./DashboardOverview.component";

import { selectAuthLoading } from "../../redux/auth/auth.selectors";

const mapStateToProps = createStructuredSelector({
  loading: selectAuthLoading
});

const DashboardOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(DashboardOverview);

export default DashboardOverviewContainer;
