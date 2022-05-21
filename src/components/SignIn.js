import {useState} from "react";
import loginService from '../services/login';
import styles from '../styles/SignIn.module.css'

import { GiPopcorn } from 'react-icons/gi';
const SignIn = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSignIn = async (e) => {
        e.preventDefault()
        const status = await loginService.login({username, password})
        console.log('login', status)
        setUsername('')
        setPassword('')
    }

    const backgroundImages = new Set()

    const getImagesFromStorage = () => {
        for (let i =0; i < 3; i++) {
            if (window.localStorage.getItem(`poster_${i}`)) {
                backgroundImages.add(window.localStorage.getItem(`poster_${i}`))
            }
        }
    }
    getImagesFromStorage()

    return (
        <div>
            <div className={styles.rightSide1} style={{backgroundImage: `url(https://image.tmdb.org/t/p/w780${Array.from(backgroundImages)[0]})`, backgroundRepeat: 'no-repeat'}}>
            </div>
            <div className={styles.rightSide2} style={{backgroundImage: `url(https://image.tmdb.org/t/p/w780${Array.from(backgroundImages)[1]})`, backgroundRepeat: 'no-repeat'}}>
            </div>
            <div className={styles.rightSide3} style={{backgroundImage: `url(https://image.tmdb.org/t/p/w780${Array.from(backgroundImages)[2]})`, backgroundRepeat: 'no-repeat'}}>
            </div>
            <div className={styles.formStyle}>
                <h3>
                    Sign In <GiPopcorn />
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
                            placeholder="password"
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.inputBlocks}
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={handleSignIn}
                        className={styles.submitStyle}
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignIn;