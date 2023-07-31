import { writeFile } from "fs/promises";
import { join } from "path";
import { __dirname, removeElementFromArray, read } from "../utils/index.js";
import Note from "./Notes.js";

/** Path of the database file */
const dbPath = join(__dirname, "db/db.json");

/**
 * Reads JSON from database file
 * @returns {Promise<NotesNamespace.Notes>} Handle result of {@link read}
 */
const readDatabase = async () => read(dbPath);

/**
 * Writes data to the database file
 * @param {NotesNamespace.Notes} data Items array
 * @returns {Promise<void>} Handle result of {@link writeFile}
 */
const writeDatabase = async (data) => writeFile(dbPath, JSON.stringify(data));

/**
 * @callback modify Modifies database array
 * @param {NotesNamespace.Notes} data Items array
 * @returns {NotesNamespace.Notes} Modified array
 */

/**
 * Reads the database file, modifies the array, then writes the modified array to the file.
 * @param {modify} modify Callback that returns the modified database array
 * @returns {Promise<void>} Handle result of {@link readFile} and {@link writeFile}
 */
const modifyDatabase = async (modify) =>
  readDatabase().then((data) => writeDatabase(modify(data)));

/**
 * Adds a note to the database
 * @param {NotesNamespace.NoteObject} note Note to be added
 * @returns {Promise<void>} Handle result of {@link modifyDatabase}
 */
const addNoteToDatabase = async (note) =>
  modifyDatabase((data) => {
    let notes = data;
    data.push(note);
    return notes;
  });

/**
 * Removes a note from the database
 * @param {string} id Unique `id` of the note to be removed
 * @returns {Promise<void>} Handle result of {@link modifyDatabase}
 */
const removeNoteFromDatabase = async (id) =>
  modifyDatabase((data) => {
    const notes = removeElementFromArray(data, "id", id);
    return notes;
  });

export { readDatabase, addNoteToDatabase, removeNoteFromDatabase };
