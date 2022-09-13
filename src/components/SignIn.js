import {useState} from "react";
import {useNavigate} from "react-router-dom";
import sessionService from '../services/session';
import styles from '../styles/SignIn.module.css'
import {GiPopcorn} from 'react-icons/gi';
import {motion} from "framer-motion";
import Input from "@mui/material/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from "@mui/icons-material/Lock";
import {inputBlock} from "../utils/inputStyles";

const SignIn = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)
    const navigate = useNavigate()

    const handleSignIn = async (e) => {
        e.preventDefault()
        const user = await sessionService.login({username, password})
        console.log('user', user)
        if (!user.userId) {
            setMessage('Invalid username or password')
        }
        setUsername('')
        setPassword('')
        if (user.userId) {
            navigate('/', {replace: true})
            window.location.reload();
        }
    }

    const backgroundImages = new Set()

    const getImagesFromStorage = () => {
        for (let i = 0; i < 3; i++) {
            if (window.localStorage.getItem(`tv_poster_${i}`)) {
                backgroundImages.add(window.localStorage.getItem(`tv_poster_${i}`))
            }
        }
    }
    getImagesFromStorage()


    return (
        <div>
            {message ? <p>{message}</p> : null}
            <div className={styles.rightSide1} style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w780/${Array.from(backgroundImages)[0]})`,
                backgroundRepeat: 'no-repeat'
            }}>
            </div>
            <div className={styles.rightSide2} style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w780/${Array.from(backgroundImages)[1]})`,
                backgroundRepeat: 'no-repeat'
            }}>
            </div>
            <div className={styles.rightSide3} style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w780/${Array.from(backgroundImages)[2]})`,
                backgroundRepeat: 'no-repeat'
            }}>
            </div>
            <div className={styles.formStyle}>
                <h3>
                    Sign In <GiPopcorn/>
                </h3>
                <form autoComplete="on">
                    <div className={styles.inputDivs}>
                        <Input
                            placeholder={'username'}
                            sx={inputBlock}
                            startAdornment={
                                <InputAdornment position="start">
                                    <PersonIcon/>
                                </InputAdornment>
                            }
                            onChange={(e) => setUsername(e.target.value)}

                        />
                    </div>
                    <div className={styles.inputDivs}>
                        <Input
                            placeholder={'password'}
                            sx={inputBlock}
                            startAdornment={
                                <InputAdornment position="start">
                                    <LockIcon/>
                                </InputAdornment>
                            }
                            onChange={(e) => setPassword(e.target.value)}

                        />
                    </div>

                    <motion.button
                        type="submit"
                        onClick={handleSignIn}
                        className={styles.submitStyle}
                        initial={{scale: 0.9}}
                        whileHover={{
                            scale: 1,
                            transition: {duration: 0.2},
                        }}
                        whileTap={{scale: 0.9}}
                    >
                        Sign In
                    </motion.button>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
