const express = require("express");
const Note = require("../models/Note");
const middleWare = require("../middlewares/middleware");

const router = express.Router();

router.post("/add", middleWare, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Both title and description are required",
      });
    }

    const newNote = new Note({
      title,
      description,
      userId: req.user.id,
    });

    await newNote.save();

    return res.status(201).json({
      success: true,
      message: "Note added successfully",
      note: newNote,
    });
  } catch (err) {
    console.error("Error adding note:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while adding note",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    return res.status(200).json({
      success: true,
      message: "Notes retrieved successfully",
      notes: notes, 
    });
  } catch (err) {
    console.error("Error retrieving notes:", err);
    return res.status(500).json({
      success: false,
      message: "Cannot retrieve notes",
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    console.error('Error deleting note:', err);
    res.status(500).json({ message: 'Server error while deleting note' });
  }
});

module.exports = router;
