import axios from 'axios';
const baseUrl = 'api/movies';

const getTrending = async (type) => {
    const request = await axios.get(`${baseUrl}`, {params: {searchType: type}});
    return request.data;
};

export default { getTrending };
