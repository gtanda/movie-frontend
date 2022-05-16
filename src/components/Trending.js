import styles from '../styles/Trending.module.css';
import MovieCard from './MovieCard';

const Trending = ({ trending }) => {
    console.log(trending);
    return (
        <>
            <div className={styles.wrapper}>
                {trending
                    ? trending.map((movie) => {
                          return <MovieCard key={movie.id} movieData={movie} />;
                      })
                    : null}
            </div>
        </>
    );
};
export default Trending;
