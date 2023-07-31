import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

import { readDatabase, removeNoteFromDatabase } from "../../db/index.js";

const router = Router();

/**
 * /api/notes
 *  get:
 *    summary:
 *    description:
 *    responses:
 *
 */
router.get("/notes", (req, res) => {
  readDatabase()
    .then(async (db) => {
      console.info(`${req.method} request received`);
      res.status(200).json(db);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ status: "failure", body: err });
    });
});

/**
 * /api/notes
 *  get:
 *    summary:
 *    description:
 *    responses:
 *
 */
router.post("/notes", (req, res) => {});

/**
 * /api/notes
 *  get:
 *    summary:
 *    description:
 *    responses:
 *
 */
router.delete("/notes/:id", (req, res) => {});

export default router;
