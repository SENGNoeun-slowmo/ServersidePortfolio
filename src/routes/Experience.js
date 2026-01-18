const express = require('express');
const router = express.Router();
const {
  getAllExperience,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
  
} = require('../controllers/ExsperiencesController');

router
  .route('/')
  .get(getAllExperience)
  .post(createExperience);

router
  .route('/:id')
  .get(getExperienceById)
  .patch(updateExperience)
  .delete(deleteExperience);

module.exports = router;