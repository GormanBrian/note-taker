import { fileURLToPath } from "url";
import { dirname, join, extname } from "path";
import { readFile } from "fs/promises";

/** Root directory of the project */
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
 * Reads the file, validates the content and integrity of the file,
 *  resolves with data or rejects with an error.
 *
 * Error conditions:
 * - File is empty
 * - Data could not be parsed
 *
 * @param path Path of the file
 * @returns {Promise} Handle result of {@link readFile}
 */
const read = async (path) =>
  readFile(path).then((data) => {
    if (data.length <= 0) throw new Error("File is empty");
    const ext = extname(path);
    if (ext === "") throw new Error("Invalid file extension");
    switch (ext) {
      case ".json":
        let json = JSON.parse(data);
        if (json instanceof SyntaxError)
          throw new Error("Could not parse JSON");
        return json;
    }
  });

export { __dirname, removeElementFromArray, read };
