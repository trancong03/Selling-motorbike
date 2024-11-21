import { useState } from "react";
import { useLocation } from "react-router-dom";
import { MapPin, Clock, Star, Phone, MessageSquare, Car, Calendar, BatteryCharging, CheckCircle, Tag, Box, Shield } from 'lucide-react';
export default function productDetail() {
    
    const { state } = useLocation();
    const { product } = state || {}; // Lấy product từ state
    const images = product.HINHANH
    const [currentIndex, setCurrentIndex] = useState(0);
    console.log(product);

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
    const days = calculateDateDifference(product.NGAYDANG);
    return (
        <div className ="flex items-center justify-center">
            <div className="flex  max-w-[100%] items-center justify-center">
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
                                src={`http://127.0.0.1:8000//media/images/${images[currentIndex].TENFILE}`}
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
                                    src={`http://127.0.0.1:8000//media/images/${image.TENFILE}`}
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

                            <div className=" p-4 text-lg" dangerouslySetInnerHTML={{ __html: product.MOTA }} />
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
                                    <h3 className='line-clamp-3 font-arial'>Loại xe: {product.LOAIXE || 'Sản phẩm không có tên'}</h3>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="mr-2" />
                                    <h3 className='line-clamp-3 font-arial'>Năm mua: {product.NAMMUA || 'Sản phẩm không có tên'}</h3>
                                </div>
                                <div className="flex items-center">
                                    <BatteryCharging className="mr-2" />
                                    <h3 className='line-clamp-3 font-arial'>Dung tích: {product.DUNGTICH || 'Sản phẩm không có tên'}</h3>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="mr-2" />
                                    <h3 className='line-clamp-3 font-arial'>Số km: {product.SOKMDADI || 'Sản phẩm không có tên'}</h3>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className="mr-2" />
                                    <h3 className='line-clamp-3 font-arial'>Tình Trạng: {product.TINHTRANGXE || 'Sản phẩm không có tên'}</h3>
                                </div>
                                <div className="flex items-center">
                                    <Box className="mr-2" />
                                    <h3 className='line-clamp-3 font-arial'>Xuất xứ: {product.XUATXU || 'Sản phẩm không có tên'}</h3>
                                </div>
                                <div className="flex items-center">
                                    <Shield className="mr-2" />
                                    <h3 className='line-clamp-3 font-arial'>{product.BAOHANH || 'Sản phẩm không có tên'}</h3>
                                </div>
                            </div>

                        </div>

                       
                    </div>
                    
                </div>
                <div className="flex items-start justify-start w-2/5 min-h-full ml-3">
                    <div className="max-w-lg rounded-lg overflow-hidden">
                        <div className="p-6">
                            <div className="rounded-lg overflow-hidden bg-white p-6 min-w-full">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-10">{product.TIEUDE}</h2>
                                <div className="text-3xl font-bold text-red-600 mb-4">
                                    {product.GIABAN}
                                </div>
                                <div className="flex items-center text-gray-600 mb-4">
                                    <MapPin className="w-5 h-5 mr-3 text-gray-600" />
                                    <span className="text-sm">{product.NGUOIDUNG[0].DIACHI}</span>
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
                                        src={product.NGUOIDUNG[0].ANHDAIDIEN ? `http://127.0.0.1:8000//media/images/${product.NGUOIDUNG[0].ANHDAIDIEN}` : "/http://127.0.0.1:8000//media/images/icon.png"}
                                        alt="User avatar"
                                        className="w-12 h-12 rounded-full border-2 border-gray-300"
                                    />
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-700">{product.NGUOIDUNG[0].HOTEN}</div>
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

                                {/* Action Buttons */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <button className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg py-2 flex items-center justify-center">
                                        <Phone className="w-5 h-5 mr-2" />
                                        {product.NGUOIDUNG[0].SODIENTHOAI}
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
