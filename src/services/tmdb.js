import axios from "axios";
const baseUrl = '/api/tmdb';

const getTrending = async (type) => {
    const request = await axios.get(`${baseUrl}`, {params: {searchType: type}});
    return request.data;
};

const getMoviesList = async (query) => {
    const request = await axios.get(`${baseUrl}/search`, {params: {query}});
    return request.data.results;
}

const getRecommendations = async (queryInfo) => {
    const arr = queryInfo.split('-');
    const id = (arr[arr.length - 1].trim());
    const request = await axios.get(`${baseUrl}/recommendations/${id}`);
    return request.data.results;
}

export default {getTrending, getMoviesList, getRecommendations};
