const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createReview = {
  body: Joi.object().keys({
    seller: Joi.required().custom(objectId),
    review: Joi.string().required(),
    rating: Joi.number().required().min(1).max(5),
  }),
};

const getReviewsBySeller = {
  params: Joi.object().keys({
    sellerId: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createReview,
  getReviewsBySeller,
};
