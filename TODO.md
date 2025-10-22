# MERN Blog Application Development TODO

## Phase 1: Project Setup
- [x] Create server/package.json with dependencies (express, mongoose, cors, dotenv, bcryptjs, jsonwebtoken, express-validator, multer)
- [x] Create client/package.json with dependencies (react, react-dom, axios, react-router-dom, react-hook-form, @vitejs/plugin-react)
- [x] Create server/.env with MONGODB_URI, PORT, JWT_SECRET
- [x] Create client/.env with VITE_API_URL
- [x] Create missing directories: server/routes, server/controllers, server/models, server/middleware, server/utils, client/src/components, client/src/pages, client/src/hooks, client/src/context
- [ ] Set up MongoDB connection in server
- [x] Set up React app with Vite in client (create vite.config.js for proxy, index.html, main.jsx, index.css)

## Phase 2: Back-End Development
- [x] Create models/Category.js (Mongoose model for categories)
- [x] Create models/User.js (Mongoose model for users with auth)
- [x] Create controllers/posts.js (CRUD logic for posts, validation)
- [x] Create controllers/categories.js (CRUD logic for categories)
- [x] Create controllers/auth.js (register, login, JWT)
- [x] Create routes/posts.js (API endpoints for posts)
- [x] Create routes/categories.js (API endpoints for categories)
- [x] Create routes/auth.js (API endpoints for auth)
- [x] Create middleware/auth.js (JWT authentication middleware)
- [x] Create middleware/errorHandler.js (error handling middleware)
- [x] Create utils/jwt.js (JWT utility functions)
- [x] Update server/server.js to import and use new routes/controllers/middleware

## Phase 3: Front-End Development
- [ ] Create src/App.jsx with React Router setup
- [ ] Create components/Navbar.jsx
- [ ] Create components/Layout.jsx
- [ ] Create components/PostList.jsx
- [ ] Create components/PostDetail.jsx
- [ ] Create components/PostForm.jsx
- [ ] Create components/CategoryList.jsx
- [ ] Create pages/Home.jsx
- [ ] Create pages/Post.jsx
- [ ] Create pages/CreatePost.jsx
- [ ] Create pages/EditPost.jsx
- [ ] Create pages/Categories.jsx
- [ ] Create hooks/usePosts.js
- [ ] Create hooks/useCategories.js
- [ ] Create hooks/useAuth.js
- [ ] Create context/AuthContext.jsx

## Phase 4: Integration and Data Flow
- [ ] Integrate API service in components using hooks
- [ ] Implement forms with validation in PostForm
- [ ] Add state management for posts/categories in components
- [ ] Handle loading/error states in components
- [ ] Implement optimistic updates for better UX

## Phase 5: Advanced Features
- [ ] Add auth: Login/Register forms and protected routes
- [ ] Implement image uploads (multer on server, file input on client)
- [ ] Add pagination to PostList
- [ ] Implement search/filtering functionality
- [ ] Add comments feature (update Post model, add endpoints, UI)

## Testing and Documentation
- [ ] Install dependencies and test server/client setup
- [ ] Test API endpoints with Postman
- [ ] Test UI and API integration
- [ ] Update README.md with setup instructions, API docs, features, screenshots
