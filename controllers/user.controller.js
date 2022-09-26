const { Op } = require("sequelize");
const createError = require("http-errors");
const _ = require('lodash');
const { User } = require("../models");

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const values = _.pick(body, ["firstName", "lastName", "email", "password", "birthday", "isMale"]);
    const createdUser = await User.create(values);
    if (!createdUser) {
      next(createError(400, "Try again!"))
    }
    const user = createdUser.get();
    user.password = undefined;
    res.status(201).send({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const {pagination = {}} = req;
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
        //include: [["last_name", "second"]]
      },
      ...pagination
      // where:{
      //   //email : "elon@musk.ua"
      //   id: { [Op.in]: [1,5,7] }
      // }
    });
    res.status(200).send({ data: users });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const {
      body,
      params: { userId },
    } = req;
    const [row, [updatedUser]] = await User.update(body, {
      where: {
        id: userId,
      },
      returning: true,
    });
    updatedUser.password = undefined;
    res.status(200).send({ data: updatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserInstance = async (req, res, next) => {
  try {
    const {
      body,
      instanceUser
    } = req;
    const updatedUser = await instanceUser.update(body, { returning: true });

    updatedUser.password = undefined;
    res.status(200).send({ data: updatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUserInstance = async (req, res, next) => {
  try {
    const {
      instanceUser
    } = req;    
    await instanceUser.destroy();
    res.status(200).send({ data: instanceUser });
  } catch (error) {
    next(error);
  }
};

//написать метод, который находит одного юзера по id
module.exports.getUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;
    const user = await User.findByPk(userId, {
      attributes: {
        exclude: ["password"],
      },
    });
    if (!user) {
      next(createError(404, "User not found!"))
    }
    user.password = undefined;
    res.status(200).send({ data: user });
  } catch (error) {
    next(error);
  }
};
