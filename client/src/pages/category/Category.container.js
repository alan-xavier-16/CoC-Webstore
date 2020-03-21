import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import WithSpinner from "../../components/layout/spinner/WithSpinner.component";
import Category from "./Category.component";

import { selectShopLoading } from "../../redux/shop/shop.selectors";

const mapStateToProps = createStructuredSelector({
  loading: selectShopLoading
});

const CategoryContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(Category);

export default CategoryContainer;
