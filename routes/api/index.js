import { Router, json, urlencoded } from "express";

import {
  Note,
  readDatabase,
  saveNoteToDatabase,
  deleteNoteFromDatabase,
} from "../../db/index.js";

/**
 * API Router
 */
const router = Router();

/* Use middleware */
router.use(json());
router.use(urlencoded({ extended: true }));

/**
 * /api/notes
 *  get:
 *    summary:
 *    description:
 *    responses:
 *
 */
router.get("/notes", (req, res) =>
  readDatabase()
    .then(async (db) => {
      console.info(`${req.method} request received`);
      res.status(200).json(db);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ status: "failure", body: err });
    })
);

/**
 * /api/notes
 *  post:
 *    summary:
 *    description:
 *    responses:
 *
 */
router.post("/notes", (req, res) => {
  console.info(`${req.method} request received`);
  if (!req.body) return res.send(400).json("Body required");
  try {
    const note = Note.deserialize(req.body);
    saveNoteToDatabase(note).then(() => {
      console.info("Saved note to database");
      return res.status(201).json(note.serialize);
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

/**
 * /api/notes/:id
 *  delete:
 *    summary:
 *    description:
 *    responses:
 *
 */
router.delete("/notes/:id", (req, res) => {
  console.info(`${req.method} request received`);
  const { id } = req.params;
  if (!id) return res.status(400).json("ID required");
  deleteNoteFromDatabase("id", id)
    .then(() => {
      console.info("Removed note from database");
      return res.status(201).json("success");
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json(err);
    });
});

export default router;
