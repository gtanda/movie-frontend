import styles from '../styles/MovieCard.module.css';

const MovieCard = ({ movieData }) => {
    movieData['isHovering'] = false;

    const onHover = () => {
        movieData.isHovering = true;
        console.log(movieData);
    };

    const onLeave = () => (movieData.isHovering = false);

    return (
        <div className={styles.image_overlay}>
            <p>{movieData.title}</p>
            <img
                alt="Movie Poster"
                src={`https://image.tmdb.org/t/p/w185/${movieData.poster_path}`}
                onMouseOver={onHover}
                onMouseLeave={onLeave}
            />
        </div>
    );
};

export default MovieCard;
