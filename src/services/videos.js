import axios from 'axios';
const baseUrl = 'api/movies';
const trailerUrl = 'api/trailers';

const addToWatchList = async (data, user) => {
    const request = await axios.post(baseUrl, {data, user});
    return request.data;
}

const removeFromWatchList = async (dataToRemove, user) => {
    const request = await axios.put(baseUrl, {dataToRemove, user});
    return request.data;
}

const getTrailer = async (title, releaseDate) => {
    const request = await axios.get(trailerUrl, {params: {title, releaseDate}})
    return request.data;
}

export default {getTrailer, addToWatchList, removeFromWatchList};
