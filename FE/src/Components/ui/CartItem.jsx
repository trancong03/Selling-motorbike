import { ShoppingCartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useCart } from "../context/CardContext";
import { useNavigate } from "react-router-dom";
import { getImageProductByID, getUserByIDPost } from "../../../services/apiclient";

export default function CartItem({ Product }) {
    const defaultImage = 'default.jpg';
    const navigate = useNavigate();
    const { likeProduct, isProductLiked, likeProducts } = useCart();
    const [isLiked, setIsLiked] = useState(false);
    const [images, setImages] = useState([]); // State để lưu hình ảnh
    const [user, setUser] = useState({}); // State để lưu hình ảnh

    useEffect(() => {
        const fetchImages = async () => {
            const result = await getImageProductByID(Product.mabaiviet); // Gọi API
            if (result) {
                setImages(result.slice(0, 4)); // Cập nhật state với dữ liệu từ API
            } else {
                console.error('Failed to fetch product images');
            }
        };

        fetchImages();
        const fetchuser = async () => {
            const result = await getUserByIDPost(Product.manguoidung); // Gọi API
            if (result) {
                setUser(result); // Cập nhật state với dữ liệu từ API
            } else {
                console.error('Failed to fetch user');
            }
        };
        fetchuser();
    }, [Product.mabaiviet]); 
    // Cập nhật trạng thái yêu thích khi thay đổi sản phẩm
    useEffect(() => {
        setIsLiked(isProductLiked(Product.MABAIVIET)); // Đồng bộ trạng thái yêu thích khi sản phẩm thay đổi
    }, [Product.MABAIVIET, isProductLiked]); // Theo dõi sự thay đổi của likeProducts

    // Xử lý xem chi tiết sản phẩm
    const handleViewDetails = () => {
        navigate("/product-detail", { state: { product: Product } });
    };

    // Xử lý thay đổi trạng thái yêu thích
    const handleToggleLike = () => {

        likeProduct(Product); 
        // Gọi hàm likeProduct và để nó xử lý trạng thái yêu thích
    };
    console.log(user[0]);
    
    return (
        <div className="flex items-center justify-center flex-col mt-3 rounded-2xl">
            <div className='w-[18vw] bg-white rounded-2xl ml-3 mb-5 group shadow-2xl '>
                <div className='relative overflow-hidden flex items-center justify-center flex-col'>
                    <img
                        src={`http://127.0.0.1:8000//media/images//${images?.length > 0 ? images[0].tenfile : defaultImage}`}
                        alt={Product.Name || 'Sản phẩm không có tên'}
                        className='w-full h-[20rem] shadow-2xl rounded-t-2xl
                         group-hover:scale-110  group-hover:rounded-t-2xl  transition-all duration-300'
                    />
                    <div className='absolute h-full w-full bg-black/60 rounded-2xl flex flex-col items-center justify-between p-5 -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300'>
                        <div className='text-start text-[18px]'>
                            <h3 className='line-clamp-3 font-arial text-white '> Hãng xe: {Product.hangxe || 'Sản phẩm không có tên'}</h3>
                            <h3 className='line-clamp-3 font-arial text-white '> Loại xe: {Product.loaixe || 'Sản phẩm không có tên'}</h3>
                            <h3 className='line-clamp-3 font-arial text-white '> Năm mua: {Product.nammua || 'Sản phẩm không có tên'}</h3>
                            <h3 className='line-clamp-3 font-arial text-white '> Dung tích: {Product.dungtich || 'Sản phẩm không có tên'}</h3>
                            <h3 className='line-clamp-3 font-arial text-white '>Số km : {Product.sokmdadi || 'Sản phẩm không có tên'}</h3>
                            <h3 className='line-clamp-3 font-arial text-white '>{Product.baohanh || 'Sản phẩm không có tên'}</h3>
                        </div>
                        <div>
                            <button
                                className='w-full h-[3rem] bg-transparent border text-white font-bold rounded-full '
                                onClick={handleToggleLike} 
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <FaHeart className={`transition-colors duration-300 ${isLiked ? 'text-red-500' : 'text-white'}`} size={20} />
                                    <span>{isLiked ? 'Bỏ yêu thích' : 'Thêm yêu thích'}</span>
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
                <h4 className='truncate font-arial text-black font-bold text-md ml-3 mt-3'>
                    {Product.tieude || 'Sản phẩm không có tên'}
                </h4>
                <h4 className='truncate font-arial text-black text-md ml-3 mt-3'>
                    {Product.nammua} - {Product.tinhtrangxe}
                </h4>
                <h4 className='truncate font-arial text-red-700 font-bold text-md ml-3 mt-3'>
                    {new Intl.NumberFormat('vi-VN').format(Product.giaban || 'Sản phẩm không có tên')} đ
                </h4>
                <div className="flex justify-start items-center gap-2 ml-3 mt-3">
                    <img
                        src={user[0]?.anhdaidien ? `/image/${user[0].anhdaidien}` : "/image/icon.png"}
                        alt="User anhdaidien"
                        className="w-5 h-5 rounded-full"
                    />
                    <h4 className='truncate font-arial text-green-950  text-sm'>
                        {Product.diachibaiviet.split(',').pop().trim() || 'Sản phẩm không có tên'}
                    </h4>
                </div>
                <br />
            </div>
            <div className='flex justify-center space-x-2 pb-3'>
                {images?.map((image, index) => (
                    <img
                        key={index}
                        src={`http://127.0.0.1:8000//media/images/${image.tenfile}`}
                        alt={`${Product.tieude} ${index + 1}`}
                        className='w-10 h-14 object-cover ml-3 rounded-lg cursor-pointer hover:opacity-80'
                    />
                ))}
            </div>
        </div>
    );
}
