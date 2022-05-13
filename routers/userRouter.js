const express = require('express');
const {
  signUp,
  login,
  me,
  updateMe,
  deleteMe,
} = require('./../controllers/userController');
const authenticate = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);

router
  .route('/me')
  .get(authenticate, me)
  .patch(authenticate, updateMe)
  .delete(authenticate, deleteMe);

module.exports = router;
