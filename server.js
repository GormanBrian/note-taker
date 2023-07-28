import express, { json, urlencoded, static as expressStatic } from "express";

import { htmlRouter, apiRouter } from "./routes/index.js";

const PORT = 3001;

// Create app
const app = express();

// Use middleware
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(expressStatic("public"));

app.use("/", htmlRouter);
app.use("/api", apiRouter);

// Listen for port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
