import React from "react";
import { useRouteMatch, Link, useLocation, useHistory } from "react-router-dom";

import ProductItem from "../product-item/ProductItem.component";
import DashboardBtns from "../../components/dashboard-btns/DashboardBtns.component";

const CategoryPreview = ({
  _id,
  slug,
  name,
  products,
  user,
  deleteCategory,
}) => {
  /** RELATIVE LINK, ACCESS LOCATION & HISTORY OBJECT  */
  const { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  /**  DELETE ACTION */
  const handleDelete = (e) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${name}? This cannot be undone.`
      )
    ) {
      deleteCategory(_id, history);
    }
  };

  return (
    <div className="preview">
      <div className="preview-header">
        <h3 className="title">{name.toUpperCase()}</h3>

        <div className="user-actions">
          <Link
            to={{
              pathname: `${url}/categories/${slug}`,
              state: { from: location.pathname },
            }}
            className="btn btn-dark"
          >
            View More <i className="fas fa-angle-right"></i>
          </Link>

          {user.role && user.role === "admin" && (
            <DashboardBtns
              btns={{ add: false, edit: true, remove: true }}
              removeAction={handleDelete}
              pathName={`${url}/categories/${slug}`}
            />
          )}
        </div>
      </div>

      <div className="cards">
        {products &&
          products
            .filter((product, idx) => idx < 5)
            .map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
