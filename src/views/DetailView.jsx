import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./DetailView.css";

function DetailView() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailers, setTrailers] = useState([]);

  // Fetch the movie details and trailers when the component mounts
  useEffect(() => {
    async function fetchMovieDetails() {
      const movieResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
      );
      setMovie(movieResponse.data);

      // Fetch movie videos (trailers)
      const videosResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_TMDB_KEY}`
      );
      setTrailers(videosResponse.data.results);
    }

    fetchMovieDetails();
  }, [id]);

  return (
    <div className="detail-view-container">
      {movie ? (
        <div>
          <h1>{movie.title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
            alt={movie.title}
            className="detail-view-poster"
          />
          <p className="detail-info"><span>Overview:</span> {movie.overview}</p>
          <p className="detail-info"><span>Release Date:</span> {movie.release_date}</p>
          <p className="detail-info"><span>Rating:</span> {movie.vote_average}</p>
          <p className="detail-info"><span>Genres:</span> {movie.genres.map((g) => g.name).join(", ")}</p>
          <p className="detail-info"><span>Runtime:</span> {movie.runtime} minutes</p>
          <p className="detail-info"><span>Language:</span> {movie.original_language}</p>

          {trailers.length > 0 && (
            <div className="trailer-section">
              <h3>Trailer:</h3>
              <div>
                <iframe
                  src={`https://www.youtube.com/embed/${trailers[0].key}`}
                  title={trailers[0].name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="no-movie-selected">Select a movie to view details.</p>
      )}
    </div>
  );
}

export default DetailView;