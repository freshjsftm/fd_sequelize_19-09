const { Router } = require("express");
const UserController = require("./controllers/user.controller");
const TaskController = require("./controllers/task.controller");
const GroupController = require("./controllers/group.controller");
const { checkUser } = require("./middlewares/user.mw");
const { paginate } = require("./middlewares/paginate.mw");
const router = Router();

router.post("/users", UserController.createUser);
router.get("/users", paginate,  UserController.getAllUsers);

router.patch("/users/:userId", UserController.updateUser);
router.patch("/users/:userId/v2", checkUser, UserController.updateUserInstance);
router.get("/users/:userId", UserController.getUser);
router.delete("/users/:userId", checkUser,  UserController.deleteUserInstance);

router.post("/users/:userId/tasks", checkUser,  TaskController.createTask)
router.get("/users/:userId/tasks", checkUser, TaskController.getTasksByUser)

//вывести все таски всех юзеров - лимит 10 оффсет 50
router.get("/tasks", paginate, TaskController.getAllTasks)

router.post("/groups", GroupController.createGroup);

module.exports = router;
