# 🎬 CineCritic - Movie Rating API

A lightweight RESTful API for managing movie catalogs with ratings, categories, and featured status. Built with Node.js, Express.js, and MongoDB.

## 📋 Features

- ✅ Complete CRUD operations for movies
- ✅ Filter movies by category
- ✅ Get top-rated movies (rating ≥ 8.5)
- ✅ Robust validation and error handling
- ✅ Duplicate title prevention
- ✅ Custom middleware architecture
- ✅ Comprehensive logging

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **MongoDB Native Driver** - Database connectivity

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)

### Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/cinecritic-movie-api.git
cd cinecritic-movie-api
```

2. Install dependencies
```bash
npm install express mongodb
```

3. Start MongoDB server
```bash
mongod
```

4. Run the application
```bash
node server.js
```

The server will start on `http://localhost:4000`

## 🎯 API Endpoints

### Base URL
```
http://localhost:4000
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Welcome message |
| `POST` | `/api/movies` | Add a new movie |
| `GET` | `/api/movies` | Get all movies |
| `GET` | `/api/movies/top-rated` | Get top-rated movies (≥ 8.5) |
| `GET` | `/api/movies/category/:category` | Get movies by category |
| `GET` | `/api/movies/:id` | Get movie by ID |
| `PUT` | `/api/movies/:id` | Update movie details |
| `DELETE` | `/api/movies/:id` | Delete a movie |

## 📝 Movie Schema

```json
{
  "title": "String (required)",
  "category": "String (required)",
  "releaseYear": "Number (required, >= 1900)",
  "rating": "Number (required, 0-10)",
  "isFeatured": "Boolean (optional)"
}
```

## 🔍 Example Requests

### Add a New Movie
```bash
POST /api/movies
Content-Type: application/json

{
  "title": "Inception",
  "category": "Sci-Fi",
  "releaseYear": 2010,
  "rating": 8.8,
  "isFeatured": true
}
```

**Response:**
```json
{
  "message": "Movie added successfully",
  "id": "673080b5e8f9a1234567890a"
}
```

### Get All Movies
```bash
GET /api/movies
```

**Response:**
```json
[
  {
    "_id": "673080b5e8f9a1234567890a",
    "title": "Inception",
    "category": "Sci-Fi",
    "releaseYear": 2010,
    "rating": 8.8,
    "isFeatured": true
  }
]
```

### Get Top-Rated Movies
```bash
GET /api/movies/top-rated
```

### Get Movies by Category
```bash
GET /api/movies/category/Sci-Fi
```

### Update a Movie
```bash
PUT /api/movies/673080b5e8f9a1234567890a
Content-Type: application/json

{
  "title": "Inception Updated",
  "category": "Thriller",
  "releaseYear": 2010,
  "rating": 9.0,
  "isFeatured": true
}
```

### Delete a Movie
```bash
DELETE /api/movies/673080b5e8f9a1234567890a
```

## ✅ Validation Rules

- **title, category, releaseYear, rating** - Required fields
- **rating** - Must be between 0 and 10
- **releaseYear** - Must be 1900 or later
- **Duplicate titles** - Not allowed (case-insensitive)

## 🚨 Error Responses

### 400 Bad Request
```json
{
  "message": "Validation failed: Invalid rating or year."
}
```

### 404 Not Found
```json
{
  "message": "Movie not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

## 🧪 Testing with Postman

1. Import the Postman collection (coming soon)
2. Set base URL to `http://localhost:4000`
3. Test all endpoints with sample data

## 🏗️ Project Structure

```
cinecritic-movie-api/
│
├── server.js           # Main application file
├── package.json        # Dependencies
├── README.md          # Documentation
└── .gitignore         # Git ignore file
```

## 🔧 Middleware

### 1. Logger Middleware
Logs all incoming requests with method and URL

### 2. Validate Movie Middleware
Validates movie data before processing

### 3. Error Handler Middleware
Centralized error handling with proper status codes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Your Name - [GitHub Profile](https://github.com/yourusername)

## 🙏 Acknowledgments

- Built as part of CineCritic startup backend development
- Inspired by RESTful API best practices
- Thanks to the Node.js and MongoDB communities

---

Made with ❤️ for movie lovers everywhere 🍿