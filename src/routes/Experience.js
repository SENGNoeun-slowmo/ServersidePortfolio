const express = require('express');
const router = express.Router();
const ExperienceController = require('../controllers/ExsperiencesController');

// GET all experiences
router.get('/', ExperienceController.getAll);

// GET one experience
router.get('/:id', ExperienceController.getById);

// CREATE experience
router.post('/', ExperienceController.create);

// UPDATE experience
router.patch('/:id', ExperienceController.update);

// DELETE experience
router.delete('/:id', ExperienceController.delete);

module.exports = router;