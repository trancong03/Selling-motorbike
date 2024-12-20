import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapPin, Car, Calendar, BatteryCharging, CheckCircle, Tag, Box, Shield, EllipsisVertical, DeleteIcon, Settings2, ArrowDownToDot, User } from 'lucide-react';
const DayTopComponent = ({ product, userId, onClose }) => {
    const [mabaiviet, setMabaiviet] = useState('');
    const [top, setTop] = useState('');
    const [message, setMessage] = useState('');
    const [requiredValue, setRequiredValue] = useState('');
    const [curenttop, setCurenttop] = useState('');
    // Function to fetch required value for top rank
    const fetchRequiredValue = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/get_gia_tri_day_top/?top=${top? top: 1}&mabaiviet=${product.MABAIVIET}`);
            setRequiredValue(response.data.required_value);
            setCurenttop(response.data.current_top)
        } catch (error) {
            const errorMessage = error.response ? error.response.data.error : 'Lỗi hệ thống';
            setMessage(errorMessage);
        }
    };
const images = product.HINHANH;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [giaodich, setGiaodich] = useState([]);
    // Function to handle image update
    const updateMainImage = (index) => {
        setCurrentIndex(index);
    };
     useEffect(() => {
         fetchRequiredValue();
        }, [top]);
    // Function to handle changes in the top input
    const handleTopChange = (e) => {
        const value = e.target.value;
        setTop(value)
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = {
            "mabaiviet": product.MABAIVIET,
            "top": top
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/day-top/', requestData);

            // On successful transaction, show a success message
            alert('Transaction successful!');

            // Redirect to the homepage
            window.location.href = '/';  // Assuming '/' is the homepage
        } catch (error) {
            const errorMessage = error.response ? error.response.data.error : 'Lỗi hệ thống';
            alert(`Error: ${errorMessage}`);
        }
    };


    return (
        <div className="right-1 mt-2 w-[100vw] h-auto bg-orange-50 rounded-lg shadow-xl border border-orange-200">
            <div className="p-4">
                <label htmlFor="newExpiryDate" className="block text-3xl text-orange-800 font-bold">Bài Viết của bạn:</label>
                <div className='flex justify-center items-center gap-8'>
                    <div className='w-1/3 border border-orange-200 shadow-sm p-2 rounded-lg bg-orange-50'>
                        <div className="flex flex-col items-start w-full p-5">
                            <div dangerouslySetInnerHTML={{ __html: product.MOTA }} />
                        </div>

                        <div className="flex items-start justify-between w-full bg-orange-100/50 rounded-lg p-4">
                            <div className="flex flex-col gap-4 !w-[80px] h-[80px] m-4">
                                {images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={`http://127.0.0.1:8000/media/images/${image.TENFILE}`}
                                        alt={`Thumbnail ${index + 1}`}
                                        className={`w-full h-full cursor-pointer border-2 rounded-md transition ${index === currentIndex ? "border-orange-500" : "border-transparent"}`}
                                        onClick={() => updateMainImage(index)}
                                        onMouseEnter={() => updateMainImage(index)}
                                        style={{ objectFit: 'cover' }}
                                    />
                                ))}
                            </div>

                            <div className="mt-4 flex-1">
                                <img
                                    src={`http://127.0.0.1:8000/media/images/${images[currentIndex].TENFILE}`}
                                    alt={`Main Image`}
                                    className="w-full max-h-[70vh] rounded-md object-cover shadow-lg"
                                />
                            </div>
                        </div>

                        <div className="relative flex flex-col items-start w-full mt-3 m-5">
                            <h2 className="text-xl font-bold mt-3 text-orange-700 mb-5">
                                {new Intl.NumberFormat('vi-VN').format(product.GIABAN) || 'Sản phẩm không có tên'} đ
                            </h2>

                            <h2 className="text-lg font-bold text-orange-800">Thông số kỹ thuật</h2>
                            <div className="grid grid-cols-2 gap-4 text-sm w-full">
                                <div className="flex items-center">
                                    <Car className="mr-2 text-orange-600" />
                                    <h3 className="line-clamp-3">Hãng xe: {product.HANGXE || 'Sản phẩm không có tên'}</h3>
                                </div>
                                <div className="flex items-center">
                                    <Tag className="mr-2 text-orange-600" />
                                    <h3 className="line-clamp-3">Loại xe: {product.LOAIXE || 'Sản phẩm không có tên'}</h3>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="mr-2 text-orange-600" />
                                    <h3 className="line-clamp-3">Năm mua: {product.NAMMUA || 'Sản phẩm không có tên'}</h3>
                                </div>
                                <div className="flex items-center">
                                    <BatteryCharging className="mr-2 text-orange-600" />
                                    <h3 className="line-clamp-3">Dung tích: {product.DUNGTICH || 'Sản phẩm không có tên'}</h3>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="mr-2 text-orange-600" />
                                    <h3 className="line-clamp-3">Số km: {product.SOKMDADI || 'Sản phẩm không có tên'}</h3>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className="mr-2 text-orange-600" />
                                    <h3 className="line-clamp-3">Tình Trạng: {product.TINHTRANGXE || 'Sản phẩm không có tên'}</h3>
                                </div>
                                <div className="flex items-center">
                                    <Box className="mr-2 text-orange-600" />
                                    <h3 className="line-clamp-3">Xuất xứ: {product.XUATXU || 'Sản phẩm không có tên'}</h3>
                                </div>
                                <div className="flex items-center">
                                    <Shield className="mr-2 text-orange-600" />
                                    <h3 className="line-clamp-3">{product.BAOHANH || 'Sản phẩm không có tên'}</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-2/3 min-h-[80vh] bg-orange-50 rounded-lg shadow-xl border border-orange-200'>
                        <div className="flex items-center space-x-4">
                            <img
                                src={userId.anhdaidien ? `http://127.0.0.1:8000/media/images/${userId.anhdaidien}` : "http://127.0.0.1:8000/media/images/icon.png"}
                                alt="User avatar"
                                className="w-16 h-16 rounded-full border-4 border-orange-300 shadow-lg"
                            />
                            <div className="flex-1">
                                <div className="font-medium text-orange-800 text-lg">{userId.hoten}</div>
                                <div className="font-medium text-orange-700 text-lg mt-2">
                                    <h2 className="text-xl font-bold">
                                        Số dư:
                                        {new Intl.NumberFormat('vi-VN').format(userId.sodu) || 'Sản phẩm không có tên'} đ
                                    </h2>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-orange-100 rounded-lg max-w-md mx-auto">
                            <h2 className="text-2xl font-semibold text-center text-orange-800 mb-6">Đẩy Bài Viết Lên Top</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-orange-700 font-medium">Vị Trí Top:</label>
                                    <input
                                        type="number"
                                        value={top}
                                        onChange={handleTopChange}
                                        min={1}
                                        max={curenttop}
                                        required
                                        className="mt-1 p-2 w-full border text-orange-700 font-bold border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                    {requiredValue && <p className="text-orange-800 mt-2">Bài viết của bạn đang ở top : {curenttop}</p>}
                                    {requiredValue && <p className="text-orange-800 mt-2">Giá trị cần nạp: {requiredValue}</p>}
                                </div>
                                <div className='flex items-center justify-center gap-4'>
                                    <button type="submit" className="w-full bg-orange-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-orange-700">
                                        Đẩy Lên Top
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className=" w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
                                    >
                                        Đóng
                                    </button>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>

    );
};

export default DayTopComponent;
