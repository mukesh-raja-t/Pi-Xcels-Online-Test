import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/movies')
      .then(res => res.json())
      .then(data => setMovies(data));
  }, []);

  if (selectedMovie) {
    const releaseDate = new Date(selectedMovie.release_date).toLocaleDateString();
    return (
      <div className="container">
        <button onClick={() => setSelectedMovie(null)}>⬅ Back to list</button>
        <h2>{selectedMovie.title}</h2>
        <p><strong>Tagline:</strong> {selectedMovie.tagline}</p>
        <p><strong>Overview:</strong> {selectedMovie.overview}</p>
        <p><strong>Vote Average:</strong> {selectedMovie.vote_average}/10</p>
        <p><strong>Release Date:</strong> {releaseDate}</p>
        <p><strong>Runtime:</strong> {selectedMovie.runtime} minutes</p>
        <p><strong>Genres:</strong> {selectedMovie.genres?.map(g => g.name).join(', ')}</p>
        <p><strong>Budget:</strong> ${selectedMovie.budget}</p>
        <p><strong>Revenue:</strong> ${selectedMovie.revenue}</p>
      </div>
    );
  }

  return (
    <div className="grid">
      {movies.map(movie => (
        <div className="card" key={movie.id} onClick={() => {
          fetch(`http://localhost:5000/api/movies/${movie.id}`)
            .then(res => res.json())
            .then(data => setSelectedMovie(data));
        }}>
          <h3>{movie.title}</h3>
          <p><em>{movie.tagline}</em></p>
          <p>⭐ {movie.vote_average} / 10</p>
        </div>
      ))}
    </div>
  );
}

export default App;
