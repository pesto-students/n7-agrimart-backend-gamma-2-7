const { Review } = require('../models');

/**
 * Create a Review
 * @param {Object} reviewBody
 * @returns {Promise<Review>}
 */
const createReview = async (reviewBody, userId) => {
  // eslint-disable-next-line no-param-reassign
  reviewBody.reviewAuther = userId;
  const review = await Review.create(reviewBody);
  return review;
};

/**
 * Query for reviews
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getreviewsBySellerId = async (userId) => {
  const filter = { seller: userId };
  const reviews = await Review.find(filter);
  return reviews;
};

module.exports = {
  createReview,
  getreviewsBySellerId,
};
