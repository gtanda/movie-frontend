import axios from "axios";
const baseUrl = '/api/tmdb';

const getTrending = async (type) => {
    const request = await axios.get(`${baseUrl}/trending`, {params: {searchType: type}});
    return request.data;
};

export default {getTrending}