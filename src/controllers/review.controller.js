const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { reviewService } = require('../services');

const createReview = catchAsync(async (req, res) => {
  if (!req.user) {
    return res.status(httpStatus.BAD_REQUEST).send('Login first, To give review to seller');
  }
  const review = await reviewService.createReview(req.body, req.user.id);
  res.status(httpStatus.CREATED).send(review);
});

const getReviewsBySeller = catchAsync(async (req, res) => {
  const reviews = await reviewService.getreviewsBySellerId(req.params.sellerId);
  res.send(reviews);
});

module.exports = {
  createReview,
  getReviewsBySeller,
};
