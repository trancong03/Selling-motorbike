import { useState } from "react";
import { MapPin, Car, Calendar, BatteryCharging, CheckCircle, Tag, Box, Shield } from 'lucide-react';

export default function PostItemUser({ product }) {
    const images = product.HINHANH;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [footerPaymentMethods, setFooterPaymentMethods] = useState(product.MOTA); // Lưu trữ nội dung mô tả

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
    };

    if (!product) {
        return <p>Không tìm thấy sản phẩm.</p>;
    }

    const calculateDateDifference = (date) => {
        const currentDate = new Date();
        const targetDate = new Date(date);
        if (isNaN(targetDate)) {
            throw new Error('Invalid date format');
        }

        const timeDifference = currentDate - targetDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        return daysDifference;
    };
    const [openMenus, setOpenMenus] = useState({});
    const toggleMenu = (postId) => {
        setOpenMenus((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId],
        }));
    };
    
    const handleDelete = () => {
        console.log('Xóa');
    };

    const handleEdit = ({ post }) => {
        console.log(post);
    };

    return (
        <div>
            <div className="rounded-sm overflow-hidden bg-slate-200 max-w-full mt-3 flex items-center justify-between p-4">
                {/* Seller Info */}
                <div className="flex items-center justify-center h-full space-x-4 relative">
                    <img
                        src={userId.anhdaidien ? `http://127.0.0.1:8000//media/images/${userId.anhdaidien}` : "http://127.0.0.1:8000//media/images/icon.png"}
                        alt="User avatar"
                        className="w-12 h-12 rounded-full border-2 border-gray-300"
                    />
                    <div className="flex-1">
                        <div className="font-medium text-gray-700 text-lg">{userId.hoten}</div>
                        <div className="flex items-center text-sm text-gray-500">
                            <div className="mr-4">{calculateDateDifference(post.NGAYDANG)} ngày trước</div>
                        </div>
                    </div>
                </div>
                <EllipsisVertical
                    onClick={() => toggleMenu(post.MABAIVIET)}
                    className="h-6 w-6  text-gray-600 hover:text-amber-500 shadow-sm hover:shadow-lg transition-all duration-200 ease-in-out cursor-pointer"
                />
                {openMenus[post.MABAIVIET] && (
                    <div className="absolute right-[0vw] mt-[7%] w-40 bg-white rounded-md shadow-lg border border-gray-200 z-10 max-h-60 overflow-y-auto">
                        <ul className="py-1">
                            <li
                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleEdit({ post })}
                            >
                                Sửa
                            </li>
                            <li
                                className="px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
                                onClick={handleDelete}
                            >
                                Xóa
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            <div className="flex flex-col items-start w-full mb-3 !bg-transparent">
                <div dangerouslySetInnerHTML={{ __html: post.MOTA }} />
            </div>
            <div className="bg-transparent flex items-start justify-between w-full ">
                <div className="flex flex-col items-start min-w-[100%] h-auto">
                    <div className="flex items-start">
                        {/* Các ảnh thumbnail */}
                        <div className="flex flex-col justify-between gap-4 h-full mr-3">
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={`http://127.0.0.1:8000/media/images/${image.TENFILE}`}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={`w-20 h-20 cursor-pointer border-2 rounded-md transition ${index === currentIndex ? "border-yellow-500" : "border-transparent"
                                        } hover:border-yellow-500`}
                                    onClick={() => updateMainImage(index)}
                                    onMouseEnter={() => updateMainImage(index)}  // Sự kiện cập nhật khi hover
                                />
                            ))}
                        </div>
                        <div className="relative">
                            <button
                                onClick={prevImage}
                                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full focus:outline-none"
                            >
                                ❮
                            </button>
                            <img
                                src={`http://127.0.0.1:8000/media/images/${images[currentIndex].TENFILE}`}
                                alt="Main"
                                className="w-[50vw] h-[55vh] object-cover rounded-lg"
                            />
                            <button
                                onClick={nextImage}
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full focus:outline-none"
                            >
                                ❯
                            </button>
                        </div>


                    </div>


                    <div className="flex flex-col items-start w-full ml-[1%] mt-3">
                        <h2 className="text-xl font-bold">Thông số kỹ thuật</h2>
                        <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-lg">
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
        </div>
        
    );
}
