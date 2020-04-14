/* CONVERT ARRAY TO OBJECT */
export const arrayToObject = (array, key) => {
  return array.reduce((obj, item) => {
    return { ...obj, [item[key]]: item };
  }, {});
};
