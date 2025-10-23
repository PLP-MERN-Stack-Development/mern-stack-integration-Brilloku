const mongoose = require('mongoose');
const Category = require('./models/Category');
require('dotenv').config();

const categories = [
  {
    name: 'Education',
    description: 'Educational content, tutorials, and learning resources',
    color: '#10B981'
  },
  {
    name: 'Technology',
    description: 'Latest tech news, programming, and innovation',
    color: '#3B82F6'
  },
  {
    name: 'Gaming',
    description: 'Video games, gaming culture, and entertainment',
    color: '#8B5CF6'
  },
  {
    name: 'Lifestyle',
    description: 'Health, wellness, fashion, and daily life tips',
    color: '#F59E0B'
  },
  {
    name: 'Business',
    description: 'Entrepreneurship, finance, and career advice',
    color: '#EF4444'
  }
];

async function seedCategories() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-blog', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing categories
    await Category.deleteMany({});
    console.log('Cleared existing categories');

    // Insert new categories
    const insertedCategories = await Category.insertMany(categories);
    console.log('Inserted categories:', insertedCategories.map(cat => cat.name));

    console.log('Categories seeded successfully!');
  } catch (error) {
    console.error('Error seeding categories:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

seedCategories();
