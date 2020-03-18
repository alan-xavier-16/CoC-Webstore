import { createSelector } from "reselect";

const selectProduct = state => state.product;

/* ALL PRODUCTS */
export const selectProducts = createSelector(
  [selectProduct],
  product => product.products
);

/* SINGLE PRODUCT */
export const selectProductItem = createSelector(
  [selectProduct],
  product => product.product
);

// export const selectProductItem = productSlug =>
//   createSelector([selectProducts], products =>
//     products
//       ? products
//           .filter(product => product.slug === productSlug)
//           .reduce(product => ({ ...product }))
//       : null
//   );

/* LOADING */
export const selectLoading = createSelector(
  [selectProducts],
  product => product.loading
);
