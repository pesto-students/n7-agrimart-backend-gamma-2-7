const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const commentSchema = mongoose.Schema({
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
});

// add plugin that converts mongoose to json
commentSchema.plugin(toJSON);
commentSchema.plugin(paginate);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
