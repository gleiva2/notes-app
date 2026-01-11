/**
 * Import Express and instantiate Express
 */
const express = require("express");
const app = express();

/**
 * Import cors
 */
const cors = require("cors");

/**
 * Import, instantiate, and connect to MongoDB server
 */
require('dotenv').config();
const mongoose = require("mongoose");
const dbUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/notes_db";
mongoose.set("runValidators", true);
mongoose.connect(dbUrl, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database!"));

app.use(express.json());
app.use(cors());

const router = require("./routes/notes.routes");
app.use("/notes", router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
