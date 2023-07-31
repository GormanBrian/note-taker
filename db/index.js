import { writeFile } from "fs/promises";
import { join } from "path";
import { __dirname, removeElementFromArray, read } from "../utils/index.js";

/** Path of the database file */
const dbPath = join(__dirname, "db/db.json");

/**
 * @typedef {Object} item Database item
 * @property {string} title Title of the item
 * @property {string} text Text of the item
 * @property {string} id Unique identifier
 */

/** @typedef {Array<item>} items Array of {@link item} objects */

/**
 * Reads JSON from database file
 * @returns {Promise<items>} Handle result of {@link read}
 */
const readDatabase = async () => read(dbPath);

/**
 * Writes data to the database file
 * @param {items} data Items array
 * @returns {Promise<void>} Handle result of {@link writeFile}
 */
const writeDatabase = async (data) => writeFile(dbPath, JSON.stringify(data));

/**
 * @callback modify Modifies database array
 * @param {items} data Items array
 * @returns {items} Modified array
 */

/**
 * Reads the database file, modifies the array, then writes the modified array to the file.
 * @param {modify} modify Callback that returns the modified database array
 * @returns {Promise<void>} Handle result of {@link readFile} and {@link writeFile}
 */
const modifyDatabase = async (modify) =>
  readDatabase().then((data) => writeDatabase(modify(data)));

/**
 * Adds an item to the database
 * @param {item} item Item to be added
 * @returns {Promise<void>} Handle result of {@link modifyDatabase}
 */
const addItemToDatabase = async (item) =>
  modifyDatabase((data) => {
    let items = data;
    data.push(item);
    return items;
  });

/**
 * Removes an item from the database
 * @param {string} id Unique `id` of the item to be removed
 * @returns {Promise<void>} Handle result of {@link modifyDatabase}
 */
const removeItemFromDatabase = async (id) =>
  modifyDatabase((data) => {
    const items = removeElementFromArray(data, "id", id);
    return items;
  });

export { readDatabase, addItemToDatabase, removeItemFromDatabase };
