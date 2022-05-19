import styles from '../styles/MovieCard.module.css';

const MovieCard = ({ movieData, onHover, onLeave }) => {
    return (
        <div
            className={styles.mainDivStyle}
            onMouseOver={onHover}
            onMouseLeave={onLeave}
        >
            <img
                alt="Movie Poster"
                src={`https://image.tmdb.org/t/p/w342/${movieData.poster_path}`}
            />
            {movieData.isHovering ? (
                <div className={styles.blanketStyle}>
                    <h4 className={styles.hoverStyle}>
                        {movieData.title ? movieData.title : movieData.name}
                    </h4>
                    <p className={styles.imageOverViewStyle}>
                        {movieData.overview}
                    </p>
                    <div className={styles.ratingAndReviewStyle}>
                        <h6 className={styles.hoverStyle}>
                            {movieData.userReviews === 0
                                ? 'No Reviews Yet'
                                : `Rating: ${movieData.vote_average} based on ${movieData.vote_count} votes`}
                        </h6>
                        <a className={styles.addToList}>Add To List</a>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default MovieCard;
