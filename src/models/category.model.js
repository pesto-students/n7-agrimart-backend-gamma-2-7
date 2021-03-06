const mongoose = require('mongoose');
const slug = require('slug');
const { toJSON, paginate } = require('./plugins');

const categorySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    seller: {
      type: String,
      required: true,
      enum: ['FARMER', 'COMPANY', 'BOTH'],
      index: true,
      default: 'FARMER',
    },
    productFor: {
      type: String,
      required: true,
      enum: ['SELL', 'RENT'],
      index: true,
      default: 'SELL',
    },
    icon: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

categorySchema.index({ seller: 'text' });
categorySchema.index({ productFor: 'text' });

// add plugin that converts mongoose to json
categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

categorySchema.pre('validate', function (next) {
  this.slug = slug(`${this.name}-on${this.productFor}-by${this.seller}`);
  next();
});

/**
 * @typedef Category
 */
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
