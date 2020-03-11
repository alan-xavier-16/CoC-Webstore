import { createSelector } from "reselect";

const selectAuth = state => state.auth;

/* AUTH SELECTOR */
export const selectIsAuthenticated = createSelector(
  [selectAuth],
  auth => auth.isAuthenticated
);

/* CURRENT USER SELECTOR */
export const selectUser = createSelector([selectAuth], auth => auth.user);

/* TOKEN SELECTOR */
export const selectToken = createSelector([selectAuth], auth => auth.token);

/* LOADING */
export const selectAuthLoading = createSelector(
  [selectAuth],
  auth => auth.loading
);
