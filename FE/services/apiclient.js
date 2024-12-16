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
// Hàm getUserById
const getImageProductByID = async (product_id) => {
    try {
        const response = await apiClient.get(`http://127.0.0.1:8000/api/product/${product_id}/`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (error.response) {
            console.error('Error:', error.response.data.error);
        } else {
            console.error('Network Error:', error.message);
        }
        return null;
    }
};
// Hàm getUserById
const getUserByIDPost = async (product_id) => {
    try {
        const response = await apiClient.get(`http://127.0.0.1:8000/api/product_user/${product_id}/`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (error.response) {
            console.error('Error:', error.response.data.error);
        } else {
            console.error('Network Error:', error.message);
        }
        return null;
    }
};
const getTop10Product = async () => {
    try {
        const response = await apiClient.get(`http://127.0.0.1:8000/api/get_top_10_favorite_products/`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (error.response) {
            console.error('Error:', error.response.data.error);
        } else {
            console.error('Network Error:', error.message);
        }
        return null;
    }
};
export default apiClient;
// Sử dụng default export
export {
    getImageProductByID, getUserByIDPost, getTop10Product
};
