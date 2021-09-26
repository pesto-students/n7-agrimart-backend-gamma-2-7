const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services');

const getCategories = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['seller', 'productFor', 'SortBy']);
  let options = pick(req.query, ['limit', 'page']);

  if (!options.limit && !options.page) {
    options = null;
  }
  const result = await categoryService.queryCategories(filter, options);
  res.send(result);
});

const getCategory = catchAsync(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.categoryId);
  if (!category) {
    res.send(httpStatus.NOT_FOUND, 'Category not found');
  }
  res.send(category);
});

module.exports = {
  getCategories,
  getCategory,
};
