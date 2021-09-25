const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getCategories = {
  query: Joi.object().keys({
    seller: Joi.string().valid('FARMER', 'COMPANY', 'BOTH'),
    for: Joi.string().valid('SELL', 'RENT', 'BOTH'),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  getCategories,
  getCategory,
};
