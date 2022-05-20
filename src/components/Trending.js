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

        if (trendingMovies.length > 0) {
            for (let i =0; i < 3; i++) {
                window.localStorage.setItem(`poster_${i}`, trendingMovies[i].poster_path)
            }
        }
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
            <h2 className={styles.title}>Trending Movies</h2>
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
