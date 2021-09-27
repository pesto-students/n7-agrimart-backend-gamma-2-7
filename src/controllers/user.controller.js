const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req, res);
  res.status(httpStatus.CREATED).send(user);
});

const addToWishList = catchAsync(async (req, res) => {
  if (!req.user) {
    return res.status(httpStatus.BAD_REQUEST).send('Login first, To add product in wishList');
  }
  const user = await userService.updateWishList(req);
  res.status(httpStatus.CREATED).send({ products: user.wishListProducts });
});

const getWishLists = catchAsync(async (req, res) => {
  if (!req.user) {
    return res.status(httpStatus.BAD_REQUEST).send('Login first, To get wishList');
  }
  const user = await userService.getUserById(req.user.id);
  res.send({ products: user.wishListProducts });
});

module.exports = {
  updateUser,
  addToWishList,
  getWishLists,
};
