import axios from 'axios';

// Create an instance of axios
const apiClient = axios.create({
    baseURL: 'http://localhost:8000',
    // Xoá 'Content-Type' vì FormData tự động thiết lập header này khi gửi tệp
    headers: {
        // Không cần thiết lập Content-Type nếu đang gửi FormData
    },
});

// Add a request interceptor to include the token in the Authorization header
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
