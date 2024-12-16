import React, { useEffect, useState } from "react";
import axios from 'axios';
import CartItem from "./CartItem";
import ErrorBoundary from "../../ErrorBoundary";

export default function Top100Post() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0); // Số lượng sản phẩm tổng cộng

    // Hàm lấy sản phẩm
    const fetchProducts = async (page = 1) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/bai-viet/?page=${page}&limit=12`
            );
            if (page === 1) {
                setProducts(response.data.products); // Khi trang đầu tiên, ghi đè lên danh sách sản phẩm
            } else {
                setProducts((prev) => [...prev, ...response.data.products]); // Ghép thêm sản phẩm mới nếu không phải trang đầu tiên
            }
            setTotalCount(response.data.total_count); // Lưu tổng số sản phẩm
            setCurrentPage(page); // Cập nhật trang hiện tại
        } catch (err) {
            setError(err.response ? err.response.data : err.message);
        } finally {
            setLoading(false);
        }
    };

    // Lần đầu gọi API khi component mount
    useEffect(() => {
        setCurrentPage(1);
        setTotalCount(0);
        fetchProducts(1);
    }, []); // Chạy chỉ một lần khi component mount

    // Hàm xử lý nút "Xem thêm"
    const loadMoreProducts = () => {
        const nextPage = currentPage + 1;
        fetchProducts(nextPage);
    };

    return (
        <div className="bg-white">
            <h1 className="text-3xl font-bold text-center p-3">Tin nổi bật </h1>
            <div className="grid grid-cols-4 mr-[10%] ml-[10%] mb-[1%] ">
                {products.map((product) => (
                    <ErrorBoundary key={product.mabaiviet}>
                        <CartItem Product={product} />
                    </ErrorBoundary>
                ))}

            </div>
            {products.length < totalCount && (
                <div className="text-center mb-3 flex items-center justify-center w-100%">
                    <button
                        onClick={loadMoreProducts}
                        disabled={loading}
                        className="bg-white text-black border-2 border-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300 disabled:cursor-not-allowed"
                    >
                        {loading ? "Đang tải..." : "Xem thêm"}
                    </button>
                </div>

            )}
        </div>
    );
}


