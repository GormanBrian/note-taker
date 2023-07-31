import { fileURLToPath } from "url";
import { dirname, join, extname } from "path";
import { readFile } from "fs/promises";

/** Root directory of the project */
export const __dirname = join(dirname(fileURLToPath(import.meta.url)), "../");

/**
 * Reads the file, validates the content and integrity of the file,
 *  resolves with data or rejects with an error.
 *
 * Error conditions:
 * - File is empty
 * - Filed extension is not valid
 * - Data could not be parsed
 *
 * @param path Path of the file
 * @returns {Promise} Handle result of {@link readFile}
 * @throws Will throw an error when file is invalid, empty, or data can not be parsed
 */
export const read = async (path) =>
  readFile(path).then((data) => {
    if (data.length <= 0) throw new Error("File is empty");
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
