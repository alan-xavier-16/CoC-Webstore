import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import WithSpinner from "../layout/spinner/WithSpinner.component";
import ProductsOverview from "./ProductsOverview.component";

import { selectLoading } from "../../redux/product/product.selectors";

const mapStateToProps = createStructuredSelector({
  loading: selectLoading
});

const ProductsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(ProductsOverview);

export default ProductsOverviewContainer;
