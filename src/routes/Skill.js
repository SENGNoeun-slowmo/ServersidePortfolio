const express = require('express');
const router = express.Router();
const {
  getAllSkill,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
  
} = require('../controllers/SkillController');

router
  .route('/')
  .get(getAllSkill)
  .post(createSkill);

router
  .route('/:id')
  .get(getSkillById)
  .patch(updateSkill)
  .delete(deleteSkill);

module.exports = router;