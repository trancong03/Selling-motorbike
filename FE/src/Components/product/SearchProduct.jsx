import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ErrorBoundary from "../../ErrorBoundary";
import CartItem from "../ui/CartItem";
import ErrorPage from "../Footer/ErrorPage";
import { searchProducts } from "../../../services/apiclient";

export default function SearchProduct() {
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState('');

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search-query'); // Lấy giá trị từ URL

    // Lần đầu gọi API khi component mount
    useEffect(() => {
        if (searchQuery) {
            setQuery(searchQuery);
            searchProducts(searchQuery).then(response => {
                console.log(response);
                setProducts(response); // Giả sử API trả về dữ liệu trong `data`
            }).catch(error => {
                console.error("Error fetching products:", error);
                setProducts([]); // Xử lý khi có lỗi
            });
        }
    }, [searchQuery]);

    return (
        <div className="bg-white min-h-screen">
            <h1 className="text-3xl font-bold text-center p-3">kết quả tìm kiếm " {query} "</h1>
            <div className="grid grid-cols-4 mr-[10%] ml-[10%] mb-[1%] ">
                {/* Kiểm tra nếu products là mảng hợp lệ */}
                {Array.isArray(products) && products.length > 0 ? (
                    products.map((product) => (
                        <ErrorBoundary key={product.mabaiviet}>
                            <CartItem Product={product} />
                        </ErrorBoundary>
                    ))
                ) : (
                    <div className="w-[80vw]">
                        <p className="text-center   text-gray-500">Không tìm thấy sản phẩm nào phù hợp với từ khóa "{query}".</p>
                        <ErrorPage />

                    </div>
                )}
            </div>
        </div>
    );
}
