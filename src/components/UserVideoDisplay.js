import 'react-multi-carousel/lib/styles.css'
import Carousel from 'react-multi-carousel'
import UserVideoCard from "./UserVideoCard";
import {useEffect, useState, useContext} from "react";
import videoService from "../services/videos";
import Alert from "@mui/material/Alert";
import {AnimatePresence, motion} from "framer-motion";
import {UserWatchListContext} from "../contexts/UserWatchListContext";

const responsive = {
    desktop: {
        breakpoint: {max: 3000, min: 1024},
        items: 5,
        slidesToSlide: 2 // optional, default to 1.
    },
    tablet: {
        breakpoint: {max: 1024, min: 464},
        items: 2,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: {max: 464, min: 0},
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
}

const UserVideoDisplay = () => {
    const [message, setMessage] = useState(null)
    const [messageStatus, setMessageStatus] = useState(null)
    const {setUserWatchList} = useContext(UserWatchListContext);
    const {userWatchList} = useContext(UserWatchListContext);

    useEffect(() => {
        const getUserWatchList = async () => {
            setUserWatchList(await videoService.getWatchList());
        }
        getUserWatchList();
    }, [message, messageStatus])


    return (
        <>
            {message && messageStatus ? (
                <Alert severity={messageStatus}>{message}</Alert>
            ) : null}
            <Carousel infinite={true} responsive={responsive}>
                {userWatchList
                    ? userWatchList.map((video) => {
                        return (
                            <AnimatePresence>
                                <motion.div
                                    key={video.id}
                                    initial={{y: '50%', opacity: 0, scale: 0.5}}
                                    animate={{y: 0, opacity: 1, scale: 1}}
                                    exit={{y: '50%', opacity: 0, transition: {duration: 1}}}
                                    transition={{ease: 'easeOut', duration: 1}}
                                >
                                    <UserVideoCard
                                        key={video.id}
                                        trendingData={video}
                                        setMessage={setMessage}
                                        setMessageStatus={setMessageStatus}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        )
                    })
                    : null}
            </Carousel>
        </>
    )
}
export default UserVideoDisplay
