import express from "express";
import { htmlRouter, apiRouter } from "./routes/index.js";

/**
 * @overview Contains server instantiation and configuration
 */

/**
 * Express application listen port
 *
 * @readonly
 * @constant {number} PORT
 * @default 3001
 */
const PORT = 3001;

/**
 * Express App
 *
 * @see {@link https://expressjs.com/en/4x/api.html Express API Documentation}
 * @version 4.18.2
 */
const app = express();

/* Use HTML router */
app.use("/", htmlRouter);
/* Use API router */
app.use("/api", apiRouter);

/* Start Express server */
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
