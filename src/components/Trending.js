import MovieCard from './MovieCard';
import videoService from '../services/videos';
import { useState, useEffect } from 'react';

import styles from '../styles/Trending.module.css';

const Trending = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [trendingTv, setTrendingTv] = useState([]);

    const setLocalStorageBackgoundImages = (type) => {
        switch(type) {
            case 'movie':
                if (trendingMovies.length > 0) {
                    for (let i =0; i < 3; i++) {
                        window.localStorage.removeItem(`movie_poster_${i}`)
                        window.localStorage.setItem(`movie_poster_${i}`, trendingMovies[i].poster_path)
                    }
                }
            break;
            case 'tv':
                if (trendingTv.length > 0) {
                    for (let i =0; i < 3; i++) {
                        window.localStorage.removeItem(`tv_poster_${i}`)
                        window.localStorage.setItem(`tv_poster_${i}`, trendingTv[i].poster_path)
                    }
                }
        }
    }

    useEffect(() => {
        const fetchTrending = async (type) => {
            const trendingData = await videoService.getTrending(type);
            if (type === 'movie') {
                setTrendingMovies(trendingData.results);
            } else {
                setTrendingTv(trendingData.results)
            }
        };

        fetchTrending('movie');
        fetchTrending('tv')
        setLocalStorageBackgoundImages('movie')
        setLocalStorageBackgoundImages('tv')
    }, []);

    const onHover = (id, type) => {
        if (type === 'movie') {
            const movieToChange = trendingMovies.find((movie) => movie.id === id);
            movieToChange.isHovering = true;
                const movies = trendingMovies.map((movie) =>
                    movie.id !== id ? movie : movieToChange
                );
            setTrendingMovies(movies);
        } else {
            const showToChange = trendingTv.find((show) => show.id === id);
            showToChange.isHovering = true;
            const shows = trendingTv.map((show) =>
                show.id !== id ? show : showToChange
            );
            setTrendingTv(shows);
        }
    };

    const onLeave = (id, type) => {
        if (type === 'movie') {
            const movieToChange = trendingMovies.find((movie) => movie.id === id);
            movieToChange.isHovering = false;

            const movies = trendingMovies.map((movie) =>
                movie.id !== id ? movie : movieToChange
            );
            setTrendingMovies(movies);
        } else {
            const showToChange = trendingTv.find((show) => show.id === id);
            showToChange.isHovering = false;

            const shows = trendingTv.map((show) =>
                show.id !== id ? show : showToChange
            );
            setTrendingTv(shows);
        }

    };

    return (
        <>
            <p className={styles.title}>Trending Movies</p>
            <div>
                {trendingMovies
                    ? trendingMovies.map((movie) => {
                          return (
                              <MovieCard
                                  key={movie.id}
                                  trendingData={movie}
                                  onHover={() => onHover(movie.id, 'movie')}
                                  onLeave={() => onLeave(movie.id, 'movie')}
                              />
                          );
                      })
                    : null}
            </div>

            <p className={styles.title}>Trending Tv Shows</p>
            <div>
                {trendingTv
                    ? trendingTv.map((show) => {
                        return (
                            <MovieCard
                                key={show.id}
                                trendingData={show}
                                onHover={() => onHover(show.id, 'show')}
                                onLeave={() => onLeave(show.id, 'show')}
                            />
                        );
                    })
                    : null}
            </div>
        </>
    );
};
export default Trending;
