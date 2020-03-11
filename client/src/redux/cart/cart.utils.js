/*
UTILITY FUNCTION FOR ADDING NEW ITEM OR MODIFYING ITEM TO CART
  - Accepts 'cartItems' from Redux store and 'item' from the action response
  - Checks if 'item' exists in the Redux store
  - TRUE: Returns cart with UPDATED ITEM
  - FALSE: Returns cart with NEW ITEM
*/
export const modifyCart = (cartItems, item) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.product._id === item.product._id
  );

  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.product._id === item.product._id
        ? { ...cartItem, ...item }
        : cartItem
    );
  } else {
    cartItems.push(item);
    return cartItems;
  }
};

/*
UTILITY FUNCTION FOR REMOVING ITEM FROM CART
  - Accepts 'cartItems' from Redux store and 'item' from the action payload
  - Checks if 'item' exists in the Redux store
  - TRUE: Returns cart with REMOVED ITEM
  - FALSE: Returns cart UNMODIFIED
*/
export const removeCartItem = (cartItems, item) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.product._id === item.product._id
  );

  if (existingCartItem) {
    return cartItems.filter(cartItem => cartItem._id !== item._id);
  } else {
    return cartItems;
  }
};
