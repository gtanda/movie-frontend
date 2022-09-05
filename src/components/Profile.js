import {useEffect, useState} from 'react'
import profileService from '../services/profile'
import {useNavigate} from 'react-router-dom'
import Alert from '@mui/material/Alert'
import styles from '../styles/Profile.module.css'
import {messageUpdateHelper} from "../utils/messageUpdateHelper";

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
                <Alert severity={messageStatus}>{message}</Alert>
            ) : null}
            <h3>{username ? `Welcome ${username}! ` : 'User Does not Exist'}</h3>
            <form className={styles.formStyle}>
                <div className={styles.inputDivs}>
                    <p>Update Username</p>
                    <input
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                        className={styles.inputBlocks}
                        placeholder={'enter new username'}
                    />
                    <button
                        type={'submit'}
                        className={styles.submitStyle}
                        onClick={(e) =>
                            handleUserUpdate(e, username, usernameInput, 'username')
                        }
                    >
                        Update Username
                    </button>
                </div>
                <div className={styles.inputDivs}>
                    <p>Update Email</p>
                    <input
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        type={'email'}
                        className={styles.inputBlocks}
                        placeholder={'enter new email'}
                    />
                    <button
                        type={'submit'}
                        className={styles.submitStyle}
                        onClick={(e) => handleUserUpdate(e, email, emailInput, 'email')}
                    >
                        Update Email
                    </button>
                </div>
                <div className={styles.inputDivs}>
                    <p>Update Password</p>
                    <input
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        type={'password'}
                        className={styles.inputBlocks}
                        placeholder={'enter new password'}
                    />
                    <button
                        type={'submit'}
                        className={styles.submitStyle}
                        onClick={(e) =>
                            handleUserUpdate(e, email, passwordInput, 'password')
                        }
                    >
                        Update Password
                    </button>
                </div>
            </form>
        </>
    )
}

export default Profile
