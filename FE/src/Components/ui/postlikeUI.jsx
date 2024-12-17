import { ShoppingCartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useCart } from "../context/CardContext";
import { useNavigate } from "react-router-dom";

export default function PostLikeUI({ ProductID }) {
    const [Product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/post-id/${ProductID}/`);
                const result = await response.json();
                if (result) {
                    setProduct(result);
                } else {
                    console.error("Invalid response format:", result);
                }
            } catch (error) {
                console.error("Error fetching liked products:", error);
            }
        };
        fetchProduct();
    }, [ProductID]);

    const defaultImage = "default.jpg";
    const navigate = useNavigate();
    const { likeProduct, isProductLiked } = useCart();
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (Product) {
            setIsLiked(isProductLiked(Product.mabaiviet));
        }
    }, [Product, isProductLiked]);

    const handleViewDetails = () => {
        navigate("/product-detail", { state: { product: Product } });
    };

    const handleToggleLike = () => {
        likeProduct(Product);
    };

    if (!Product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center flex-col mt-3">
            <div className="w-[18vw] bg-white rounded-2xl ml-3 mb-5 group shadow-2xl">
                <div className="relative overflow-hidden flex items-center justify-center flex-col">
                    <img
                        src={`http://127.0.0.1:8000/media/images/${Product.hinhanh?.[0]?.tenfile || defaultImage}`}
                        alt={Product.tieude || "Sản phẩm không có tên"}
                        className="w-auto h-[20rem] shadow-2xl"
                    />
                    <div className="absolute h-full w-full bg-black/60 rounded-2xl flex flex-col items-center justify-between p-5 -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="text-start text-lg">
                            <h3 className="line-clamp-3 font-arial text-white ">Hãng xe: {Product.hangxe || "N/A"}</h3>
                            <h3 className="line-clamp-3 font-arial text-white ">Loại xe: {Product.loaixe || "N/A"}</h3>
                            <h3 className="line-clamp-3 font-arial text-white ">Năm mua: {Product.nammua || "N/A"}</h3>
                            <h3 className="line-clamp-3 font-arial text-white ">Dung tích: {Product.dungtich || "N/A"}</h3>
                            <h3 className="line-clamp-3 font-arial text-white ">Số km: {Product.sokmdadi || "N/A"}</h3>
                            <h3 className="line-clamp-3 font-arial text-white ">{Product.baohanh || "N/A"}</h3>
                        </div>
                        <div>
                            <button
                                className="w-full h-[3rem] bg-transparent border text-white font-bold rounded-full"
                                onClick={handleToggleLike}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <FaHeart className={`transition-colors duration-300 ${isLiked ? "text-red-500" : "text-white"}`} size={20} />
                                    <span>{isLiked ? "Bỏ yêu thích" : "Thêm yêu thích"}</span>
                                </div>
                            </button>
                            <button
                                className="w-full h-[3rem] bg-[#1D7E20] text-white font-bold rounded-full mt-3"
                                onClick={handleViewDetails}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <ShoppingCartIcon />
                                    <span>Xem chi tiết</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <h4 className="truncate font-arial text-black font-bold text-md ml-3 mt-3">
                    {Product.tieude || "N/A"}
                </h4>
                <h4 className="truncate font-arial text-black text-md ml-3 mt-3">
                    {Product.nammua} - {Product.tinhtrangxe || "N/A"}
                </h4>
                <h4 className="truncate font-arial text-red-700 font-bold text-md ml-3 mt-3">
                    {Product.giaban || "N/A"} VND
                </h4>
            </div>
        </div>
    );
}
