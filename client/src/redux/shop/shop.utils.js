/* CONVERT ARRAY TO OBJECT */
export const arrayToObject = (array, key) => {
  return array.reduce((obj, item) => {
    return { ...obj, [item[key]]: item };
  }, {});
};

/* FORMAT OBJECT -> KEY (SLUG): VALUE (OBJECT) */
export const objectToMap = (object, key) => {
  return { [object[key]]: object };
};

/* ADD OR UPDATE ITEM TO 'CATEGORY || PRODUCT' */
export const updateItem = (items, itemToAdd) => {
  // REMOVE EXISTING ITEM
  const filteredItems = Object.entries(items)
    .filter(([slug, category]) => {
      return category._id !== Object.values(itemToAdd)[0]["_id"];
    })
    .reduce((obj, item) => {
      return { ...obj, [item[0]]: item[1] };
    }, {});

  // APPEND NEW ITEM
  return { ...filteredItems, ...itemToAdd };
};

/* REMOVE ITEM TO 'CATEGORY || PRODUCT' */
export const removeItem = (items, itemToRemove) => {
  const existingItem = items.hasOwnProperty(Object.keys(itemToRemove)[0]);

  if (existingItem) {
    delete items[Object.keys(itemToRemove)[0]];
  }

  return { ...items };
};
