import axios from 'axios';

// Create an instance of axios
const apiClient = axios.create({
    baseURL: 'http://localhost:8000',  // Base URL của API
    headers: {
        'Content-Type': 'application/json',
    },
});


export default apiClient;
