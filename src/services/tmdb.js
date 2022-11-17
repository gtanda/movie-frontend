import axios from "axios";
const baseUrl = '/api/tmdb';

const getTrending = async (type) => {
    const request = await axios.get(`${baseUrl}`, {params: {searchType: type}});
    return request.data;
};

const getSearch = async (query) => {
    const request = await axios.get(`${baseUrl}/search`, {params: {query}});
    return request.data;
}

export default {getTrending, getSearch};
