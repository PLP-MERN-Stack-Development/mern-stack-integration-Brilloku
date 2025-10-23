const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    maxlength: 200
  },
  color: {
    type: String,
    default: '#3B82F6'
  },
  postCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Create slug from name before saving
categorySchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }
  next();
});

// Update post count when posts are added/removed
categorySchema.methods.updatePostCount = async function() {
  const Post = mongoose.model('Post');
  this.postCount = await Post.countDocuments({ category: this._id, status: 'published' });
  await this.save();
};

module.exports = mongoose.model('Category', categorySchema);
