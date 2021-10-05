const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProduct = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.string(),
    minimumOrderQuantity: Joi.string(),
    images: Joi.array().items(Joi.string()),
    categories: Joi.array().items(Joi.custom(objectId)).required(),
  }),
};

const getProducts = {
  query: Joi.object().keys({
    queryString: Joi.string(),
    title: Joi.string(),
    description: Joi.string(),
    categories: Joi.string().custom(objectId),
    productFor: Joi.string().valid('SELL', 'RENT'),
    seller: Joi.string().valid('FARMER', 'COMPANY', 'BOTH'),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    minimumOrderQuantity: Joi.string(),
    images: Joi.array().items(Joi.string()),
    categories: Joi.array().items(Joi.custom(objectId)),
  }),
};

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
