const { Router } = require('express');
const groupRouter = require('./groupRouter');
const userRouter = require('./userRouter');
const TaskController = require('../controllers/task.controller');
const { paginate } = require('../middlewares/paginate.mw');
const router = Router();

router.use('/users', userRouter);
router.use('/groups', groupRouter);
userRouter.get('/tasks', paginate, TaskController.getAllTasks);

module.exports = router;
