const express = require('express');
const router = express.Router();
const {
  getAllProfile,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
  
} = require('../controllers/ProfileController');

router
  .route('/')
  .get(getAllProfile)
  .post(createProfile);

router
  .route('/:id')
  .get(getProfileById)
  .patch(updateProfile)
  .delete(deleteProfile);

module.exports = router;