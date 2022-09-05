import 'react-multi-carousel/lib/styles.css'
import Carousel from 'react-multi-carousel'
import UserVideoCard from "./UserVideoCard";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
        slidesToSlide: 2 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
}

const VideoDisplay = ({ videos, user}) => {
    return (
        <div>
            <Carousel infinite={true} responsive={responsive}>
                {videos
                    ? videos.map((video) => {
                        return (
                            <UserVideoCard
                                key={video.id}
                                trendingData={video}
                                user={user}
                            />
                        )
                    })
                    : null}
            </Carousel>
        </div>
    )
}
export default VideoDisplay
