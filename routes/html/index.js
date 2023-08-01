import { Router } from "express";
import { join } from "path";
import { __dirname } from "../../utils/index.js";

const router = Router();

router.get("/notes", (_, res) => {
  res.sendFile(join(__dirname, "/public/notes.html"));
});

router.get("/", (_, res) => {
  res.sendFile(join(__dirname, "/public/index.html"));
});

export default router;
