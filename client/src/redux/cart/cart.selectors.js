import { createSelector } from "reselect";

const selectCart = state => state.cart;

/* CART ITEMS */
export const selectCartItems = createSelector([selectCart], cart => cart.cart);

/* CART ITEMS COUNT */
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems
      ? cartItems.reduce(
          (accumulator, cartItem) => accumulator + cartItem.quantity,
          0
        )
      : 0
);

/* CART TOTAL */
export const selectCartTotal = createSelector([selectCartItems], cartItems =>
  cartItems
    ? cartItems.reduce(
        (accumulatedTotal, cartItem) =>
          accumulatedTotal + cartItem.product.price * cartItem.quantity,
        0
      )
    : 0
);

/* CART HIDDEN */
export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
);

/* LOADING */
export const selectCartLoading = createSelector(
  [selectCart],
  cart => cart.loading
);
