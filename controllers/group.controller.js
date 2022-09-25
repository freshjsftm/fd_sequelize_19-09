const _ = require("lodash");
const createError = require("http-errors");
const { Group, User } = require("../models");

module.exports.addGroupImage = async (req, res, next) =>{
  try {
    const { params: {groupId}, file: {filename} } = req;
    const [row, [updatedGroup]] = await Group.update(
      {imagePath : filename},
      {
        where: {id: groupId},
        returning: true
      }
    )
    res.status(200).send({data: updatedGroup})
  } catch (error) {
    next(error)
  }
}

module.exports.createGroup = async (req, res, next) => {
  try {
    const { body } = req;
    const values = _.pick(body, ["name", "imagePath", "description"]);
    const group = await Group.create(values);
    if(!group){
      next(createError(400, 'Group not created!'))
    }
    //связать юзера и группу с помощью магии
    const user = await User.findByPk(body.userId);
    if(!user){
      next(createError(404, 'User not found!'))
    }

    await user.addGroup(group);

    res.status(201).send({ data: group });
  } catch (error) {
    next(error);
  }
};

module.exports.getUsersFromGroup = async (req, res, next) => {
  try {
    const {params: {groupId}} = req;
    const group = await Group.findByPk(groupId, {
      include:[{
        model: User,
        attributes: ['id', 'email', 'firstName'],
        through : {
          attributes: []
        }
      }]
    })
    if(!group){
      next(createError(404, 'Group not found'))
    }
    res.status(200).send({data: group})
  } catch (error) {
    next(error)
  }
}

module.exports.addUserAtGroup = async(req,res,next) => {
  try {
    const {params: {groupId}, body : {userId}} = req;
    const group = await Group.findByPk(groupId);
    if(!group){
      next(createError(404, 'Group not found'))
    }
    const user = await User.findByPk(userId);
    if(!user){
      next(createError(404, 'User not found'))
    }
    await group.addUser(user);
    res.status(200).send({data: group})
  } catch (error) {
    next(error)
  }
}