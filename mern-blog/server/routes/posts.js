// posts.js - Posts routes

const express = require('express');
const { body } = require('express-validator');
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment,
  searchPosts,
} = require('../controllers/posts');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const postValidation = [
  body('title')
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('content').notEmpty().withMessage('Content is required'),
  body('category').isMongoId().withMessage('Please provide a valid category ID'),
  body('excerpt')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Excerpt cannot be more than 200 characters'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('isPublished')
    .optional()
    .isBoolean()
    .withMessage('isPublished must be a boolean'),
];

const commentValidation = [
  body('content')
    .isLength({ min: 1, max: 500 })
    .withMessage('Comment must be between 1 and 500 characters'),
];

// Routes
router.route('/').get(getPosts).post(protect, postValidation, createPost);

router.route('/search').get(searchPosts);

router
  .route('/:id')
  .get(getPost)
  .put(protect, postValidation, updatePost)
  .delete(protect, deletePost);

router.route('/:id/comments').post(protect, commentValidation, addComment);

module.exports = router;
