/** UTILITY FUNCTION FOR CART */

export const updateCart = (cartItems, updatedCartItem) => {
  // Check for cart item
  const existingCartItem = cartItems.find(
    cartItem => cartItem._id === updatedCartItem._id
  );

  // If true, update Cart Item, Else create
  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem._id === updatedCartItem._id
        ? { ...cartItem, ...updatedCartItem }
        : cartItem
    );
  }

  return [...cartItems, { ...updatedCartItem, quantity: 1, wish: false }];
};
