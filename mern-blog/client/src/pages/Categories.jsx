import React, { useState, useEffect } from 'react';
import { categoryService } from '../services/api';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getAllCategories();
        setCategories(response.data);
      } catch (err) {
        setError('Failed to fetch categories');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div className="loading">Loading categories...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h2>Categories</h2>
      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <div className="categories-list">
          {categories.map(category => (
            <div key={category._id} className="category-card">
              <h3>{category.name}</h3>
              {category.description && <p>{category.description}</p>}
              <div className="category-meta">
                <span>Color: {category.color}</span>
                <span> • </span>
                <span>Created: {new Date(category.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
