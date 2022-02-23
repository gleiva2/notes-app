const express = require("express");
const router = express.Router();
const Note = require("../models/note.model");

/**
 * Get all notes
 */
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Get a note by id
 */
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Create a note
 */
router.post("/", async (req, res) => {
  const note = new Note({
    title: req.body.title,
    body: req.body.body,
  });
  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * Delete a note by id
 */
router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * Update a note by id
 */
router.patch("/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, body: req.body.body },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  const note = Note.findById(req.params.id);
});

module.exports = router;
