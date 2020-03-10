import { createSelector } from "reselect";

const selectShop = state => state.shop;

/* CATEGORIES */
export const selectCategories = createSelector(
  [selectShop],
  shop => shop.categories
);

/* SELECT CATEGORY MATCHING THE SLUG */
export const selectCategory = categoryUrlParam =>
  createSelector([selectCategories], categories =>
    categories
      ? categories.find(category => category["slug"] === categoryUrlParam)
      : null
  );

/* LOADING */
export const selectLoading = createSelector([selectShop], shop => shop.loading);
