const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createComment = {
  body: Joi.object().keys({
    product: Joi.required().custom(objectId),
    comment: Joi.string().required(),
  }),
};

const getCommentsByProduct = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createComment,
  getCommentsByProduct,
};
