import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import PropTypes from "prop-types";

// import { selectProducts } from "../../redux/product/product.selectors";
// import CategoryPreview from "../category-preview/CategoryPreview.component";

const ProductsOverview = ({ products }) => {
  return (
    <div className="category-overview">
      <h1 className="main-header">
        Browse the Lil Herbal{" "}
        <span className="herb">
          <i className="fas fa-feather-alt"></i>
        </span>{" "}
        In-Shop Products!
      </h1>
      {/* {categories.map(({ id, ...rest }) => (
        <CategoryPreview key={id} {...rest} />
      ))} */}
    </div>
  );
};

// ProductsOverview.propTypes = {
//   products: PropTypes.array.isRequired
// };

// const mapStateToProps = createStructuredSelector({
//   products: selectProducts
// });

export default connect(null)(ProductsOverview);
