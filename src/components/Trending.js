import VideoDisplay from './VideoDisplay'
import tmdbService from '../services/tmdb'
import userService from '../services/users'
import { useState, useEffect } from 'react'
import styles from '../styles/Trending.module.css'


const Trending = ({ user }) => {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [trendingTv, setTrendingTv] = useState([])
  const [userWatchList, setUserWatchList] = useState([])

  const setLocalStorageBackgroundImages = (type) => {
    switch (type) {
      case 'movie':
        if (trendingMovies.length > 0) {
          for (let i = 0; i < 3; i++) {
            window.localStorage.removeItem(`movie_poster_${i}`)
            window.localStorage.setItem(
              `movie_poster_${i}`,
              trendingMovies[i].poster_path
            )
          }
        }
        break
      case 'tv':
        if (trendingTv.length > 0) {
          for (let i = 0; i < 3; i++) {
            window.localStorage.removeItem(`tv_poster_${i}`)
            window.localStorage.setItem(
              `tv_poster_${i}`,
              trendingTv[i].poster_path
            )
          }
        }
        break
      default:
        break
    }
  }


  const fetchTrending = async (type) => {
    const trendingData = await tmdbService.getTrending(type)
    if (type === 'movie') {
      setTrendingMovies(trendingData.results)
    } else {
      setTrendingTv(trendingData.results)
    }
  }

  useEffect(() => {
    fetchTrending('movie')
    fetchTrending('tv')
    setLocalStorageBackgroundImages('movie')
    setLocalStorageBackgroundImages('tv')
  }, [])

  useEffect(() => {
    const fetchWatchList = async () => {
      const returnedList = await userService.getWatchList(user.username)
      setUserWatchList(userWatchList.concat(returnedList))
      console.log(userWatchList)
      console.log(trendingMovies)
    }
    fetchWatchList()
  }, [])

  const onHover = (id, type) => {
    if (type === 'movie') {
      const movieToChange = trendingMovies.find((movie) => movie.id === id)
      movieToChange.isHovering = true
      const movies = trendingMovies.map((movie) =>
        movie.id !== id ? movie : movieToChange
      )
      setTrendingMovies(movies)
    } else if (type === 'tv') {
      const showToChange = trendingTv.find((show) => show.id === id)
      showToChange.isHovering = true
      const shows = trendingTv.map((show) =>
        show.id !== id ? show : showToChange
      )
      setTrendingTv(shows)
    } else if (userWatchList.length > 0) {
      const watchListHover = userWatchList.find((show) => show.id === id)
      watchListHover.isHovering = true
      const watchList = userWatchList.map((show) =>
        show.id !== id ? show : watchListHover
      )
      setUserWatchList(watchList)
    }
  }

  const onLeave = (id, type) => {
    if (type === 'movie') {
      const movieToChange = trendingMovies.find((movie) => movie.id === id)
      movieToChange.isHovering = false

      const movies = trendingMovies.map((movie) =>
        movie.id !== id ? movie : movieToChange
      )
      setTrendingMovies(movies)
    } else if (type === 'tv') {
      const showToChange = trendingTv.find((show) => show.id === id)
      showToChange.isHovering = false

      const shows = trendingTv.map((show) =>
        show.id !== id ? show : showToChange
      )
      setTrendingTv(shows)
    } else if (userWatchList.length > 0) {
      const watchListHover = userWatchList.find((data) => data.id === id)
      watchListHover.isHovering = false
      const watchList = userWatchList.map((data) =>
        data.id !== id ? data : watchListHover
      )
      setUserWatchList(watchList)
    }
  }


  return (
    <>
      <p className={styles.title}>Trending Movies</p>
      <VideoDisplay
        videos={trendingMovies}
        onHover={onHover}
        onLeave={onLeave}
        user={user}
      />

      <p className={styles.title}>Trending TV Shows</p>
      <VideoDisplay
        videos={trendingTv}
        onHover={onHover}
        onLeave={onLeave}
        user={user}
      />
      {user && userWatchList.length > 0 ? (
        <div>
          <p className={styles.title}>
            {user.username.toUpperCase()}'s Watch List
          </p>
          <VideoDisplay
            videos={userWatchList}
            onHover={onHover}
            onLeave={onLeave}
            user={user}
          />
        </div>
      ) : null}
    </>
  )
}
export default Trending
