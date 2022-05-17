import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import SignUp from './components/SignUp';
import Home from './components/Home';
import styles from './styles/App.module.css';

const App = () => {
    return (
        <>
            <Router>
                <nav className={styles.navbar}>
                    <img
                        src={require('./images/tmdb-icon.png')}
                        alt="TMDB Icon"
                        className={styles.iconStyle}
                    />
                    <Link
                        to="/signUp"
                        className={styles.link + ' ' + styles.signUpButton}
                    >
                        Sign Up
                    </Link>

                    <Link
                        to="/signIn"
                        className={styles.link + ' ' + styles.signUpButton}
                    >
                        Sign In
                    </Link>

                    <Link
                        to="/"
                        className={styles.link + ' ' + styles.signUpButton}
                    >
                        Home
                    </Link>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signUp" element={<SignUp />} />
                </Routes>
            </Router>
        </>
    );
};

export default App;
