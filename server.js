import express, { json, urlencoded, static as expressStatic } from "express";
import { htmlRouter, apiRouter } from "./routes/index.js";

/**
 * @overview Contains server instantiation and configuration
 *
 * - Create Express application
 * - Add middleware
 * - Add routes
 * - Start Express application
 */

/**
 * Port that express server will run on
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
 * @version 4.16.4
 */
const app = express();

/* Use middleware */
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(expressStatic("public"));

/* Use HTML router */
app.use("/", htmlRouter);
/* Use API router */
app.use("/api", apiRouter);

/* Start Express server */
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
