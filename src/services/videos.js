import axios from 'axios';
const baseUrl = 'api/movies';
const trailerUrl = 'api/trailers';

const getTrending = async (type) => {
    const request = await axios.get(`${baseUrl}`, {params: {searchType: type}});
    return request.data;
};


const getTrailer = async (title, releaseDate) => {
    const request = await axios.get(trailerUrl, {params: {title, releaseDate}})
    return request.data;
}

export default { getTrending, getTrailer };
