import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

/* ALL CATEGORIES */
export const selectCategories = createSelector(
  [selectShop],
  (shop) => shop.categories
);

/* CATEGORY MATCHING SLUG FROM URL */
export const selectCategory = (categoryUrlParam) =>
  createSelector([selectCategories], (categories) =>
    categories ? categories[categoryUrlParam] : null
  );

/* ALL PRODUCTS */
export const selectProducts = createSelector(
  [selectShop],
  (shop) => shop.products
);

/* SINGLE PRODUCT MATCHING SLUG FROM URL */
export const selectProductItem = (productUrlParam) =>
  createSelector([selectProducts], (products) =>
    products ? products[productUrlParam] : null
  );

/* LOADING */
export const selectShopLoading = createSelector(
  [selectShop],
  (shop) => shop.loading
);

/* CATEGORIES || PRODUCTS LOADED */
export const selectShopLoaded = createSelector(
  [selectShop],
  (shop) => !!shop.categories
);

export const selectProductsLoaded = createSelector(
  [selectShop],
  (shop) => !!shop.products
);
