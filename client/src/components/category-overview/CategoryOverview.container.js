import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import WithSpinner from "../layout/spinner/WithSpinner.component";
import CategoryOverview from "./CategoryOverview.component";

import { selectLoading } from "../../redux/shop/shop.selectors";

const mapStateToProps = createStructuredSelector({
  loading: selectLoading
});

const CategoryOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CategoryOverview);

export default CategoryOverviewContainer;
