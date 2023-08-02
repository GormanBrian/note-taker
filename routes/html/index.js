import { Router, static as expressStatic } from "express";
import { join } from "path";
import { __dirname } from "../../utils/index.js";

const router = Router();

router.use(expressStatic(join(__dirname, "/public")));

router.get("/notes", (_, res) => {
  res.sendFile(join(__dirname, "/public/notes.html"));
});

router.get("/", (_, res) => {
  res.sendFile(join(__dirname, "/public/index.html"));
});

export default router;
