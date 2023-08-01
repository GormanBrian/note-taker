import { writeFile } from "fs/promises";
import { join } from "path";
import { __dirname, removeElementFromArray, read } from "../utils/index.js";
import Note from "./Notes.js";

export { Note };

/** Path of the database file */
const dbPath = join(__dirname, "db/db.json");

/**
 * Reads JSON from database file
 * @returns {Promise<NotesNamespace.Notes>} Handle result of {@link read}
 */
export const readDatabase = async () => read(dbPath);

/**
 * Writes data to the database file
 * @param {NotesNamespace.Notes} data Items array
 * @returns {Promise<void>} Handle result of {@link writeFile}
 */
const writeDatabase = async (data) => writeFile(dbPath, JSON.stringify(data));

/**
 * @callback modify Modifies database array
 * @param {NotesNamespace.Notes} notes Items array
 * @returns {NotesNamespace.Notes} Modified array
 * @throws Can throw an error
 */

/**
 * Reads the database file, modifies the array, then writes the modified array to the file.
 * @param {modify} modify Callback that returns the modified database array
 * @returns {Promise<void>} Handle result of {@link readFile} and {@link writeFile}
 */
const modifyDatabase = async (modify) =>
  readDatabase().then((data) => {
    let modifiedData = modify(data);
    writeDatabase(modifiedData);
  });

/**
 * Adds a note to the database
 * @param {NotesNamespace.NoteObject} note Note to be added
 * @returns {Promise<void>} Handle result of {@link modifyDatabase}
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
 * Removes a note from the database
 * @param {string} id Unique identifier of the note to be removed
 * @returns {Promise<void>} Handle result of {@link modifyDatabase}
 */
export const deleteNoteFromDatabase = async (key, value) =>
  modifyDatabase((notes) => removeElementFromArray(notes, key, value));
