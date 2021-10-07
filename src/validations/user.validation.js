const Joi = require('joi');
const { objectId } = require('./custom.validation');

const updateUser = {
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string(),
    phones: Joi.array()
      .items(
        Joi.string()
          .length(10)
          .pattern(/^[0-9]+$/)
      )
      .min(1),
    whatsAppNo: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/),
    address: Joi.object().keys({
      state: Joi.string().required(),
      city: Joi.string().required(),
      zipCode: Joi.string().required(),
      area: Joi.string().required(),
    }),
    avatar: Joi.string(),
    userType: Joi.string().valid('BUYER', 'FARMER', 'COMPANY'),
  }),
};

const addToWishList = {
  body: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
};

module.exports = {
  updateUser,
  addToWishList,
};
