const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { productService, categoryService } = require('../services');

const createProduct = catchAsync(async (req, res) => {
  if (!req.user.isProfileCompleted) {
    return res.status(httpStatus.BAD_REQUEST).send('To add product first complete your profile');
  }
  const product = await productService.createProduct(req);
  res.status(httpStatus.CREATED).send(product);
});

const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'description', 'queryString', 'categories', 'productFor', 'seller']);
  let finalFilter = filter;
  let options = pick(req.query, ['sortBy', 'limit', 'page']);
  if (filter.title) {
    // eslint-disable-next-line security/detect-non-literal-regexp
    const regex = new RegExp(filter.title, 'i'); // i for case insensitive
    finalFilter.title = { $regex: regex };
  }
  if (filter.description) {
    // eslint-disable-next-line security/detect-non-literal-regexp
    const regex = new RegExp(filter.description, 'i'); // i for case insensitive
    finalFilter.description = { $regex: regex };
  }
  if (filter.categories && filter.queryString) {
    finalFilter = {
      $and: [{ categories: filter.categories }, { $regex: { $search: filter.queryString } }],
    };
  }
  if (filter.queryString) {
    finalFilter = { $text: { $search: filter.queryString } };
  }

  if (filter.productFor || filter.seller) {
    // eslint-disable-next-line no-shadow
    const options = null;
    const categories = await categoryService.queryCategories(filter, options);
    const categoriesId = categories.map((category) => category.id);
    finalFilter = {
      categories: { $in: [...categoriesId] },
    };
  }

  options.populate = 'categories, productOwner';
  const result = await productService.queryProducts(finalFilter, options);
  res.send(result);
});

const getProduct = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.productId);
  if (!product) {
    res.send(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.send(product);
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.updateUserById(req, res);
  res.send(product);
});

const deleteProduct = catchAsync(async (req, res) => {
  const product = await productService.deleteProductById(req, res);
  return res.send(httpStatus.OK, `Product with id ${product.id} successfully deleted.`);
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
