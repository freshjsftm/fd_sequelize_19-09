const { Task } = require("../models");

module.exports.createTask = async (req, res, next) => {
  try {
    const {
      body,
      params: { userId },
    } = req;
    const task = await Task.create({ ...body, userId });
    res.status(201).send({ data: task });
  } catch (error) {
    next(error);
  }
};
