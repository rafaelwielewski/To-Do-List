import axios from 'axios';

const http = axios.create({

    baseURL:"http://186.211.97.154:8082"
});

export default http;