import { createSelector } from "reselect";

const selectShop = state => state.shop;

/* ALL CATEGORIES */
export const selectCategories = createSelector(
  [selectShop],
  shop => shop.categories
);

/* CATEGORY MATCHING SLUG FROM URL */
export const selectCategory = categoryUrlParam =>
  createSelector([selectCategories], categories =>
    categories
      ? categories.find(category => category["slug"] === categoryUrlParam)
      : null
  );

/* ALL PRODUCTS */
export const selectProducts = createSelector(
  [selectShop],
  shop => shop.products
);

/* SINGLE PRODUCT */
export const selectProductItem = createSelector(
  [selectShop],
  shop => shop.product
);

/* LOADING */
export const selectLoading = createSelector([selectShop], shop => shop.loading);
