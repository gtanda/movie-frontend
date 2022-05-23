import styles from '../styles/MovieCard.module.css';

const MovieCard = ({ trendingData, onHover, onLeave }) => {
    return (
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
    );
};

export default MovieCard;
