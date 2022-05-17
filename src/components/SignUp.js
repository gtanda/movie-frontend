import styles from '../styles/SignUp.module.css';
import { useState } from 'react';
import { GiPopcorn } from 'react-icons/gi';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();
        console.log(username);
        console.log(email);
        console.log(password);
        console.log(confirmPassword);
    };

    return (
        <div>
            <div className={styles.leftSide}></div>
            <div className={styles.formStyle}>
                <h3>
                    Sign Up <GiPopcorn />
                </h3>
                <form autoComplete="on">
                    <div className={styles.inputDivs}>
                        <input
                            placeholder="username"
                            email={username}
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
