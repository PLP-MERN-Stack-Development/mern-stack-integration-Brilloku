const express = require('express');
const { body, param, validationResult } = require('express-validator');
const Post = require('../models/Post');
const Category = require('../models/Category');
const auth = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const validatePost = [
  body('title').trim().isLength({ min: 1, max: 100 }).withMessage('Title is required and must be less than 100 characters'),
  body('content').trim().isLength({ min: 1 }).withMessage('Content is required'),
  body('category').isMongoId().withMessage('Valid category ID is required'),
  body('excerpt').optional().isLength({ max: 300 }).withMessage('Excerpt must be less than 300 characters'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('status').optional().isIn(['draft', 'published']).withMessage('Status must be draft or published')
];

// Get all posts
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, status = 'published', search } = req.query;

    const query = { status };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const posts = await Post.find(query)
      .populate('category', 'name slug color')
      .populate('author', 'username firstName lastName avatar')
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await Post.countDocuments(query);

    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('category', 'name slug color')
      .populate('author', 'username firstName lastName avatar')
      .populate('likes', 'username firstName lastName avatar');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Increment view count
    post.views += 1;
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create post
router.post('/', auth, validatePost, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, category, excerpt, tags, status } = req.body;

    // Verify category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    const post = new Post({
      title,
      content,
      category,
      excerpt,
      tags: tags || [],
      status: status || 'draft',
      author: req.user.id
    });

    await post.save();

    // Update category post count
    await categoryExists.updatePostCount();

    const populatedPost = await Post.findById(post._id)
      .populate('category', 'name slug color')
      .populate('author', 'username firstName lastName avatar');

    res.status(201).json(populatedPost);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Post with this title already exists' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update post
router.put('/:id', auth, validatePost, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is the author or admin
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    const { title, content, category, excerpt, tags, status } = req.body;

    // Verify category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    const oldCategory = post.category.toString();

    post.title = title;
    post.content = content;
    post.category = category;
    post.excerpt = excerpt;
    post.tags = tags || [];
    post.status = status || post.status;

    await post.save();

    // Update post counts for categories
    if (oldCategory !== category) {
      const oldCategoryDoc = await Category.findById(oldCategory);
      if (oldCategoryDoc) await oldCategoryDoc.updatePostCount();
      await categoryExists.updatePostCount();
    }

    const updatedPost = await Post.findById(post._id)
      .populate('category', 'name slug color')
      .populate('author', 'username firstName lastName avatar');

    res.json(updatedPost);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Post with this title already exists' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is the author or admin
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    const categoryId = post.category;

    await Post.findByIdAndDelete(req.params.id);

    // Update category post count
    const category = await Category.findById(categoryId);
    if (category) await category.updatePostCount();

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Like/Unlike post
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const userId = req.user.id;
    const likeIndex = post.likes.indexOf(userId);

    if (likeIndex > -1) {
      // Unlike
      post.likes.splice(likeIndex, 1);
    } else {
      // Like
      post.likes.push(userId);
    }

    await post.save();

    res.json({
      likes: post.likes.length,
      isLiked: likeIndex === -1
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
