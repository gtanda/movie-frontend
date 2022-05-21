import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import SignUp from './components/SignUp';
import SignIn from "./components/SignIn";
import Home from './components/Home';
import UnknownEndpoint from "./components/UnknownEndpoint";
import Profile from "./components/Profile";
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
                    <Route path="/signIn" element={<SignIn />} />
                    <Route path="/profile/:username" element={<Profile />} />
                    <Route path="*" element={<UnknownEndpoint />} />
                </Routes>
            </Router>
        </>
    );
};

export default App;
