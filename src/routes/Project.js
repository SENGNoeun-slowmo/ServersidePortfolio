const express = require('express');
const router = express.Router();
const {
  getAllProject,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  
} = require('../controllers/ProjectController');

router
  .route('/')
  .get(getAllProject)
  .post(createProject);

router
  .route('/:id')
  .get(getProjectById)
  .patch(updateProject)
  .delete(deleteProject);

module.exports = router;