import axios from 'axios';

const youtubeApi = axios.create({
  baseURL: process.env.API_BASE_URL,
});
export default youtubeApi;
