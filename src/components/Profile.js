import {useParams} from "react-router-dom";
import {useEffect, useState} from 'react';
import profileService from '../services/profile';
import sessionService from '../services/session':
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
    }, [])

    return (
        <>
            {username ? <p>Welcome {username}!</p> : <p>User ID: {id}</p>}
            <form>
                <button type={"submit"} >Logout</button>
            </form>
        </>
    )
}

export default Profile;