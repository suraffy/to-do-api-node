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

router.get('/me', authenticate, me);
router.patch('/updateme', authenticate, updateMe);
router.delete('/deleteMe', authenticate, deleteMe);

module.exports = router;
