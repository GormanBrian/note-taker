import { writeFile } from "fs/promises";
import { join } from "path";
import { __dirname, removeElementFromArray, read } from "../utils/index.js";
import Note from "./Notes.js";

export { Note };

/**
 * Path of the database file
 *
 * @readonly
 * @constant dbPath
 */
const dbPath = join(__dirname, "db/db.json");

/**
 * Reads JSON array from database file
 *
 * @async
 * @method readDatabase
 * @returns {Promise<Note.Notes>} Handle result of {@linkcode read}
 * @throws Will throw an error when database path is invalid or data can not be parsed
 */
export const readDatabase = async () => read(dbPath, []);

/**
 * Writes data to the database file
 *
 * @async
 * @method writeDatabase
 * @param {Note.Notes} data Notes array
 * @returns {Promise<void>} Handle result of {@linkcode writeFile}
 */
const writeDatabase = async (data) => writeFile(dbPath, JSON.stringify(data));

/**
 * @callback modifyCallback Modifies database array
 * @param {Note.Notes} notes Notes array
 * @returns {Note.Notes} Modified array
 * @throws Can throw an error
 */

/**
 * Reads the database file, modifies the array, then writes the modified array to the file.
 *
 * @async
 * @method modifyDatabase
 * @param {modifyCallback} modifyCallback Callback that modifies the database array
 * @returns {Promise<void>} Handle result of {@linkcode readFile} and {@linkcode writeFile}
 */
const modifyDatabase = async (modifyCallback) =>
  readDatabase().then((data) => {
    let modifiedData = modifyCallback(data);
    writeDatabase(modifiedData);
  });

/**
 * Adds a {@linkcode Note} to the database
 *
 * @async
 * @method saveNoteToDatabase
 * @param {Note.NoteObject} note Note to be added
 * @returns {Promise<void>} Handle result of {@linkcode modifyDatabase}
 */
export const saveNoteToDatabase = async (note) => {
  modifyDatabase((notes) => {
    const newNotes = notes;
    const index = newNotes.findIndex((n) => n.id === note.id);
    if (index === -1) newNotes.push(note);
    else newNotes[index] = note;
    return newNotes;
  });
};

/**
 * Removes a {@linkcode Note} from the database
 *
 * @async
 * @method deleteNoteFromDatabase
 * @param {string} id Unique identifier of the note to be removed
 * @returns {Promise<void>} Handle result of {@linkcode modifyDatabase}
 */
export const deleteNoteFromDatabase = async (key, value) =>
  modifyDatabase((notes) =>
    notes.length === 1 ? [] : removeElementFromArray(notes, key, value)
  );
