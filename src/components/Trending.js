import MovieCard from './MovieCard';
import movieService from '../services/movies';
import { useState, useEffect } from 'react';

import styles from '../styles/Trending.module.css';

const Trending = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            const movies = await movieService.getTrending();
            setTrendingMovies(movies.results);
        };
        fetchTrendingMovies();
    }, []);

    const onHover = (id) => {
        const movieToChange = trendingMovies.find((movie) => movie.id === id);
        movieToChange.isHovering = true;

        const movies = trendingMovies.map((movie) =>
            movie.id !== id ? movie : movieToChange
        );
        setTrendingMovies(movies);
    };

    const onLeave = (id) => {
        const movieToChange = trendingMovies.find((movie) => movie.id === id);
        movieToChange.isHovering = false;

        const movies = trendingMovies.map((movie) =>
            movie.id !== id ? movie : movieToChange
        );
        setTrendingMovies(movies);
    };

    return (
        <>
            <h3 className={styles.title}>Trending Movies</h3>
            <div>
                {trendingMovies
                    ? trendingMovies.map((movie) => {
                          return (
                              <MovieCard
                                  key={movie.id}
                                  movieData={movie}
                                  onHover={() => onHover(movie.id)}
                                  onLeave={() => onLeave(movie.id)}
                              />
                          );
                      })
                    : null}
            </div>
        </>
    );
};
export default Trending;
