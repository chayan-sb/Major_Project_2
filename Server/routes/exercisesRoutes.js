import express from 'express';
import Exercise from '../models/Exercises.js';

const router = express.Router();

// Route to get all exercises
router.get('/exercises', async (req, res) => {
  try {
    const exercises = await Exercise.find(); // Get all exercises
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exercises', error });
  }
});

// Route to get exercises by category
router.get('/exercises/category/:category', async (req, res) => {
  try {
    const exercises = await Exercise.find({ category: req.params.category }); // Get exercises by category
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exercises by category', error });
  }
});

export default router;
