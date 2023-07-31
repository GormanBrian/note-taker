/** @namespace NotesNamespace */

/**
 * @class Note class
 * @memberof NotesNamespace
 */
export default class Note {
  /**
   * @typedef {Object} NoteObject Serialized {@link Note} object
   * @property {string} title Title of the `Note`
   * @property {string} text Text of the `Note`
   * @property {string} id Unique identifier
   * @property {boolean} favorite Favorite status
   * @memberof NotesNamespace
   */

  /**
   * @typedef {Array<Note>} Notes Array of {@link Note} instances
   * @memberof NotesNamespace
   */

  /**
   * @typedef {Array<NoteObject>} NoteObjects Array of {@link NoteObject} objects
   * @memberof NotesNamespace
   */

  /**
   * @constructor Constructor for {@link Note} class
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

  /**
   * Serializes {@link Note} instance
   * @returns {NoteObject} Serialized `Note` object
   */
  serialize() {
    return {
      title: this.title,
      text: this.text,
      id: this.id,
      favorite: this.favorite,
    };
  }

  /**
   * Serializes an array of {@link Note} instances
   * @param {Notes} note Array of `Note` instances
   * @returns {NoteObjects} Serialized `Note` objects
   */
  static serializeArray = (notes) => notes.map((n) => n.serialize());

  /**
   * Serializes and stringifies {@link Note} instance
   * @returns {string} Stringified `Note`
   */
  stringify = () => JSON.stringify(this.serialize());

  /**
   * Serializes and stringifies an array of {@link Note} instances
   * @param {Notes} notes Array of `Note` instances
   * @returns {string} Stringified `Note` array
   */
  static stringifyArray = (notes) => JSON.stringify(Note.serializeArray(notes));

  /**
   * Deserializes a {@link NoteObject} and creates a new instance of {@link Note}
   * @param {NoteObject} object JSON object to deserialize
   * @returns {Note} `Note` instance
   * @throws Will throw an error when `object` does not contain `title` or `text` properties
   */
  static deserialize = (object) => {
    let properties = Object.getOwnPropertyNames(object);
    if (!("title" in properties) || !("text" in properties))
      throw new Error("Object is missing necessary properties");
    return new Note(object.title, object.text, object.id, object.favorite);
  };

  /**
   * Deserializes a {@link NoteObjects} array and created an array of {@link Note} instances
   * @param {NoteObjects} objects JSON objects to deserialize
   * @returns {Notes} Array of `Note` instances
   * @throws Will throw an error when an object does not contain `title` or `text` properties
   */
  static deserializeArray = (objects) =>
    objects.map((o) => Note.deserialize(o));

  /**
   * Parses and deserializes a string into a new instance of {@link Note}
   * @param {string} string Stringified {@link NoteObject}
   * @returns {Note} `Note` instance
   * @throws Will throw an error when parsed `string` does not contain `title` or `text` properties
   */
  static parseToInstance = (string) => Item.deserialize(JSON.parse(string));

  /**
   * Parses and deserializes a string into a {@link Notes} array
   * @param {string} string Stringified {@link NoteObjects}
   * @returns {Notes} Array of `Note` instances
   */
  static parseToArray = (string) => Item.deserializeArray(JSON.parse(string));
}
