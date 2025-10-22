// categories.js - Categories routes

const express = require('express');
const { body } = require('express-validator');
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const categoryValidation = [
  body('name')
    .isLength({ min: 1, max: 50 })
    .withMessage('Category name must be between 1 and 50 characters'),
  body('description')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Description cannot be more than 200 characters'),
  body('color')
    .optional()
    .matches(/^#[0-9A-F]{6}$/i)
    .withMessage('Color must be a valid hex color code'),
];

// Routes
router
  .route('/')
  .get(getCategories)
  .post(protect, authorize('admin'), categoryValidation, createCategory);

router
  .route('/:id')
  .get(getCategory)
  .put(protect, authorize('admin'), categoryValidation, updateCategory)
  .delete(protect, authorize('admin'), deleteCategory);

module.exports = router;
