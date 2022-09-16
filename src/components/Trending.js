import {useState, useEffect} from 'react'
import UserVideoDisplay from "./UserVideoDisplay";
import VideoDisplay from './VideoDisplay'
import userService from '../services/users'
import {UserWatchListContext} from "../contexts/UserWatchListContext";
import styles from '../styles/Trending.module.css'
import tmdbService from "../services/tmdb";
import {setLocalStorageBackgroundImages} from "../utils/trendingPageHelpler";

const Trending = ({user}) => {

    const [userWatchList, setUserWatchList] = useState([])
    const [trendingMovies, setTrendingMovies] = useState([])
    const [trendingTv, setTrendingTv] = useState([])

    const fetchTrending = async (type) => {
        const trendingData = await tmdbService.getTrending(type)
        console.log('tre', trendingData.results)
        if (type === 'movie') {
            setTrendingMovies(trendingData.results)
        } else {
            setTrendingTv(trendingData.results)
        }
    }
    useEffect(() => {
        if (user.loggedIn) {
            const fetchWatchList = async () => {
                const returnedList = await userService.getWatchList()
                setUserWatchList(userWatchList.concat(returnedList))
            }
            fetchWatchList()
        }
    }, [])

    useEffect(() => {
        console.log('trendingMovies', trendingMovies.length)
        if (trendingMovies.length  === 0 && trendingTv.length === 0) {
            fetchTrending('movie', setTrendingMovies)
            fetchTrending('tv', setTrendingTv)
        }
        if (trendingMovies.length > 0 && trendingTv.length > 0) {
            setLocalStorageBackgroundImages('movie', trendingMovies, trendingTv)
            setLocalStorageBackgroundImages('tv', trendingMovies, trendingTv)
        }
    }, [trendingMovies, trendingTv])



    console.log(trendingMovies)
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
