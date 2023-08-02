import { fileURLToPath } from "url";
import { dirname, join, extname } from "path";
import { readFile } from "fs/promises";

/**
 * @overview Provides utility functions for {@linkcode module:fs/promises file system}
 */

/**
 * Root directory of the project
 * @constant __dirname
 */
export const __dirname = join(dirname(fileURLToPath(import.meta.url)), "../");

/**
 * Reads the file, validates the content and integrity of the file,
 *  resolves with data or rejects with an error.
 *
 * Error conditions:
 * - {@linkcode Error} - File is empty and `initialValue` not provided
 * - {@linkcode TypeError} - Filed extension is not valid
 * - {@linkcode SyntaxError} - Data could not be parsed
 *
 * @method read
 * @param path Path of the file
 * @param {any} [initialValue] Value to return if the file is empty
 * @returns {Promise} Handle result of {@link readFile}
 * @throws Will throw an error when file is invalid, empty, or data can not be parsed
 */
export const read = async (path, initialValue) =>
  readFile(path).then((data) => {
    // Handle empty file
    if (data.length <= 0) {
      if (initialValue) return initialValue;
      throw new Error("File is empty");
    }
    // Get file extension (e.g., `.js`, `.md`, `.json`)
    const ext = extname(path);
    if (ext === "") throw new TypeError("File extension not found");
    switch (ext) {
      case ".json":
        let json = JSON.parse(data);
        if (json instanceof SyntaxError) throw json;
        return json;
      default:
        throw new TypeError("File extension not supported");
    }
  });
