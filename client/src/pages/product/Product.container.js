import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import WithSpinner from "../../components/layout/spinner/WithSpinner.component";
import Product from "./Product.component";

import { selectShopLoading } from "../../redux/shop/shop.selectors";

const mapStateToProps = createStructuredSelector({
  loading: selectShopLoading,
});

const ProductContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(Product);

export default ProductContainer;
