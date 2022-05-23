import styles from '../styles/SignUp.module.css';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { GiPopcorn } from 'react-icons/gi';
import userService from '../services/users';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate()

    const handleSignUp = async (e) => {
        e.preventDefault();
        const registeredUser = await userService.signUp(username, email, password, confirmPassword)
        if (registeredUser) {
            navigate('/signIn')
        }
        setUsername('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    };

    const backgroundImages = new Set()

    const getImagesFromStorage = () => {
        for (let i =0; i < 3; i++) {
            if (window.localStorage.getItem(`movie_poster_${i}`)) {
                backgroundImages.add(window.localStorage.getItem(`movie_poster_${i}`))
            }
        }
    }
    getImagesFromStorage()


    return (
        <div>
            <div className={styles.leftSide1} style={{backgroundImage: `url(https://image.tmdb.org/t/p/w780${Array.from(backgroundImages)[0]})`, backgroundRepeat: 'no-repeat'}}>
            </div>
            <div className={styles.leftSide2} style={{backgroundImage: `url(https://image.tmdb.org/t/p/w780${Array.from(backgroundImages)[1]})`, backgroundRepeat: 'no-repeat'}}>
            </div>
            <div className={styles.leftSide3} style={{backgroundImage: `url(https://image.tmdb.org/t/p/w780${Array.from(backgroundImages)[2]})`, backgroundRepeat: 'no-repeat'}}>
            </div>
            <div className={styles.formStyle}>
                <h3>
                    Sign Up <GiPopcorn />
                </h3>
                <form autoComplete="on">
                    <div className={styles.inputDivs}>
                        <input
                            placeholder="username"
                            value={username}
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                            className={styles.inputBlocks}
                        />
                    </div>
                    <div className={styles.inputDivs}>
                        <input
                            placeholder="email"
                            value={email}
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.inputBlocks}
                        />
                    </div>
                    <div className={styles.inputDivs}>
                        <input
                            placeholder="password"
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.inputBlocks}
                        />
                    </div>
                    <div className={styles.inputDivs}>
                        <input
                            placeholder="confirm password"
                            value={confirmPassword}
                            type="password"
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                            }}
                            className={styles.inputBlocks}
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={handleSignUp}
                        className={styles.submitStyle}
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
