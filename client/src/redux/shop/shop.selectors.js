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
    categories
      ? categories.find((category) => category["slug"] === categoryUrlParam)
      : null
  );

/* ALL PRODUCTS */
export const selectProducts = createSelector(
  [selectShop],
  (shop) => shop.products
);

/* SINGLE PRODUCT */
export const selectProductItem = createSelector(
  [selectShop],
  (shop) => shop.product
);

/* SINGLE PRODUCT PHOTOS */
export const selectProductItemPhotos = createSelector(
  [selectProductItem],
  (product) => product.photo
);

/* GETS LOADING */
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
