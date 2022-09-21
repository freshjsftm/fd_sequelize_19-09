const { Task } = require("../models");

module.exports.createTask = async (req, res, next) => {
  try {
    const { body, instanceUser } = req;
    const task = await instanceUser.createTask(body);
    res.status(201).send({ data: task });
  } catch (error) {
    next(error);
  }
};

module.exports.getTasksByUser = async (req, res, next) => {
  try {
    const { instanceUser } = req;
    const tasks = await instanceUser.getTasks();
    res.status(200).send({ data: tasks });
  } catch (error) {
    next(error);
  }
};

//написать методы для обновления и удаления таски