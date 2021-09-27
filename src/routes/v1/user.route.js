const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');
const upload = require('../../utils/upload');

const router = express.Router();
router.patch('/', auth(), validate(userValidation.updateUser), upload.single('avatar'), userController.updateUser);

// wishList api
router
  .route('/wishList')
  .patch(auth(), validate(userValidation.addToWishList), userController.addToWishList)
  .get(auth(), userController.getWishLists);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */

/**
 * @swagger
 * /users:
 *   patch:
 *     summary: Update a user
 *     description: Logged in users can only update their own information. Only admins can update other users.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *             example:
 *                name: fake name
 *                email: fake@example.com
 *                phones:
 *                   - '9845982192'
 *                whatsAppNo: '9845982192'
 *                address:
 *                   state: UP
 *                   city: Noida
 *                   zipCode: '394534'
 *                   area: Noida near some where
 *                userType: FARMER
 *
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 */
