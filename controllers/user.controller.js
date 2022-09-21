const { Op } = require("sequelize");
const { User } = require("../models");

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const createdUser = await User.create(body);
    createdUser.password = undefined;
    res.status(201).send({ data: createdUser });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
        //include: [["last_name", "second"]]
      },
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
      params: { userId },
    } = req;
    const userInstance = await User.findByPk(userId);
    const updatedUser = await userInstance.update(body, { returning: true });
    updatedUser.password = undefined;
    res.status(200).send({ data: updatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUserInstance = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;
    const userInstance = await User.findByPk(userId);
    await userInstance.destroy();
    res.status(200).send({ data: userInstance });
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
    user.password = undefined;
    res.status(200).send({ data: user });
  } catch (error) {
    next(error);
  }
};
