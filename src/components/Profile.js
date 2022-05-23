import {useParams} from "react-router-dom";
import {useEffect, useState} from 'react';
import profileService from '../services/profile';
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const {id} = useParams()
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

        getInfo()
    }, [username, email])

    return (
        <>
            {username ? <p>Welcome {username}!</p> : <p>User ID: {id}</p>}
            {email ? <p>Email: {email}</p> : null}
        </>
    )
}

export default Profile;