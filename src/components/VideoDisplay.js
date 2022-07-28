import MovieCard from "./MovieCard";
<<<<<<< HEAD
import "react-multi-carousel/lib/styles.css";
import Carousel from 'react-multi-carousel';
const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
        slidesToSlide: 2 // optional, default to 1.
=======
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 3 // optional, default to 1.
>>>>>>> 62aa0d1a48814b8392ffd7969da1fb3389e32662
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
<<<<<<< HEAD

const VideoDisplay = ({videos, user, onHover, onLeave}) => {
    return (
        <div>
            <Carousel infinite={true} responsive={responsive}>
=======
const VideoDisplay = ({videos, user, onHover, onLeave}) => {
    return (
        <div>
            <Carousel swipeable={false}
                      draggable={false}
                      showDots={true}
                      responsive={responsive}
                      ssr={true} // means to render carousel on server-side.
                      infinite={true}
                      keyBoardControl={true}
                      customTransition="all .5"
                      containerClass="carousel-container"
                      removeArrowOnDeviceType={["tablet", "mobile"]}
                      dotListClass="custom-dot-list-style"
                      itemClass="carousel-item-padding-40-px">
>>>>>>> 62aa0d1a48814b8392ffd7969da1fb3389e32662
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