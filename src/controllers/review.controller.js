const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { reviewService } = require('../services');

const createReview = catchAsync(async (req, res) => {
  if (!req.user) {
    return res.status(httpStatus.BAD_REQUEST).send('Login first, To give review to seller');
  }
  if (!req.user.isEmailVerified) {
    return res.status(httpStatus.BAD_REQUEST).send('To add comment first very your account');
  }
  const review = await reviewService.createReview(req.body, req.user.id);
  res.status(httpStatus.CREATED).send(review);
});

const getReviewsBySeller = catchAsync(async (req, res) => {
  const reviews = await reviewService.getreviewsBySellerId(req.params.sellerId);
  const allRatings = reviews.map((review) => review.rating);
  let count = 0;

  allRatings.forEach(function (value) {
    count += value;
  });

  const averageRating = count / allRatings.length;
  res.send({ reviews, averageRating });
});

module.exports = {
  createReview,
  getReviewsBySeller,
};
