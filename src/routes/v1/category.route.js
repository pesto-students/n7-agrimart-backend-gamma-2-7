const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const categoryValidation = require('../../validations/category.validation');
const categoryController = require('../../controllers/category.controller');

const router = express.Router();

router.route('/').get(auth(), validate(categoryValidation.getCategories), categoryController.getCategories);

router.route('/:categoryId').get(auth(), validate(categoryValidation.getCategory), categoryController.getCategory);

module.exports = router;
