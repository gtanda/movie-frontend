import MovieCard from './MovieCard'
import 'react-multi-carousel/lib/styles.css'
import Carousel from 'react-multi-carousel'
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 2 // optional, default to 1.
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
}

const VideoDisplay = ({ videos, user, onHover, onLeave }) => {
  console.log(videos)
  return (
    <div>
      <Carousel infinite={true} responsive={responsive}>
        {videos
          ? videos.map((video) => {
              return (
                <MovieCard
                  key={video.id}
                  trendingData={video}
                  onHover={() => onHover(video.id, video.media_type)}
                  onLeave={() => onLeave(video.id, video.media_type)}
                  user={user}
                />
              )
            })
          : null}
      </Carousel>
    </div>
  )
}
export default VideoDisplay
