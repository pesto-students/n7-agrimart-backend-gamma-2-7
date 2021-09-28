const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { commentService } = require('../services');

const createComment = catchAsync(async (req, res) => {
  if (!req.user) {
    return res.status(httpStatus.BAD_REQUEST).send('Login first, To comment on products');
  }
  const comment = await commentService.createComment(req.body, req.user.id);
  res.status(httpStatus.CREATED).send(comment);
});

const getCommentsByProduct = catchAsync(async (req, res) => {
  const comments = await commentService.getCommentsByProductId(req.params.productId);
  res.send(comments);
});

module.exports = {
  createComment,
  getCommentsByProduct,
};
