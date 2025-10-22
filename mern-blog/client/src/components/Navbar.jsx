import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="navbar">
      <h1>MERN Blog</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/categories">Categories</Link></li>
          <li><Link to="/create" className="btn">Create Post</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
