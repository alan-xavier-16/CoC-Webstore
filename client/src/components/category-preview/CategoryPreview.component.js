import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import CategoryItem from "../category-item/CategoryItem.component";

import "./CategoryPreview.styles.scss";

const CategoryPreview = ({ slug, name, products }) => {
  /** Create relative link  */
  let { url } = useRouteMatch();
  return (
    <div className="category-preview">
      <div className="preview-header">
        <h3 className="title">{name.toUpperCase()}</h3>
        <Link to={`${url}/${slug}`} className="btn btn-dark">
          View More <i className="fas fa-angle-right"></i>
        </Link>
      </div>

      <div className="cards">
        {products
          .filter((product, idx) => idx < 4)
          .map(product => (
            <CategoryItem key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
