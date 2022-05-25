import axios from 'axios';
const baseUrl = 'api/movies';
const trailerUrl = 'api/trailers';


const getWatchList = async (user) => {
    const request = await axios.get(baseUrl, {params: {user}})
    return request.data;
}

const addToWatchList = async (data, user) => {
    const request = await axios.post(baseUrl, {data, user});
    return request.data;
}


const getTrailer = async (title, releaseDate) => {
    const request = await axios.get(trailerUrl, {params: {title, releaseDate}})
    return request.data;
}

export default {getTrailer, addToWatchList, getWatchList};
