import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postService } from '../services/api';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postService.getAllPosts();
        setPosts(response.data);
      } catch (err) {
        setError('Failed to fetch posts');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="loading">Loading posts...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h2>Latest Posts</h2>
      {posts.length === 0 ? (
        <p>No posts found. <Link to="/create">Create the first post!</Link></p>
      ) : (
        <div className="post-list">
          {posts.map(post => (
            <div key={post._id} className="post-card">
              <h3>
                <Link to={`/posts/${post._id}`}>{post.title}</Link>
              </h3>
              {post.excerpt && <p className="excerpt">{post.excerpt}</p>}
              <div className="meta">
                <span>By {post.author?.username || 'Unknown'}</span>
                <span> • </span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                {post.category && (
                  <>
                    <span> • </span>
                    <span>{post.category.name}</span>
                  </>
                )}
              </div>
              <Link to={`/posts/${post._id}`} className="btn">Read More</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
