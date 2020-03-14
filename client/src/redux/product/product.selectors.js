import { createSelector } from "reselect";

const selectProduct = state => state.product;

/* ALL PRODUCTS */
export const selectProducts = createSelector(
  [selectProduct],
  product => product.products
);

/* LOADING */
export const selectLoading = createSelector(
  [selectProducts],
  product => product.loading
);
