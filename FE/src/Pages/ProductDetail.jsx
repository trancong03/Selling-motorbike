import { useState } from "react";
import { useLocation } from "react-router-dom";
import { MapPin, Clock, Star, Phone, MessageSquare, Car, Calendar, BatteryCharging, CheckCircle, Tag, Box, Shield, UserPlus, UserCheck } from 'lucide-react';
import axios from "axios";
export default function productDetail() {

    const { state } = useLocation();
    const { product, user, image } = state || {}; // Lấy product từ state
    const images = image;
    const users = user[0]
    const [currentIndex, setCurrentIndex] = useState(0);

    const updateMainImage = (index) => {
        setCurrentIndex(index);
    };

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    }
    if (!product) {
        return <p>Không tìm thấy sản phẩm.</p>;
    }
    const calculateDateDifference = (date) => {
        const currentDate = new Date();
        const targetDate = new Date(date);
        // Make sure the targetDate is valid
        if (isNaN(targetDate)) {
            throw new Error('Invalid date format');
        }
        const timeDifference = currentDate - targetDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        return daysDifference;
    };

    const days = calculateDateDifference(product.ngaydang);
    const [isFollowing, setIsFollowing] = useState(false);
    const toggleFollow = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/follow/${users.manguoidung}`);
            setIsFollowing(!isFollowing);
            console.log(response.data);
        } catch (error) {
            console.error('Error while following/unfollowing', error);
        }
    };
    return (
        <div className="flex items-center bg-white justify-center">
            <div className="flex  max-w-[100%] items-center justify-center bg-slate-50 pt-10 pb-10 mt-10">
                <div className="bg-gray-100 flex items-center justify-center w-3/5 min-h-screen ">
                    <div className="flex flex-col items-center space-y-4 min-w-[100%]">
                        {/* Ảnh chính */}
                        <div className="relative">
                            <button
                                onClick={prevImage}
                                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full focus:outline-none"
                            >
                                ❮
                            </button>
                            <img
                                src={`http://127.0.0.1:8000/media/images/${images[currentIndex].tenfile}`}
                                alt="Main"
                                className=" w-[60vw] h-[70vh] object-cover rounded-lg"
                            />
                            <button
                                onClick={nextImage}
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full focus:outline-none"
                            >
                                ❯
                            </button>
                        </div>

                        {/* Các ảnh thumbnail */}
                        <div className="flex space-x-2">
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={`http://127.0.0.1:8000/media/images/${image.tenfile}`}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={`w-20 h-20 cursor-pointer border-2 rounded-md transition ${index === currentIndex ? "border-yellow-500" : "border-transparent"
                                        } hover:border-yellow-500`}
                                    onClick={() => updateMainImage(index)}
                                    onMouseEnter={() => updateMainImage(index)}  // Sự kiện cập nhật khi hover
                                />

                            ))}
                        </div>
                        <hr />
                        <div className="flex flex-col items-start w-full mb-3 !bg-transparent ml-[10%] text-md">
                            <h2 className="text-xl font-bold">Mô tả chi tiết</h2>

                            <div className=" p-4 text-lg" dangerouslySetInnerHTML={{ __html: product.mota }} />
                        </div>
                        <div className="flex flex-col items-start w-full ml-[10%] mb-5">
                            <h2 className="text-xl font-bold">Thông số kỹ thuật</h2>
                            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-lg p-4">
                                <div className="flex items-center">
                                    <Car className="mr-2" />
                                    <h3 className='line-clamp-3 font-arial'>Hãng xe: {product.HANGXE || 'Sản phẩm không có tên'}</h3>
                                </div>
                                <div className="flex items-center">
                                    <Tag className="mr-2" />
                                    <h3 className='line-clamp-3 font-arial'>Loại xe: {product.loaixe || 'Sản phẩm không có tên'}</h3>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="mr-2" />
                                    <h3 className='line-clamp-3 font-arial'>Năm mua: {product.nammua || 'Sản phẩm không có tên'}</h3>
                                </div>
                                <div className="flex items-center">
                                    <BatteryCharging className="mr-2" />
                                    <h3 className='line-clamp-3 font-arial'>Dung tích: {product.dungtich || 'Sản phẩm không có tên'}</h3>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="mr-2" />
                                    <h3 className='line-clamp-3 font-arial'>Số km: {product.sokmdadi || 'Sản phẩm không có tên'}</h3>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className="mr-2" />
                                    <h3 className='line-clamp-3 font-arial'>Tình Trạng: {product.TINHTRANGXE || 'Sản phẩm không có tên'}</h3>
                                </div>
                                <div className="flex items-center">
                                    <Box className="mr-2" />
                                    <h3 className='line-clamp-3 font-arial'>Xuất xứ: {product.xuatxu || 'Sản phẩm không có tên'}</h3>
                                </div>
                                <div className="flex items-center">
                                    <Shield className="mr-2" />
                                    <h3 className='line-clamp-3 font-arial'>{product.BAOHANH || 'Sản phẩm không có tên'}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-start justify-start w-3/7 min-h-full ml-3 mt-[-670px]">
                    <div className="max-w-lg rounded-lg overflow-hidden">
                        <div className="p-6">
                            <div className="rounded-lg bg-white p-3 min-w-full">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-10">
                                    {product.TIEUDE}
                                </h2>
                                <div className="text-3xl font-bold text-red-600 mb-3">
                                    Giá: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.giaban)}
                                </div>

                                <div className="flex items-center text-gray-600 mb-4">
                                    <MapPin className="w-5 h-5 mr-3 text-gray-600" />
                                    <span className="text-sm">{users?.diachi}</span>
                                </div>

                                <div className="flex items-center text-gray-600 mb-4">
                                    <Clock className="w-5 h-5 mr-3 text-gray-600" />
                                    <span className="text-sm">{days} ngày trước</span>
                                </div>
                            </div>
                            <div className="rounded-lg overflow-hidden bg-white p-6 min-w-full mt-3">
                                {/* Seller Info */}
                                <div className="flex items-center mb-6 space-x-4">
                                    <img
                                        src={users?.anhdaidien ? `http://127.0.0.1:8000//media/images/${users?.anhdaidien}` : "/http://127.0.0.1:8000//media/images/icon.png"}
                                        alt="User avatar"
                                        className="w-12 h-12 rounded-full border-2 border-gray-300"
                                    />
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-700">{users?.hoten}</div>
                                        <div className="flex items-center text-sm text-yellow-500">
                                            <Star className="w-4 h-4 mr-1" />
                                            <span>4.6 (14)</span>
                                            <span className="mx-2">•</span>
                                            <span>139 đã bán</span>
                                            <span className="mx-2">•</span>
                                            <span>7 đang bán</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500 mt-1">
                                            <div className="mr-4">Hoạt động 4 giờ trước</div>
                                            <div>Phản hồi: 85%</div>
                                        </div>
                                    </div>
                                </div>
                                {/* Follow Button */}
                                <div className="flex justify-center mb-5">
                                    <button
                                        onClick={toggleFollow}
                                        className={`w-full ${isFollowing ? 'bg-gray-300' : 'bg-green-500'} hover:${isFollowing ? 'bg-gray-400' : 'bg-green-600'} text-white rounded-lg py-2 flex items-center justify-center`}
                                    >
                                        {isFollowing ? (
                                            <>
                                                <UserCheck className="w-5 h-5 mr-2" />
                                                Đang theo dõi
                                            </>
                                        ) : (
                                            <>
                                                <UserPlus className="w-5 h-5 mr-2" />
                                                Theo dõi
                                            </>
                                        )}
                                    </button>
                                </div>
                                {/* Action Buttons */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <button className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg py-2 flex items-center justify-center">
                                        <Phone className="w-5 h-5 mr-2" />
                                        {users?.sodienthoai}
                                    </button>
                                    <button className="w-full border-2 border-green-500 hover:bg-green-100 text-green-500 rounded-lg py-2 flex items-center justify-center">
                                        <MessageSquare className="w-5 h-5 mr-2" />
                                        Chat
                                    </button>
                                </div>

                                {/* product Status */}
                                <div className="flex justify-between text-sm text-gray-600">
                                    <div>Xe còn hay đã bán rồi?</div>
                                    <div className="font-medium text-green-600">Xe chính chủ</div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>


    );
}
