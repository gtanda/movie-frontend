import tmdbService from "../services/tmdb";

export const setLocalStorageBackgroundImages = (type, trendingMovies, trendingTv) => {
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
