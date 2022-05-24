import {useState} from "react";
import YouTube from 'react-youtube';
import videoService from '../services/videos';
import styles from '../styles/MovieCard.module.css';

const MovieCard = ({ trendingData, onHover, onLeave }) => {

    const [videoID, setVideoID] = useState(null)
    const getTrailer = async (title, releaseDate) => {
        const trailerInfo = await videoService.getTrailer(title, releaseDate)
        setVideoID(trailerInfo.id.videoId)
        console.log(videoID)
        console.log('trailer info', trailerInfo)
        renderVideo();
    }

    const _onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    const renderVideo = () => {
        const opts = {
            height: '390',
            width: '640',
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
            },
        }


        return (
            <div>
                <YouTube videoId={videoID} opts={opts} onReady={_onReady} onEnd={() => setVideoID(null)}/>;
            </div>
        )
    }


    return (
        <>
        <div
            className={styles.mainDivStyle}
            onMouseOver={onHover}
            onMouseLeave={onLeave}
        >
            <img
                alt="Movie Poster"
                src={`https://image.tmdb.org/t/p/w342/${trendingData.poster_path}`}
            />
            {trendingData.isHovering ? (
                <div className={styles.blanketStyle}>
                    <h4 className={styles.hoverStyle}>
                        {trendingData.title ? trendingData.title : trendingData.name}
                    </h4>
                    <p className={styles.imageOverViewStyle}>
                        {trendingData.overview}
                    </p>

                    <div className={styles.ratingAndReviewStyle}>
                        <div>
                            <a className={styles.addToList} onClick={() => getTrailer(trendingData.title, trendingData.release_date)}>Watch Trailer</a>
                        </div>
                        <h6 className={styles.hoverStyle}>
                            {trendingData.userReviews === 0
                                ? 'No Reviews Yet'
                                : `Rating: ${trendingData.vote_average} based on ${trendingData.vote_count} votes`}
                        </h6>
                        <a className={styles.addToList}>Add To Watch List</a>
                    </div>
                </div>
            ) : null}
        </div>
            {videoID && renderVideo()}
        </>
    );
};

export default MovieCard;
