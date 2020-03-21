import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import WithSpinner from "../layout/spinner/WithSpinner.component";
import ProductsOverview from "./ProductsOverview.component";

import { selectShopLoading } from "../../redux/shop/shop.selectors";

const mapStateToProps = createStructuredSelector({
  loading: selectShopLoading
});

const ProductsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(ProductsOverview);

export default ProductsOverviewContainer;
