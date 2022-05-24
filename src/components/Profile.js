import {useEffect, useState} from 'react';
import profileService from '../services/profile';
import {useNavigate} from "react-router-dom";
import styles from '../styles/Profile.module.css';
const Profile = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const getInfo = async () => {
            const userInfo = await profileService.getProfileInfo()
            console.log('userinfo', userInfo)
            if (userInfo.error) {
                navigate('/login')
            }
            setUsername(userInfo.username)
            setEmail(userInfo.email)
        }

        getInfo().catch(err => console.error(err));
    })

    return (
        <>
            <h3>{username ? `Welcome ${username}! `: 'User Does not Exist'}</h3>
            <form className={styles.formStyle}>
                <div className={styles.inputDivs}>
                    <p>Update Username</p>
                    <input className={styles.inputBlocks} placeholder={'enter new username'}/>
                </div>
                <div className={styles.inputDivs}>
                    <p>Update Email</p>
                    <input type={"email"} className={styles.inputBlocks} placeholder={'enter new email'}/>
                </div>
                <div className={styles.inputDivs}>
                    <p>Update Password</p>
                    <input type={"password"} className={styles.inputBlocks} placeholder={'enter new password'}/>
                </div>
                <button type={"submit"} className={styles.submitStyle}>Update Profile</button>
            </form>
        </>
    )
}

export default Profile;