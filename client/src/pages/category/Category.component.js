import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import CategoryItem from "../../components/category-item/CategoryItem.component";
import { selectCategory } from "../../redux/shop/shop.selectors";

import "./Category.styles.scss";

const Category = ({ category }) => {
  const { name, description, products } = category;
  return (
    <div className="category">
      <div className="category-header">
        <h1 className="main-header">{name}</h1>
        <p className="lead">{description}</p>
      </div>

      <div className="category-cards">
        <div className="cards">
          {products.map(product => (
            <CategoryItem key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

Category.propTypes = {
  category: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  category: selectCategory(ownProps.match.params.categorySlug)(state)
});

export default connect(mapStateToProps)(Category);
