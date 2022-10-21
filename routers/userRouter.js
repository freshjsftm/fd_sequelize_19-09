const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const TaskController = require('../controllers/task.controller');
const { checkUser } = require('../middlewares/user.mw');
const { paginate } = require('../middlewares/paginate.mw');

const userRouter = Router();

userRouter.post('/', UserController.createUser);
userRouter.get('/', paginate, UserController.getAllUsers);

userRouter.patch('/:userId', UserController.updateUser);
userRouter.patch('/:userId/v2', checkUser, UserController.updateUserInstance);
userRouter.get('/:userId', UserController.getUser);
userRouter.delete('/:userId', checkUser, UserController.deleteUserInstance);

userRouter.post('/:userId/tasks', checkUser, TaskController.createTask);
userRouter.get('/:userId/tasks', checkUser, TaskController.getTasksByUser);

module.exports = userRouter;
