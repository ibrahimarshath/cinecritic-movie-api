const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(express.json());

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);
const dbName = 'cineCriticDB';

let db, movies;

async function connectDB() {
  try {
    await client.connect();
    console.log('🎬 Connected to MongoDB');
    db = client.db(dbName);
    movies = db.collection('movies');
    await movies.createIndex({ title: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}
connectDB();

// ==================== MIDDLEWARE ====================

// 1. Logger Middleware
function loggerMiddleware(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

// 2. Validate Movie Middleware
function validateMovieMiddleware(req, res, next) {
  const { title, category, releaseYear, rating } = req.body;

  if (!title || !category || releaseYear === undefined || rating == null) {
    return res.status(400).json({ message: 'Validation failed: Invalid rating or year.' });
  }

  if (rating < 0 || rating > 10 || releaseYear < 1900) {
    return res.status(400).json({ message: 'Validation failed: Invalid rating or year.' });
  }

  next();
}

// 3. Error Handler Middleware
function errorHandlerMiddleware(err, req, res, next) {
  console.error('Error:', err);
  
  if (err.code === 11000) {
    return res.status(400).json({ message: 'Duplicate title not allowed.' });
  }
  
  res.status(500).json({ message: 'Internal server error' });
}

app.use(loggerMiddleware);

// ==================== ROUTES ====================

app.get('/', (req, res) => {
  res.send('Welcome to CineCritic - Movie Rating API 🎥');
});

// Add new movie
app.post('/api/movies', validateMovieMiddleware, async (req, res, next) => {
  try {
    const { title, category, releaseYear, rating, isFeatured } = req.body;
    const result = await movies.insertOne({ 
      title, 
      category, 
      releaseYear, 
      rating, 
      isFeatured: !!isFeatured 
    });
    res.status(201).json({ message: 'Movie added successfully', id: result.insertedId });
  } catch (err) {
    next(err);
  }
});

// Get all movies
app.get('/api/movies', async (req, res) => {
  const all = await movies.find().toArray();
  res.status(200).json(all);
});

// Top-rated movies (rating >= 8.5)
app.get('/api/movies/top-rated', async (req, res) => {
  const top = await movies.find({ rating: { $gte: 8.5 } }).toArray();
  res.status(200).json(top);
});

// Movies by category
app.get('/api/movies/category/:category', async (req, res) => {
  const cat = req.params.category;
  const filtered = await movies.find({ category: { $regex: `^${cat}$`, $options: 'i' } }).toArray();
  res.status(200).json(filtered);
});

// Get movie by ID
app.get('/api/movies/:id', async (req, res) => {
  try {
    const movie = await movies.findOne({ _id: new ObjectId(req.params.id) });
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.status(200).json(movie);
  } catch {
    res.status(400).json({ message: 'Invalid ID format' });
  }
});

// Update movie details
app.put('/api/movies/:id', validateMovieMiddleware, async (req, res, next) => {
  try {
    const { title, category, releaseYear, rating, isFeatured } = req.body;
    const result = await movies.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { title, category, releaseYear, rating, isFeatured } }
    );

    if (result.matchedCount === 0)
      return res.status(404).json({ message: 'Movie not found' });

    res.json({ message: 'Movie updated successfully' });
  } catch (err) {
    next(err);
  }
});

// Delete a movie
app.delete('/api/movies/:id', async (req, res) => {
  try {
    const result = await movies.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0)
      return res.status(404).json({ message: 'Movie not found' });
    res.json({ message: 'Movie deleted successfully' });
  } catch {
    res.status(400).json({ message: 'Invalid ID format' });
  }
});

app.use(errorHandlerMiddleware);

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});