import {useState} from "react";
import YouTube from 'react-youtube';
import videoService from '../services/videos';
import styles from '../styles/MovieCard.module.css';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const MovieCard = ({ trendingData, onHover, onLeave }) => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    const [videoID, setVideoID] = useState(null)
    const getTrailer = async (title, releaseDate) => {
        const trailerInfo = await videoService.getTrailer(title, releaseDate)
        setIsOpen(true)
        setVideoID(trailerInfo.id.videoId);
        console.log(videoID);
        console.log('trailer info', trailerInfo);
        renderVideo();
    }

    const _onReady = (event) => {
        event.target.pauseVideo();
    }

    const renderVideo = () => {
        const opts = {
            height: '390',
            width: '640',
            playerVars: {
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
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                <button onClick={() => setIsOpen(false)}>close</button>
                <div style={{display: 'inline-block'}}>
                    {videoID && renderVideo()}
                </div>
            </Modal>

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
        </>
    );
};

export default MovieCard;
