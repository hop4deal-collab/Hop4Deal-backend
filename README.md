# Hop4Deals Backend Server

Node.js + Express backend server for the Hop4Deals application.

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create a `.env` file in the server directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/hop4deals
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ADMIN_EMAIL=admin@hop4deals.com
   ADMIN_PASSWORD=Admin@123
   ```

3. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

4. **Seed the database**
   ```bash
   npm run seed
   ```

## 📁 Project Structure

```
server/
├── config/           # Database configuration
├── controllers/      # Route controllers
├── middleware/       # Custom middleware
├── models/          # MongoDB models
├── routes/           # API routes
├── scripts/         # Database seeding
└── server.js        # Main server file
```

## 🔧 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### User Management (Admin Only)
- `GET /api/users` - Get all data entry users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Category Management
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create category (Auth + Privilege required)
- `PUT /api/categories/:id` - Update category (Auth + Privilege required)
- `DELETE /api/categories/:id` - Delete category (Admin only)

### Brand Management
- `GET /api/brands` - Get all brands
- `GET /api/brands/:id` - Get brand by ID
- `POST /api/brands` - Create brand (Auth + Privilege required)
- `PUT /api/brands/:id` - Update brand (Auth + Privilege required)
- `DELETE /api/brands/:id` - Delete brand (Admin only)

### Deal Management
- `GET /api/deals` - Get all deals
- `GET /api/deals/:id` - Get deal by ID
- `POST /api/deals` - Create deal (Auth + Privilege required)
- `PUT /api/deals/:id` - Update deal (Auth + Privilege required)
- `DELETE /api/deals/:id` - Delete deal (Admin only)

### Blog Management
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get blog by ID
- `POST /api/blogs` - Create blog (Auth + Privilege required)
- `PUT /api/blogs/:id` - Update blog (Auth + Privilege required)
- `DELETE /api/blogs/:id` - Delete blog (Admin only)

## 🛡️ Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Privilege-based module access
- Input validation
- CORS configuration

## 📊 Database Models

### User Model
```javascript
{
  email: String (unique, required)
  password: String (hashed, required)
  role: String (enum: ['admin', 'dataEntry'])
  privileges: {
    categories: Boolean
    brands: Boolean
    deals: Boolean
    blogs: Boolean
  }
  isActive: Boolean
  createdBy: ObjectId (ref: User)
  updatedBy: ObjectId (ref: User)
  timestamps: true
}
```

### Category Model
```javascript
{
  name: String (unique, required)
  description: String (required)
  isActive: Boolean
  createdBy: ObjectId (ref: User)
  updatedBy: ObjectId (ref: User)
  timestamps: true
}
```

### Brand Model
```javascript
{
  name: String (unique, required)
  description: String (required)
  logo: String
  tagline: String
  category: ObjectId (ref: Category)
  isActive: Boolean
  createdBy: ObjectId (ref: User)
  updatedBy: ObjectId (ref: User)
  timestamps: true
}
```

### Deal Model
```javascript
{
  brand: ObjectId (ref: Brand, required)
  startDate: Date (required)
  endDate: Date (required)
  code: String (unique, required)
  description: String (required)
  percentOff: Number (0-100, required)
  isActive: Boolean
  isHot: Boolean
  createdBy: ObjectId (ref: User)
  updatedBy: ObjectId (ref: User)
  timestamps: true
}
```

### Blog Model
```javascript
{
  headline: String (required)
  description: String (required)
  content: String (required)
  image: String
  isFeatured: Boolean
  isActive: Boolean
  createdBy: ObjectId (ref: User)
  updatedBy: ObjectId (ref: User)
  timestamps: true
}
```

## 🔐 Authentication Flow

1. User sends login credentials
2. Server validates credentials
3. Server generates JWT token
4. Client stores token and user info
5. Client sends token in Authorization header
6. Server validates token on protected routes

## 🛠️ Middleware

### authMiddleware
- Validates JWT token
- Attaches user to request object
- Handles token expiration

### roleMiddleware
- Checks user role (admin, dataEntry)
- Restricts access based on role

### privilegeMiddleware
- Checks user privileges for specific modules
- Allows access based on assigned privileges

## 🚀 Deployment

1. Set up MongoDB (local or Atlas)
2. Configure environment variables
3. Deploy to platforms like:
   - Heroku
   - DigitalOcean
   - AWS
   - Google Cloud

## 📝 Environment Variables

```env
NODE_ENV=development|production
PORT=5000
MONGO_URI=mongodb://localhost:27017/hop4deals
JWT_SECRET=your-super-secret-jwt-key
ADMIN_EMAIL=admin@hop4deals.com
ADMIN_PASSWORD=Admin@123
```

## 🧪 Testing

```bash
# Run tests (if implemented)
npm test

# Run with coverage
npm run test:coverage
```

## 📦 Dependencies

### Production
- express: Web framework
- mongoose: MongoDB ODM
- bcryptjs: Password hashing
- jsonwebtoken: JWT authentication
- cors: Cross-origin resource sharing
- dotenv: Environment variables
- multer: File uploads
- express-validator: Input validation

### Development
- nodemon: Development server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

