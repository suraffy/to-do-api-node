const express = require('express');
const {
  createTask,
  getAllTask,
  getTask,
  updateTask,
  deleteTask,
} = require('./../controllers/taskController');
const authenticate = require('./../controllers/authController');

const router = express.Router();

router.route('/').get(authenticate, getAllTask).post(authenticate, createTask);

router
  .route('/:id')
  .get(authenticate, getTask)
  .patch(authenticate, updateTask)
  .delete(authenticate, deleteTask);

module.exports = router;
