import { v4 as uuidv4 } from "uuid";

/**
 * @overview Contains Note class definition
 */

/**
 * @module Note
 * @class Note class
 * @classdesc Represents a note object in the database
 */
export default class Note {
  /* ========================== TYPEDEF ========================== */

  /**
   * @typedef {Object} NoteObject Serialized {@linkcode Note} object
   * @property {string} title Title of the Note
   * @property {string} text Text of the Note
   * @property {string} id Unique identifier
   * @property {boolean} favorite Favorite status
   * @memberof Note
   */

  /**
   * @typedef {Array<Note>} Notes Array of {@linkcode Note} instances
   * @memberof Note
   */

  /**
   * @typedef {Array<NoteObject>} NoteObjects Array of {@linkcode NoteObject} objects
   * @memberof Note
   */

  /* ====================== CLASS PROPERTIES ===================== */

  /**
   * @constructor Constructor for {@linkcode Note} class
   * @param {string} title Title of the note
   * @param {string} text Text of the note
   * @param {string} [id=uuidv4()] Unique identifier
   * @param {boolean} [favorite=false]
   */
  constructor(title, text, id = uuidv4(), favorite = false) {
    this.title = title;
    this.text = text;
    this.id = id;
    this.favorite = favorite;
  }

  /** Toggles favorite status */
  toggleFavorite() {
    this.favorite = !this.favorite;
  }

  /* ========================= SERIALIZE ========================= */

  /**
   * Serialized {@linkcode Note} instance
   *
   * @readonly
   * @type {NoteObject}
   */
  get serialize() {
    return {
      title: this.title,
      text: this.text,
      id: this.id,
      favorite: this.favorite,
    };
  }

  /**
   * Serializes an array of {@linkcode Note} instances
   *
   * @param {Notes} note Array of Note instances
   * @returns {NoteObjects} Serialized Note objects
   * @method serializeArray
   */
  static serializeArray = (notes) => notes.map((n) => n.serialize);

  /* ========================= STRINGIFY ========================= */

  /**
   * Serializes and stringifies {@linkcode Note} instance
   *
   * @returns {string} Stringified Note
   * @method stringify
   */
  stringify = () => JSON.stringify(this.serialize());

  /**
   * Serializes and stringifies an array of {@linkcode Note} instances
   *
   * @method stringifyArray
   * @param {Notes} notes Array of Note instances
   * @returns {string} Stringified Note array
   */
  static stringifyArray = (notes) => JSON.stringify(Note.serializeArray(notes));

  /* ======================== DESERIALIZE ======================== */

  /**
   * Deserializes a {@linkcode NoteObject} and creates a new instance of {@linkcode Note}
   *
   * @param {NoteObject} object JSON object to deserialize
   * @returns {Note} Note instance
   * @throws Will throw an error when `object` does not contain `title` or `text` properties
   * @method deserialize
   */
  static deserialize = (object) => {
    if (!("title" in object && "text" in object))
      throw new Error("Object is missing necessary properties");
    return new Note(object.title, object.text, object.id, object.favorite);
  };

  /**
   * Deserializes a {@linkcode NoteObjects} array and created an array of {@linkcode Note} instances
   *
   * @param {NoteObjects} objects JSON objects to deserialize
   * @returns {Notes} Array of Note instances
   * @throws Will throw an error when an object does not contain `title` or `text` properties
   * @method deserializeArray
   */
  static deserializeArray = (objects) => objects.map(Note.deserialize);

  /* =========================== Parse =========================== */

  /**
   * Parses and deserializes a string into a new instance of {@linkcode Note}
   *
   * @param {string} string Stringified {@linkcode NoteObject}
   * @returns {Note} Note instance
   * @throws Will throw an error when parsed `string` does not contain `title` or `text` properties
   * @method parseToInstance
   */
  static parseToInstance = (string) => Item.deserialize(JSON.parse(string));

  /**
   * Parses and deserializes a string into a {@linkcode Notes} array
   *
   * @param {string} string Stringified {@linkcode NoteObjects}
   * @returns {Notes} Array of {@linkcode Note} instances
   * @method parseToArray
   */
  static parseToArray = (string) => Item.deserializeArray(JSON.parse(string));
}
