import {useEffect, useState} from 'react'
import profileService from '../services/profile'
import {useNavigate} from 'react-router-dom'
import Alert from '@mui/material/Alert'
import styles from '../styles/Profile.module.css'
import {messageUpdateHelper} from "../utils/messageUpdateHelper";
import {Input} from '@mui/material'
import InputAdornment from "@material-ui/core/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import {inputBlock} from "../utils/inputStyles";
import {motion} from "framer-motion";

const Profile = () => {
    const [username, setUsername] = useState('')
    const [usernameInput, setUsernameInput] = useState('')
    const [email, setEmail] = useState('')
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [message, setMessage] = useState(null)
    const [messageStatus, setMessageStatus] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const getInfo = async () => {
            const userInfo = await profileService.getProfileInfo()
            setUsername(userInfo.username)
            setEmail(userInfo.email)
        }
        getInfo().catch((err) => {
            console.error(err)
            navigate('/signIn')
        })
    }, [])


    const handleUserUpdate = async (
        e,
        oldPropertyValue,
        newPropertyValue,
        propertyToUpdate
    ) => {
        e.preventDefault()
        switch (propertyToUpdate) {
            case 'username':
                if (newPropertyValue.length < 3) {
                    messageUpdateHelper(
                        'Username must be at least 3 characters long',
                        'error',
                        setMessage,
                        setMessageStatus
                    )
                    return
                }
                const updated = await profileService.updateUsername(
                    oldPropertyValue,
                    newPropertyValue
                )
                if (updated.user) {
                    setUsername(updated.user.username)
                }
                messageUpdateHelper(updated.message, updated.messageStatus, setMessage, setMessageStatus)
                setUsernameInput('')
                break
            case 'email':
                const emailUpdated = await profileService.updateEmail(
                    oldPropertyValue,
                    newPropertyValue
                )

                if (emailUpdated.user) {
                    setEmail(emailUpdated.user.email)
                }
                messageUpdateHelper(emailUpdated.message, emailUpdated.messageStatus, setMessage, setMessageStatus)
                setEmailInput('')
                break
            case 'password':
                const passwordUpdate = await profileService.updatePassword(
                    oldPropertyValue,
                    newPropertyValue
                )

                if (newPropertyValue.length < 3) {
                    messageUpdateHelper(
                        'Password must be at least 3 characters long',
                        'error',
                        setMessage,
                        setMessageStatus
                    )
                    return
                }

                messageUpdateHelper(
                    passwordUpdate.message,
                    passwordUpdate.messageStatus,
                    setMessage,
                    setMessageStatus
                )
                setPasswordInput('')
                break
            default:
                messageUpdateHelper('Something went wrong', 'error', setMessage, setMessageStatus)
        }
    }

    return (
        <>
            {message && messageStatus ? (
                <Alert variant="filled" severity={messageStatus}>{message}</Alert>
            ) : null}
            <h3>{username ? `Welcome ${username}! ` : 'User Does not Exist'}</h3>
            <form className={styles.formStyle}>
                <div className={styles.inputDivs}>
                    <p>Update Username</p>
                    <Input
                        placeholder={'enter new username'}
                        value={usernameInput}
                        sx={inputBlock}
                        startAdornment={
                            <InputAdornment position="start">
                                <PersonIcon/>
                            </InputAdornment>
                        }
                        onChange={(e) => setUsernameInput(e.target.value)}
                    />
                    <motion.button
                        type="submit"
                        onClick={(e) => handleUserUpdate(e, username, usernameInput, 'username')}
                        className={styles.submitStyle}
                        initial={{scale: 0.9}}
                        whileHover={{
                            scale: 1,
                            transition: {duration: 0.2},
                        }}
                        whileTap={{scale: 0.9}}
                    >
                        Update Username
                    </motion.button>
                </div>
                <div className={styles.inputDivs}>
                    <p>Update Email</p>
                    <Input
                        placeholder={'enter new email'}
                        type={'email'}
                        value={emailInput}
                        sx={inputBlock}
                        startAdornment={
                            <InputAdornment position="start">
                                <EmailIcon/>
                            </InputAdornment>
                        }
                        onChange={(e) => setEmailInput(e.target.value)}

                    />
                    <motion.button
                        type="submit"
                        onClick={(e) => handleUserUpdate(e, email, emailInput, 'email')}
                        className={styles.submitStyle}
                        initial={{scale: 0.9}}
                        whileHover={{
                            scale: 1,
                            transition: {duration: 0.2},
                        }}
                        whileTap={{scale: 0.9}}
                    >
                        Update Email
                    </motion.button>
                </div>
                <div className={styles.inputDivs}>
                    <p>Update Password</p>
                    <Input
                        placeholder={'enter new password'}
                        type={'password'}
                        value={passwordInput}
                        sx={inputBlock}
                        startAdornment={
                            <InputAdornment position="start">
                                <LockIcon/>
                            </InputAdornment>
                        }
                        onChange={(e) => setPasswordInput(e.target.value)}

                    />
                    <motion.button
                        type="submit"
                        onClick={(e) =>
                            handleUserUpdate(e, email, passwordInput, 'password')
                        }
                        className={styles.submitStyle}
                        initial={{scale: 0.9}}
                        whileHover={{
                            scale: 1,
                            transition: {duration: 0.2},
                        }}
                        whileTap={{scale: 0.9}}
                    >
                        Update Password
                    </motion.button>
                </div>
            </form>
        </>
    )
}

export default Profile
