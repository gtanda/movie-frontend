import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Trending from './components/Trending';

import movieService from './services/movies';
import styles from './styles/App.module.css';

const App = () => {
    const [trending, setTrending] = useState([]);

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            const movies = await movieService.getTrending();
            setTrending(movies.results);
        };
        fetchTrendingMovies();
    }, []);

    console.log(trending.results);
    return (
        <>
            <Router>
                <div className={styles.navbar}>
                    <Link to="/" className={styles.link}>
                        Sign In
                    </Link>
                    <Link
                        to="/users"
                        className={styles.link + ' ' + styles.signUpButton}
                    >
                        Sign Up
                    </Link>
                </div>
            </Router>

            <Trending trending={trending} />
        </>
    );
};

export default App;
