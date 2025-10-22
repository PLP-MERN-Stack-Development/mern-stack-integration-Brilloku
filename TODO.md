# MERN Blog Application Development TODO

## Phase 1: Project Setup
- [x] Create server/package.json with dependencies (express, mongoose, cors, dotenv, bcryptjs, jsonwebtoken, express-validator, multer)
- [x] Create client/package.json with dependencies (react, react-dom, axios, react-router-dom, react-hook-form, @vitejs/plugin-react)
- [x] Create server/.env with MONGODB_URI, PORT, JWT_SECRET
- [x] Create client/.env with VITE_API_URL
- [x] Create missing directories: server/routes, server/controllers, server/models, server/middleware, server/utils, client/src/components, client/src/pages, client/src/hooks, client/src/context
- [x] Set up MongoDB connection in server
- [x] Set up React app with Vite in client (create vite.config.js for proxy)

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
- [x] Create src/App.jsx with React Router setup
- [x] Create components/Navbar.jsx
- [x] Create components/Layout.jsx
- [x] Create components/PostList.jsx
- [x] Create components/PostDetail.jsx
- [x] Create components/PostForm.jsx
- [x] Create components/CategoryList.jsx
- [x] Create pages/Home.jsx
- [x] Create pages/Post.jsx
- [x] Create pages/CreatePost.jsx
- [x] Create pages/EditPost.jsx
- [x] Create pages/Categories.jsx
- [x] Create hooks/usePosts.js
- [x] Create hooks/useCategories.js
- [x] Create hooks/useAuth.js
- [x] Create context/AuthContext.jsx

## Phase 4: Integration and Data Flow
- [x] Integrate API service in components using hooks
- [x] Implement forms with validation in PostForm
- [x] Add state management for posts/categories in components
- [x] Handle loading/error states in components
- [x] Implement optimistic updates for better UX

## Phase 5: Advanced Features
- [x] Add auth: Login/Register forms and protected routes
- [x] Implement image uploads (multer on server, file input on client)
- [x] Add pagination to PostList
- [x] Implement search/filtering functionality
- [x] Add comments feature (update Post model, add endpoints, UI)

## Testing and Documentation
- [x] Install dependencies and test server/client setup
- [x] Test API endpoints with Postman
- [x] Test UI and API integration
- [x] Update README.md with setup instructions, API docs, features, screenshots
