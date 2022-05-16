import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/movies';

const getTrending = async () => {
    const request = await axios.get(`${baseUrl}`);
    return request.data;
};

export default { getTrending };
