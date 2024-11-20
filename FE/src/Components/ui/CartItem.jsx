import { ShoppingCartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useCart } from "../context/CardContext";
import { useNavigate } from "react-router-dom";

export default function CartItem({ Product }) {
    const defaultImage = 'default.jpg';
    const navigate = useNavigate();
    const handleViewDetails = () => {
        navigate("/product-detail", { state: { product: Product } });
    };
    const [isLiked, setIsLiked] = useState(false);
    const { addToCart, likeProduct, isProductLiked } = useCart();

    const handleToggleLike = () => {
        setIsLiked(!isLiked);
    };
    // useEffect(() => {
    //     setIsLiked(isProductLiked(Product.ProductID));
    // }, [Product.ProductID, isProductLiked]);
    return (
        <div className="flex items-center justify-center flex-col mt-3">
            <div className='w-[18vw] bg-white rounded-2xl ml-3 mb-5 group shadow-2xl'>
                <div className='relative overflow-hidden flex items-center justify-center flex-col'>
                    <img
                        src={`http://127.0.0.1:8000//media/images//${Product.HINHANH.length > 0 ? Product.HINHANH[0].TENFILE : defaultImage}`}
                        alt={Product.Name || 'Sản phẩm không có tên'}
                        className='w-auto h-[20rem] shadow-2xl'
                    />
                    <div className='absolute h-full w-full bg-black/60 rounded-2xl flex flex-col items-center justify-between p-5 -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300'>
                        <div className='text-start text-lg'>
                            <h3 className='line-clamp-3 font-arial text-white '> Hãng xe: {Product.HANGXE || 'Sản phẩm không có tên'}</h3>
                            <h3 className='line-clamp-3 font-arial text-white '> Loại xe: {Product.LOAIXE || 'Sản phẩm không có tên'}</h3>
                            <h3 className='line-clamp-3 font-arial text-white '> Năm mua: {Product.NAMMUA || 'Sản phẩm không có tên'}</h3>
                            <h3 className='line-clamp-3 font-arial text-white '> Dung tích: {Product.DUNGTICH || 'Sản phẩm không có tên'}</h3>
                            <h3 className='line-clamp-3 font-arial text-white '>Số km : {Product.SOKMDADI || 'Sản phẩm không có tên'}</h3>
                            <h3 className='line-clamp-3 font-arial text-white '>{Product.BAOHANH || 'Sản phẩm không có tên'}</h3>
                            
                        </div>
                        <div>
                            <button
                                className='w-full h-[3rem] bg-transparent border text-white font-bold rounded-full '
                                onClick={handleToggleLike}
                            >
                                <div className="flex items-center justify-center gap-2"
                                    // onClick={() => { likeProduct(Product) }}
                                >
                                    <FaHeart className={`transition-colors duration-300 ${isLiked ? 'text-red-500' : 'text-white'}`} size={20} /> {/* Thay đổi màu */}
                                    <span>Thêm yêu thích</span>
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
                <h4 className='truncate  font-arial text-black font-bold text-md ml-3 mt-3'>
                    {Product.TIEUDE || 'Sản phẩm không có tên'}
                </h4>
                <h4 className='truncate font-arial text-black text-md ml-3 mt-3'>
                    {Product.NAMMUA} - {Product.TINHTRANGXE}
                </h4>
                <h4 className='truncate font-arial text-red-700 font-bold text-md ml-3 mt-3'>
                    {Product.GIABAN || 'Sản phẩm không có tên'}
                </h4>
                <div className="flex justify-start items-center gap-2 ml-3 mt-3">
                    <img
                        src={Product.NGUOIDUNG[0].ANHDAIDIEN ? `/image/${Product.NGUOIDUNG[0].ANHDAIDIEN}` : "/image/icon.png"}
                        alt="User anhdaidien"
                        className="w-5 h-5 rounded-full"
                    />
                    <h4 className='truncate font-arial text-green-950  text-sm '>
                        {Product.DIACHIBAIVIET || 'Sản phẩm không có tên'}
                    </h4>
                </div>
               
                
                <br />
            </div>
            <div className='flex justify-center space-x-2'>

                {Product.HINHANH.map((image, index) => (
                    <img
                        key={index}
                        src={`http://127.0.0.1:8000//media/images/${image.TENFILE}`}
                        alt={`${Product.Name} ${index + 1}`}
                        className='w-[50px] h-[50px] object-contain m-3 rounded-md cursor-pointer hover:opacity-80'
                    />
                ))}
            </div>
        </div>

    );
}
