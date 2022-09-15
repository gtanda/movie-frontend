import { useState, useEffect } from 'react'
import UserVideoDisplay from "./UserVideoDisplay";
import VideoDisplay from './VideoDisplay'
import {setLocalStorageBackgroundImages} from "../utils/trendingPageHelpler";
import userService from '../services/users'
import tmdbService from "../services/tmdb";
import {UserWatchListContext} from "../contexts/UserWatchListContext";
import styles from '../styles/Trending.module.css'

const Trending = ({ user }) => {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [trendingTv, setTrendingTv] = useState([])
  const [userWatchList, setUserWatchList] = useState([])

  const fetchTrending = async (type) => {
    const trendingData = await tmdbService.getTrending(type)
    if (type === 'movie') {
      setTrendingMovies(trendingData.results)
    } else {
      setTrendingTv(trendingData.results)
    }
  }
  useEffect(() => {
    fetchTrending('movie', setTrendingMovies)
    fetchTrending('tv', setTrendingTv)
    setLocalStorageBackgroundImages(['movie', 'tv'], trendingMovies, trendingTv)
  }, [])

  useEffect(() => {
    const fetchWatchList = async () => {
      const returnedList = await userService.getWatchList()
      setUserWatchList(userWatchList.concat(returnedList))
    }
    fetchWatchList()
  }, [])

  console.log('userWatchList', userWatchList)

  return (
    <>
      <p className={styles.title}>Trending Movies</p>
      <UserWatchListContext.Provider value={{setUserWatchList, userWatchList}}>
        <VideoDisplay
          videos={trendingMovies}
        />

        <p className={styles.title}>Trending TV Shows</p>
        <VideoDisplay
          videos={trendingTv}
        />
        {user.username && userWatchList.length > 0 ? (
          <div>
            <p className={styles.title}>
              {user.username.toUpperCase()}'s Watch List
            </p>
            <UserVideoDisplay videos={userWatchList}/>
          </div>
        ) : null}
      </UserWatchListContext.Provider>
    </>
  )
}
export default Trending
