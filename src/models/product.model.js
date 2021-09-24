const mongoose = require('mongoose');
const slug = require('slug');
const { toJSON, paginate } = require('./plugins');

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: { type: String, required: true },
    slug: { type: String, lowercase: true, unique: true, required: true },
    price: {
      type: String,
      trim: true,
    },
    minimumOrderQuantity: {
      type: String,
    },
    productOn: {
      type: String,
      enum: ['SELL', 'RENT'],
      default: 'SELL',
      required: true,
    },
    productBy: {
      type: String,
      enum: ['FARMER', 'COMPANY'],
      default: 'FARMER',
      required: true,
    },
    comments: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Comment',
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    productOwner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    categories: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Category' }],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

productSchema.pre('validate', function (next) {
  if (!this.slug) {
    this.slugify();
  }
  next();
});

productSchema.methods.slugify = function () {
  this.slug = slug(this.title + this.id);
};

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
