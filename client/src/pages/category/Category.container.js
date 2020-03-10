import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import WithSpinner from "../../components/layout/spinner/WithSpinner.component";
import Category from "./Category.component";

import { selectLoading } from "../../redux/shop/shop.selectors";

const mapStateToProps = createStructuredSelector({
  loading: selectLoading
});

const CategoryContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(Category);

export default CategoryContainer;
