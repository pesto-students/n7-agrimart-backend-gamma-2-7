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
      type: Number,
      trim: true,
    },
    minimumOrderQuantity: {
      type: String,
    },
    productType: {
      on: {
        enum: ['SELL', 'RENT'],
        default: 'BUYER',
      },
      by: {
        enum: ['FARMER', 'COMPANY'],
        default: 'BUYER',
      },
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    comments: {
      post: {
        type: String,
        trim: true,
        required: true,
      },
      postAuther: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
      },
      dateOfPost: { type: Date, default: Date.now },
    },
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
  this.slug = `${slug(this.name)}-${Math.random().toString().slice(2, 11)}`;
};

/**
 * @typedef User
 */
const Product = mongoose.model('User', productSchema);

module.exports = Product;
