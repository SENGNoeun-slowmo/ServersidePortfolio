const express = require('express');
const router = express.Router();
const {
  getAllContact,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  
} = require('../controllers/ContactController');

router.route('/')
  .get(getAllContact)
  .post(createContact);

router
  .route('/:id')
  .get(getContactById)
  .patch(updateContact)
  .delete(deleteContact);

module.exports = router;