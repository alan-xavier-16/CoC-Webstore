import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { useRouteMatch } from "react-router-dom";

import WithSpinner from "../layout/spinner/WithSpinner.component";
import DashboardItem from "./DashboardItem.component";

import { selectShopLoading } from "../../redux/shop/shop.selectors";
import { selectAuthLoading } from "../../redux/auth/auth.selectors";

const mapStateToProps = createStructuredSelector({
  loading: selectShopLoading
});

const DashboardItemContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(DashboardItem);

export default DashboardItemContainer;
