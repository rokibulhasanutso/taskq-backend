const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UsersController');
const TaskController = require('../controllers/TasksController');
const AuthVerifyMiddleware = require('../middleware/AuthVerifyMiddleware');

// user routes
router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.post('/profileUpdate', AuthVerifyMiddleware, UserController.profileUpdate)

// task routes
router.post('/create', AuthVerifyMiddleware, TaskController.createTask)
router.get('/update/:id/:status', AuthVerifyMiddleware, TaskController.updateTask)
router.get('/delete/:id', AuthVerifyMiddleware, TaskController.deleteTask)
router.get('/tasks/:status', AuthVerifyMiddleware, TaskController.listUserTasksByStatus)
router.get('/taskscount', AuthVerifyMiddleware, TaskController.taskStatusCountByUser)

module.exports = router;