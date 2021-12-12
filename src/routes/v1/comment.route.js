const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const commentValidation = require('../../validations/comment.validation');
const commentController = require('../../controllers/comment.controller');

const router = express.Router();

// comments api
router.route('/').post(auth(), validate(commentValidation.createComment), commentController.createComment);

router.route('/:productId').get(validate(commentValidation.getCommentsByProduct), commentController.getCommentsByProduct);
module.exports = router;
