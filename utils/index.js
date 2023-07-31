import { fileURLToPath } from "url";
import { dirname, join } from "path";

/**
 * Root directory of the project
 */
const __dirname = join(dirname(fileURLToPath(import.meta.url)), "../");

/**
 * Removes an element from an array based on the property and value specified
 * @param {Array<Object>} array Array of objects
 * @param {string} property Property to identify element
 * @param {any} value Value of the identifying property
 * @returns {Array<Object>} Array with element removed or original array
 */
const removeElementFromArray = (array, property, value) => {
  let index = array.findIndex((e) => e[property] === value);
  if (index === -1) return array;
  return array.splice(index, 1);
};

/**
 * Reads the JSON file, validates the content and integrity of the file,
 *  resolves with JSON or rejects with an error.
 *
 * Error conditions:
 * - JSON file is empty
 * - JSON could not be parsed
 *
 * @param path Path of the JSON file
 * @returns {Promise} Promise that resolves with the file contents as JSON
 */
const readJSON = async (path) =>
  readFile(path).then((data) => {
    if (data.length <= 0) throw new Error("File is empty");
    let json = JSON.parse(data);
    if (json instanceof SyntaxError) throw new Error("Could not parse JSON");
    return json;
  });

export { __dirname, removeElementFromArray, readJSON };
