import UserVideoDisplay from "./UserVideoDisplay";
import VideoDisplay from './VideoDisplay'
import userService from '../services/users'
import tmdbService from '../services/tmdb'
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
    }
    fetchWatchList()
  }, [])

  return (
    <>
      <p className={styles.title}>Trending Movies</p>
      <VideoDisplay
        videos={trendingMovies}
        user={user}
      />

      <p className={styles.title}>Trending TV Shows</p>
      <VideoDisplay
        videos={trendingTv}
        user={user}
      />
      {user && userWatchList.length > 0 ? (
        <div>
          <p className={styles.title}>
            {user.username.toUpperCase()}'s Watch List
          </p>
          <UserVideoDisplay
            videos={userWatchList}
            user={user}
          />
        </div>
      ) : null}
    </>
  )
}
export default Trending
