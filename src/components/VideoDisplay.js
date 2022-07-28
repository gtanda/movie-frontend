import MovieCard from "./MovieCard";
import "react-multi-carousel/lib/styles.css";
import Carousel from 'react-multi-carousel';
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
};

const VideoDisplay = ({videos, user, onHover, onLeave}) => {
    return (
        <div>
            <Carousel infinite={true} responsive={responsive}>
            {videos
                ? videos.map((movie) => {
                    return (
                        <MovieCard
                            key={movie.id}
                            trendingData={movie}
                            onHover={() => onHover(movie.id, 'movie')}
                            onLeave={() => onLeave(movie.id, 'movie')}
                            user={user}
                        />
                    );
                })
                : null}
            </Carousel>
        </div>
    )
}
export default VideoDisplay;