const mongoose = require('mongoose');
const slug = require('slug');
const { toJSON, paginate } = require('./plugins');

const categorySchema = mongoose.Schema(
  {
    name: { type: String },
    slug: { type: String, unique: true, required: true },
    description: { type: String },
    icon: { type: String, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

categorySchema.pre('validate', function (next) {
  this.slug = slug(this.name);
  next();
});

/**
 * @typedef Category
 */
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
