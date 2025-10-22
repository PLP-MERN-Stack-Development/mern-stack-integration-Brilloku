import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { postService } from '../services/api';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await postService.getPost(id);
        setPost(response.data);
      } catch (err) {
        setError('Failed to fetch post');
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <div className="loading">Loading post...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!post) return <div className="error">Post not found</div>;

  return (
    <div>
      <article>
        <h1>{post.title}</h1>
        <div className="post-meta">
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
        {post.featuredImage && (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="featured-image"
          />
        )}
        <div className="post-content">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="tags">
            <strong>Tags:</strong> {post.tags.join(', ')}
          </div>
        )}
      </article>
      <div className="post-actions">
        <Link to="/" className="btn btn-secondary">← Back to Posts</Link>
        <Link to={`/edit/${post._id}`} className="btn">Edit Post</Link>
      </div>
    </div>
  );
};

export default Post;
