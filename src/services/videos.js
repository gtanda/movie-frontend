import axios from 'axios';
const baseUrl = 'api/movies';
const trailerUrl = 'api/trailers';

const addToWatchList = async (data) => {
    const request = await axios.post(baseUrl, {data});
    return request.data;
}

const removeFromWatchList = async (dataToRemove) => {
    const request = await axios.put(baseUrl, {dataToRemove});
    return request.data;
}

const getWatchList = async () => {
    const request = await axios.get(baseUrl);
    return request.data;
}

const getTrailer = async (title, releaseDate) => {
    const request = await axios.get(trailerUrl, {params: {title, releaseDate}})
    return request.data;
}

export default {getTrailer, addToWatchList, removeFromWatchList, getWatchList};
