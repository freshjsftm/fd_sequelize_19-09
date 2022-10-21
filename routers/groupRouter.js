const path = require('path');
const { Router } = require('express');
const multer = require('multer');
const GroupController = require('../controllers/group.controller');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../public/images'));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

const groupRouter = Router();

groupRouter.post('/', GroupController.createGroup);
groupRouter.get('/:groupId', GroupController.getUsersFromGroup);
groupRouter.patch('/:groupId', GroupController.addUserAtGroup);

groupRouter.post(
  '/:groupId/image',
  upload.single('image'),
  GroupController.addGroupImage
);

module.exports = groupRouter;
