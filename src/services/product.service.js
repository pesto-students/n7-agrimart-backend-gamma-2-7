const httpStatus = require('http-status');
const { Product } = require('../models');

/**
 * Create a product
 * @param {Object} productBody
 * @returns {Promise<Product>}
 */
const createProduct = async (req) => {
  const userId = req.user.id;
  const productBody = req.body;
  let images = req.files;

  if (images) {
    images = images.map((image) => {
      return `${process.env.URL}/${image.filename}`;
    });
    productBody.images = images;
  }
  productBody.productOwner = userId;

  const product = await Product.create(productBody);
  return product;
};

/**
 * Query for products
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryProducts = async (filter, options) => {
  const products = await Product.paginate(filter, options);
  return products;
};

/**
 * Get product by id
 * @param {ObjectId} id
 * @returns {Promise<Product>}
 */
const getProductById = async (id) => {
  return Product.findById(id).populate('productOwner');
};

/**
 * Update product by id
 * @param {ObjectId} productId
 * @param {Object} productBody
 * @returns {Promise<Product>}
 */
const updateUserById = async (req, res) => {
  const { productId } = req.params;
  const updateBody = req.body;
  const product = await getProductById(productId);
  if (!product) {
    return res.send(httpStatus.NOT_FOUND, 'Product not found');
  }
  if (!product.productOwner.equals(req.user.id)) {
    return res.send(httpStatus.FORBIDDEN, 'User not authorized');
  }
  let images = req.files;

  if (images) {
    images = images.map((image) => {
      return `${process.env.URL}/${image.filename}`;
    });
    updateBody.images = images;
  }

  Object.assign(product, updateBody);
  await product.save();
  return product;
};

/**
 * Delete product by id
 * @param {ObjectId} productId
 * @returns {Promise<Product>}
 */
const deleteProductById = async (req, res) => {
  const { productId } = req.params;
  const product = await getProductById(productId);
  if (!product) {
    return res.send(httpStatus.NOT_FOUND, 'Product not found');
  }
  if (!product.productOwner.equals(req.user.id)) {
    return res.send(httpStatus.FORBIDDEN, 'User not authorized');
  }
  await product.remove();
  return product;
};

module.exports = {
  createProduct,
  queryProducts,
  getProductById,
  updateUserById,
  deleteProductById,
};
