import MovieCard from "./MovieCard";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';

const VideoDisplay = ({videos, user, onHover, onLeave}) => {
    return (
        <div>
            <Carousel infiniteLoop={true}>
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