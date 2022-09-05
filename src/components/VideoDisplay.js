import 'react-multi-carousel/lib/styles.css'
import Carousel from 'react-multi-carousel'
import VideoCard from "./VideoCard";
import {useContext, useEffect, useState} from "react";
import Alert from "@mui/material/Alert";
import {motion} from "framer-motion";
import {UserWatchListContext} from "../contexts/UserWatchListContext";
import videoService from "../services/videos";

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

const VideoDisplay = ({videos}) => {
    const [message, setMessage] = useState(null)
    const [messageStatus, setMessageStatus] = useState(null)
    console.log('videodis', UserWatchListContext)
    const {setUserWatchList} = useContext(UserWatchListContext)

    useEffect(() => {
        const getUserWatchList = async () => {
            setUserWatchList(await videoService.getWatchList());
        }
        getUserWatchList();
    }, [message, messageStatus])

    return (
        <motion.div
            initial={{opacity: 0, scale: 0.5}}
            animate={{opacity: 1, scale: 1}}
            transition={{ease: 'easeIn', duration: 2}}>
            {message && messageStatus ? (
                <Alert severity={messageStatus}>{message}</Alert>
            ) : null}
            <Carousel infinite={true} responsive={responsive}>
                {videos
                    ? videos.map((video) => {
                        return (
                            <VideoCard
                                key={video.id}
                                trendingData={video}
                                setMessage={setMessage}
                                setMessageStatus={setMessageStatus}
                            />
                        )
                    })
                    : null}
            </Carousel>
        </motion.div>
    )
}
export default VideoDisplay
