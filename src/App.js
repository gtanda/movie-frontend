import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Home from './components/Home'
import UnknownEndpoint from './components/UnknownEndpoint'
import Recommendations from "./components/Recommendations";
import Profile from './components/Profile'
import sessionService from './services/session'
import styles from './styles/App.module.css'

const App = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        isUserLoggedIn().catch((err) => console.error(err))
    }, [user.loggedIn])

    const isUserLoggedIn = async () => {
        const userCheck = await sessionService.isUserLoggedIn()
        if (userCheck.user) {
            const {username, userId, email} = userCheck.user
            setUser({
                username: username,
                id: userId,
                email: email,
                loggedIn: userCheck.loggedIn
            })
        } else {
            setUser({loggedIn: false})
        }
    }

    const handleLogout = async () => {
        const destroyedSession = await sessionService.logout()
        setUser({loggedIn: false})
        console.log('des', destroyedSession)
    }

    return (
        <>
            <Router>
                <nav className={styles.navbar}>
                    <img
                        src={require('./images/tmdb-icon.png')}
                        alt="TMDB Icon"
                        className={styles.iconStyle}
                    />
                    {!user.loggedIn ? (
                        <Link
                            to="/signUp"
                            className={styles.link + ' ' + styles.signUpButton}
                        >
                            Sign Up
                        </Link>
                    ) : null}

                    {!user.loggedIn ? (
                        <Link
                            to="/signIn"
                            className={styles.link + ' ' + styles.signUpButton}
                        >
                            Sign In
                        </Link>
                    ) : null}
                    {user.loggedIn ? (
                        <Link
                            onClick={handleLogout}
                            to={'/'}
                            className={styles.link + ' ' + styles.signUpButton}
                            id={'userLogout'}
                        >
                            Logout
                        </Link>
                    ) : null}

                    {user.loggedIn ? (
                        <Link
                            to={'/profile'}
                            className={styles.link + ' ' + styles.signUpButton}
                        >
                            Profile
                        </Link>
                    ) : null}

                    <Link to="/recommendations" className={styles.link + ' ' + styles.signUpButton}>
                        Recommendations
                    </Link>

                    <Link to="/" className={styles.link + ' ' + styles.signUpButton}>
                        Home
                    </Link>

                </nav>

                <Routes>
                    <Route path="/" element={<Home user={user}/>}/>
                    <Route path="/signUp" element={<SignUp/>}/>
                    <Route path="/signIn" element={<SignIn/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/recommendations" element={<Recommendations />}/>
                    <Route path="*" element={<UnknownEndpoint/>}/>
                </Routes>
            </Router>
        </>
    )
}

export default App
