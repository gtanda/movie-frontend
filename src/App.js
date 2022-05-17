import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Trending from './components/Trending';

import styles from './styles/App.module.css';

const App = () => {
    return (
        <>
            <Router>
                <div className={styles.navbar}>
                    <Link
                        to="/"
                        className={styles.link + ' ' + styles.signUpButton}
                    >
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

            <Trending />
        </>
    );
};

export default App;
