import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { __dirname, removeElementFromArray } from "../utils/index.js";

const dbPath = join(__dirname, "db/db.json");

const readDatabase = async () => readJSON(dbPath);

const writeDatabase = async (data) => writeFile(dbPath, data);

const modifyDatabase = async (modify) => {
  return readDatabase().then((data) => {
    return writeDatabase(modify(data));
  });
};

const addNoteToDatabase = async (note) => {
  return modifyDatabase((data) => {
    let notes = data;
    data.push(note);
    return notes;
  });
};

const removeNoteFromDatabase = async (id) => {
  return modifyDatabase((data) => {
    const notes = removeElementFromArray(data, "id", id);
    return notes;
  });
};

export { readDatabase, addNoteToDatabase, removeNoteFromDatabase };
