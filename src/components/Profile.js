import {useParams} from "react-router-dom";

const Profile = () => {
    const {username} = useParams()
    return (
        <>
            <p>Welcome {username}!</p>
        </>
    )
}

export default Profile;