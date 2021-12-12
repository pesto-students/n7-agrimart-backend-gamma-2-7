const { Comment } = require('../models');

/**
 * Create a Comment
 * @param {Object} commentBody
 * @returns {Promise<Comment>}
 */
const createComment = async (commentBody, userId) => {
  // eslint-disable-next-line no-param-reassign
  commentBody.commentAuther = userId;
  const comment = await Comment.create(commentBody);
  return comment;
};

/**
 * Query for comments
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getCommentsByProductId = async (productId) => {
  const filter = { product: productId };
  const comments = await Comment.find(filter);
  return comments;
};

module.exports = {
  createComment,
  getCommentsByProductId,
};
