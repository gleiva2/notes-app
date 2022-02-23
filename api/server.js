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
const mongoose = require("mongoose");
dbUrl = "mongodb://localhost:27017/notes_db";
mongoose.set("runValidators", true);
mongoose.connect(dbUrl, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database!"));

app.use(express.json());
app.use(cors());

const router = require("./routes/notes.routes");
app.use("/notes", router);

app.listen(3000, () => console.log("Server started."));
