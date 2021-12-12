const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const reviewValidation = require('../../validations/review.validation');
const reviewController = require('../../controllers/review.controller');

const router = express.Router();

// review api
router.route('/').post(auth(), validate(reviewValidation.createReview), reviewController.createReview);

router.route('/:sellerId').get(validate(reviewValidation.getReviewsBySeller), reviewController.getReviewsBySeller);
module.exports = router;
