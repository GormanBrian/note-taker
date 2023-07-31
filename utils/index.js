/**
 * Removes an element from an array based on the property and value specified
 * @param {Array<Object>} array Array of objects
 * @param {string} property Property to identify element
 * @param {any} value Value of the identifying property
 * @returns {Array<Object>} Array with element removed or original array
 */
export const removeElementFromArray = (array, property, value) => {
  let index = array.findIndex((e) => e[property] === value);
  if (index === -1) return array;
  return array.splice(index, 1);
};

export * from "./fsUtils.js";
