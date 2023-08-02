/**
 * @overview Exports all utilities
 * @see fsUtils.js
 */

/**
 * Removes an element from an `array` based on the `property` and `value` specified
 *
 * @param {Array<Object>} array Array of objects
 * @param {string} property Property to identify element
 * @param {any} value Value of the identifying property
 * @returns {Array<Object>} Array with element removed or original array
 * @method removeElementFromArray
 * @see fsUtils.js
 */
export const removeElementFromArray = (array, property, value) => {
  let index = array.findIndex((e) => e[property] === value);
  return index === -1 ? array : array.splice(index, 1);
};

export * from "./fsUtils.js";
