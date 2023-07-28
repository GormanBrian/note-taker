import { Router } from "express";
import { join } from "path";
import { __dirname } from "../../utils/files.js";

const router = Router();

router.get("/", (_, res) => {
  res.sendFile(join(__dirname, "/public/index.html"));
});

router.get("/notes", (_, res) => {
  res.sendFile(join(__dirname, "/public/notes.html"));
});

export default router;
