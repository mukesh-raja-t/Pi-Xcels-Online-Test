const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const rawData = fs.readFileSync(path.join(__dirname, 'movies_metadata.json'));
let movies = JSON.parse(rawData);

movies = movies.filter(m => m.id && m.title);

app.get('/api/movies', (req, res) => {
  const movieList = movies.map(movie => ({
    id: movie.id,
    title: movie.title,
    tagline: movie.tagline,
    vote_average: Number(movie.vote_average)
  }));
  res.json(movieList);
});

app.get('/api/movies/:id', (req, res) => {
  const movie = movies.find(m => String(m.id) === req.params.id);
  if (!movie) {
    return res.status(404).json({ message: 'Movie not found' });
  }
  res.json(movie);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
