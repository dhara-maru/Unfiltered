const express = require('express');
const Note = require('../models/Note');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, note, color } = req.body;
  const newNote = new Note({ name, note, color });
  await newNote.save();
  res.status(200).send('Note added!');
});

router.get('/:name', async (req, res) => {
  const notes = await Note.find({ name: req.params.name });
  res.status(200).json(notes);
});

module.exports = router;
