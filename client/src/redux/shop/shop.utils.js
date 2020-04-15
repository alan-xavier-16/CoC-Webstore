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
export const updateCategory = (categories, categoryToAdd) => {
  return { ...categories, ...categoryToAdd };
};

/* REMOVE ITEM TO 'CATEGORY || PRODUCT' */
export const removeCategory = (categories, categoryToRemove) => {
  const existingCategory = categories.hasOwnProperty(
    Object.keys(categoryToRemove)[0]
  );

  if (existingCategory) {
    delete categories[Object.keys(categoryToRemove)[0]];
  }

  return { ...categories };
};
