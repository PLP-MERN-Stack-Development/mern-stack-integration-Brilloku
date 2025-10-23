# MERN Blog Application

A full-stack blog application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring user authentication, post management, categories, and a modern UI with Tailwind CSS.

## Features

### User Management
- User registration and login with JWT authentication
- Profile management with avatar support
- Role-based access control (user/admin)

### Blog Functionality
- Create, read, update, and delete blog posts
- Rich text content with categories
- Post search and filtering by category
- View tracking and like system
- Responsive design for all devices

### Categories
- Predefined categories: Education, Technology, Gaming, Lifestyle, Business
- Dynamic category management
- Post count tracking per category

### Technical Features
- RESTful API with Express.js
- MongoDB database with Mongoose ODM
- React frontend with TypeScript
- Tailwind CSS for styling
- Vite for fast development
- File upload support (planned for images)
- Input validation and error handling

## Tech Stack

### Frontend
- React 18 with TypeScript
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- Vite for build tooling

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Multer for file uploads
- Express Validator for input validation

### Development Tools
- ESLint for code linting
- TypeScript for type safety
- Nodemon for development server
- Concurrently for running multiple processes

## Project Structure

```
mern-blog/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   ├── pages/         # Page components
│   │   └── main.tsx       # App entry point
│   ├── package.json
│   └── vite.config.ts
├── server/                 # Express backend
│   ├── middleware/        # Custom middleware
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── server.js         # Server entry point
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mern-blog
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Set up the backend**
   ```bash
   cd server
   npm install
   ```

4. **Set up the frontend**
   ```bash
   cd ../client
   npm install
   cd ..
   ```

5. **Environment Configuration**

   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mern-blog
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=development
   ```

6. **Seed the database (optional)**
   ```bash
   cd server
   node seedCategories.js
   ```

### Running the Application

1. **Start the development servers**
   ```bash
   npm run dev
   ```
   This will start both the backend (port 5000) and frontend (port 5173) servers concurrently.

2. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

### Alternative: Run servers separately

**Backend:**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
cd client
npm run dev
```

## API Documentation

### Authentication Endpoints

#### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "username": "johndoe",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user"
  }
}
```

#### POST /api/auth/login
Authenticate user login.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### GET /api/auth/profile
Get current user profile (requires authentication).

#### PUT /api/auth/profile
Update user profile (requires authentication).

### Posts Endpoints

#### GET /api/posts
Get all posts with optional filtering.

**Query Parameters:**
- `category`: Filter by category ID
- `search`: Search in post titles and content
- `page`: Page number for pagination
- `limit`: Number of posts per page

**Response:**
```json
{
  "posts": [
    {
      "_id": "post-id",
      "title": "Sample Post",
      "excerpt": "Post excerpt...",
      "slug": "sample-post",
      "content": "Full post content...",
      "category": {
        "name": "Technology",
        "color": "#3B82F6"
      },
      "author": {
        "username": "johndoe",
        "firstName": "John",
        "lastName": "Doe"
      },
      "publishedAt": "2024-01-15T10:00:00.000Z",
      "views": 150,
      "likes": ["user-id-1", "user-id-2"]
    }
  ],
  "totalPages": 5,
  "currentPage": 1
}
```

#### GET /api/posts/:id
Get a specific post by ID.

#### POST /api/posts
Create a new post (requires authentication).

#### PUT /api/posts/:id
Update an existing post (requires authentication, author only).

#### DELETE /api/posts/:id
Delete a post (requires authentication, author only).

### Categories Endpoints

#### GET /api/categories
Get all categories.

**Response:**
```json
[
  {
    "_id": "category-id",
    "name": "Technology",
    "slug": "technology",
    "color": "#3B82F6",
    "postCount": 25
  }
]
```

#### POST /api/categories
Create a new category (admin only).

#### PUT /api/categories/:id
Update a category (admin only).

#### DELETE /api/categories/:id
Delete a category (admin only).

## Features Implemented

### ✅ Completed Features

1. **User Authentication**
   - JWT-based authentication
   - Registration and login forms
   - Protected routes
   - Profile management

2. **Blog Post Management**
   - Create posts with rich content
   - Edit and delete own posts
   - View post details
   - Post listing with pagination

3. **Categories System**
   - Predefined categories
   - Category filtering
   - Post count tracking

4. **UI/UX**
   - Responsive design
   - Modern gradient styling
   - Loading states
   - Error handling

5. **API Development**
   - RESTful endpoints
   - Input validation
   - Error handling
   - Authentication middleware

### 🚧 Planned Features

- Image upload for posts and avatars
- Comments system
- Social sharing
- Admin dashboard
- Email notifications
- Advanced search and filtering

## Development Scripts

### Root Level
- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build the application for production

### Backend (server/)
- `npm run dev` - Start Express server with nodemon
- `npm start` - Start Express server in production mode

### Frontend (client/)
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with the MERN stack
- Styled with Tailwind CSS
- Icons and UI components inspired by modern web design trends
