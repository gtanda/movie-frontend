import { useState } from 'react'
import YouTube from 'react-youtube'
import videoService from '../services/videos'
import styles from '../styles/MovieCard.module.css'
import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

const MovieCard = ({ user, trendingData, onHover, onLeave }) => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [videoID, setVideoID] = useState(null)

  const getTrailer = async (title, releaseDate) => {
    const trailerInfo = await videoService.getTrailer(title, releaseDate)
    setIsOpen(true)
    setVideoID(trailerInfo.id.videoId)
    renderVideo()
  }

  const _onReady = (event) => {
    event.target.pauseVideo()
  }

  const renderVideo = () => {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1
      }
    }

    return (
      <div>
        <YouTube videoId={videoID} opts={opts} onReady={_onReady} />;
      </div>
    )
  }

  return (
    <>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
      >
        <button onClick={() => setIsOpen(false)}>close</button>
        <div>{videoID && renderVideo()}</div>
      </Modal>

      <div
        className={styles.mainDivStyle}
        onMouseOver={onHover}
        onMouseLeave={onLeave}
      >
        <img
          alt="Poster"
          src={`https://image.tmdb.org/t/p/w342/${trendingData.poster_path}`}
        />
        {trendingData.isHovering ? (
          <div className={styles.blanketStyle}>
            <h4 className={styles.hoverStyle}>
              {trendingData.title ? trendingData.title : trendingData.name}
            </h4>
            <p className={styles.imageOverViewStyle}>{trendingData.overview}</p>

            <div className={styles.ratingAndReviewStyle}>
              <div>
                <a
                  className={styles.addToList}
                  onClick={() =>
                    getTrailer(
                      trendingData.title || trendingData.name,
                      trendingData.release_date || trendingData.first_air_date
                    )
                  }
                >
                  Watch Trailer
                </a>
              </div>
              <h6 className={styles.hoverStyle}>
                {trendingData.userReviews === 0
                  ? 'No Reviews Yet'
                  : `Rating: ${trendingData.vote_average} based on ${trendingData.vote_count} votes`}
              </h6>
              <a
                className={styles.addToList}
                onClick={() => videoService.addToWatchList(trendingData, user)}
              >
                Add To Watch List
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default MovieCard
