const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.user.id, req.file.path, req.body);
  res.status(httpStatus.CREATED).send(user);
});

module.exports = {
  updateUser,
};
