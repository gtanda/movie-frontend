import MovieCard from "./MovieCard";

const VideoDisplay = ({videos, user, onHover, onLeave}) => {
    return (
        <div>
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
        </div>
    )
}
export default VideoDisplay;