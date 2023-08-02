import { fileURLToPath } from "url";
import { dirname, join, extname } from "path";
import { readFile } from "fs/promises";

/**
 * @overview Provides utility functions for file system
 */

/**
 * Root directory of the project
 *
 * @readonly
 * @constant {string} __dirname
 */
export const __dirname = join(dirname(fileURLToPath(import.meta.url)), "../");

/**
 * Reads the file, validates the content and integrity of the file,
 *  resolves with data or rejects with an error.
 *
 * Supported file types:
 * - `.json` - JSON file
 * - `.md` - Markdown file
 *
 * Error conditions:
 * - {@linkcode Error} - File is empty and `defaultValue` not provided
 * - {@linkcode TypeError} - Filed extension is not valid
 * - {@linkcode SyntaxError} - Data could not be parsed
 *
 * @async
 * @method read
 * @param path Path of the file
 * @param {any} [defaultValue] Value to return if the file is empty
 * @returns {Promise<(JSON | string)>} Handle result of {@link readFile}
 * @throws Will throw an error when file is invalid, empty, or data can not be parsed
 */
export const read = async (path, defaultValue) =>
  readFile(path).then((data) => {
    // Handle empty file
    if (data.length <= 0) {
      if (defaultValue) return defaultValue;
      throw new Error("File is empty");
    }
    // Get file extension (e.g., `.json`, `.md`)
    const ext = extname(path);
    if (ext === "") throw new TypeError("File extension not found");
    // Parse data dependent on file type
    switch (ext) {
      case ".json":
        let json = JSON.parse(data);
        if (json instanceof SyntaxError) throw json;
        return json;
      case ".md":
        if (typeof data !== string)
          throw new SyntaxError("Markdown file could not be parsed");
        return data;
      default:
        throw new TypeError("File type not supported");
    }
  });
