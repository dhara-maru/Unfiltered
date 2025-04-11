const express = require('express');
const Note = require('../models/Note');
const router = express.Router();

// POST a new note
router.post('/', async (req, res) => {
  try {
    const { name, note, color } = req.body;
    if (!name || !note) {
      return res.status(400).json({ message: "Name and note are required." });
    }

    const newNote = new Note({ name, note, color });
    await newNote.save();
    res.status(201).json({ message: "Note added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error while adding note.", error });
  }
});

// GET notes by name
router.get('/:name', async (req, res) => {
  try {
    const notes = await Note.find({ name: req.params.name });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes by name.", error });
  }
});

// GET all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all notes.", error });
  }
});

module.exports = router;