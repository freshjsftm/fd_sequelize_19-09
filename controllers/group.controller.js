const _ = require("lodash");
const { Group, User } = require("../models");

module.exports.createGroup = async (req, res, next) => {
  try {
    const { body } = req;
    const values = _.pick(body, ["name", "imagePath", "description"]);
    const group = await Group.create(values);

    //связать юзера и группу с помощью магии
    const user = await User.findByPk(body.userId);

    await user.addGroup(group)

    res.status(201).send({ data: group });
  } catch (error) {
    next(error);
  }
};
