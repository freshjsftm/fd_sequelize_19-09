const { Router } = require("express");
const UserController = require("./controllers/user.controller");
const TaskController = require("./controllers/task.controller");
const router = Router();

router.post("/users", UserController.createUser);
router.get("/users", UserController.getAllUsers);

router.patch("/users/:userId", UserController.updateUser);
router.patch("/users/:userId/v2", UserController.updateUserInstance);
router.get("/users/:userId", UserController.getUser);
router.delete("/users/:userId", UserController.deleteUserInstance);

router.post("/users/:userId/tasks", TaskController.createTask)

module.exports = router;
