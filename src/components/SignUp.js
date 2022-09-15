import styles from '../styles/SignUp.module.css';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {GiPopcorn} from 'react-icons/gi';
import userService from '../services/users';
import {motion} from "framer-motion";
import PersonIcon from '@mui/icons-material/Person';
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Input from '@mui/material/Input';
import {inputBlock} from "../utils/inputStyles";

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
        for (let i = 0; i < 3; i++) {
            if (window.localStorage.getItem(`movie_poster_${i}`)) {
                backgroundImages.add(window.localStorage.getItem(`movie_poster_${i}`))
            }
        }
    }

    getImagesFromStorage()
    return (
        <div>
            <div className={styles.leftSide1} style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w780/${Array.from(backgroundImages)[0]})`,
                backgroundRepeat: 'no-repeat'
            }}>
            </div>
            <div className={styles.leftSide2} style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w780/${Array.from(backgroundImages)[1]})`,
                backgroundRepeat: 'no-repeat'
            }}>
            </div>
            <div className={styles.leftSide3} style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w780/${Array.from(backgroundImages)[2]})`,
                backgroundRepeat: 'no-repeat'
            }}>
            </div>
            <div className={styles.formStyle}>
                <h3>
                    Sign Up <GiPopcorn/>
                </h3>
                <form autoComplete="on">
                    <div className={styles.inputDivs}>
                        <Input
                            id={'email'}
                            placeholder={'email'}
                            sx={inputBlock}
                            startAdornment={
                                <InputAdornment position="start">
                                    <EmailIcon />
                                </InputAdornment>
                            }
                            onChange={(e) => setEmail(e.target.value)}

                        />
                    </div>
                    <div className={styles.inputDivs}>
                        <Input
                            id={'username'}
                            placeholder={'username'}
                            sx={inputBlock}
                            startAdornment={
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            }
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputDivs}>
                        <Input
                            id={'password'}
                            placeholder={'password'}
                            sx={inputBlock}
                            startAdornment={
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            }
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputDivs}>
                        <Input
                            id={'confirmPassword'}
                            placeholder={'confirm password'}
                            sx={inputBlock}
                            startAdornment={
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            }
                            onChange={(e) => setConfirmPassword(e.target.value)}

                        />
                    </div>
                    <motion.button
                        id={'signUpButton'}
                        type="submit"
                        onClick={handleSignUp}
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
};

export default SignUp;
