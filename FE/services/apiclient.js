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
const searchProducts = async (query) => {
    try {
        // Mã hóa từ khóa tìm kiếm trước khi gửi yêu cầu
        const encodedQuery = encodeURIComponent(query);
        // Gửi yêu cầu GET tới API
        const response = await axios.get(`http://127.0.0.1:8000/api/search_products/?q=${encodedQuery}`);
        // Cập nhật danh sách sản phẩm
        return (response.data);
    } catch (err) {
        // Xử lý lỗi
        console.error(err);
    }
};
const getLikeProduct = async (username) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/favorite-products/${username}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cart data:', error);
    }
};
const handleLikeProduct = async (username, product_id) => {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/toggle-favorite/${username}/${product_id}/`)
        console.log('Thêm vào giỏ hàng thành công:', response.data);
    } catch (error) {
        console.error('Lỗi khi thêm vào giỏ hàng:', error);
    }
};
export default apiClient;
// Sử dụng default export
export {
    getImageProductByID, getUserByIDPost, getTop10Product, searchProducts, getLikeProduct, handleLikeProduct
};
