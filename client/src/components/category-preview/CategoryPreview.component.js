import React from "react";
import { useRouteMatch, Link, useLocation } from "react-router-dom";
import ProductItem from "../product-item/ProductItem.component";

import "./CategoryPreview.styles.scss";

const CategoryPreview = ({ slug, name, products }) => {
  /** RELATIVE LINK  */
  const { url } = useRouteMatch();

  /** ACCESS LOCATION OBJECT */
  const location = useLocation();

  return (
    <div className="category-preview">
      <div className="preview-header">
        <h3 className="title">{name.toUpperCase()}</h3>
        <Link
          to={{
            pathname: `${url}/categories/${slug}`,
            state: { from: location.pathname }
          }}
          className="btn btn-dark"
        >
          View More <i className="fas fa-angle-right"></i>
        </Link>
      </div>

      <div className="cards">
        {products
          .filter((product, idx) => idx < 4)
          .map(product => (
            <ProductItem key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
