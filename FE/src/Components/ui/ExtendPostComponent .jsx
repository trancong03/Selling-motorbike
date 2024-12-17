import React, { useState, useEffect } from 'react';
import { MapPin, Car, Calendar, BatteryCharging, CheckCircle, Tag, Box, Shield, EllipsisVertical, DeleteIcon, Settings2, ArrowDownToDot, User } from 'lucide-react';
const ExtendPostComponent = ({ product, userId, onExtend, onClose }) => {
    const images = product.HINHANH;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [giaodich, setGiaodich] = useState([]);
    const [selectedVoucher, setSelectedVoucher] = useState(() => {
        return giaodich.length > 0 ? giaodich[0].MALOAIGIAODICH : null;
    });

    // Function to handle image update
    const updateMainImage = (index) => {
        setCurrentIndex(index);
    };

    // Function to handle form submission
    const handleSubmit = () => {
        if (!selectedVoucher) {
            alert("Vui lòng chọn một gói gia hạn trước khi tiếp tục.");
            return;
        }

        // Lấy thông tin gói gia hạn đã chọn
        const selectedGiaoDich = giaodich.find(voucher => voucher.MALOAIGIAODICH === selectedVoucher);

        if (!selectedGiaoDich) {
            alert("Gói gia hạn không hợp lệ.");
            return;
        }

        // Kiểm tra số dư
        if (userId.sodu < selectedGiaoDich.SOTIEN) {
            alert("Số dư của bạn không đủ để gia hạn. Vui lòng nạp thêm tiền.");
            return;
        }

        const confirmExtend = window.confirm("Bạn có chắc chắn muốn gia hạn không?");
        if (confirmExtend) {
            onExtend({ product, selectedVoucher });
        }
    };


    // Function to fetch giao dich
    const fetchGiaoDich = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/get_all_giao_dich/');
            if (!response.ok) {
                throw new Error('Failed to fetch giao dich');
            }
            const data = await response.json();
            setGiaodich(data); // Save data into state
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchGiaoDich();
    }, []);

    const handleRadioChange = (voucher) => {
        setSelectedVoucher(voucher.MALOAIGIAODICH);
    };
console.log(userId);

    return (
        <div className="right-1 mt-2 w-[100vw] h-auto bg-white rounded-lg shadow-xl border border-gray-200">
            <div className="p-4">
                <label htmlFor="newExpiryDate" className="block text-3xl text-gray-800">Bài Viết của bạn:</label>
                <div className='flex justify-center items-center gap-8'>
                    <div className='w-1/3 border shadow-sm p-2'>
                        <div className="flex flex-col items-start w-full p-5">
                            <div dangerouslySetInnerHTML={{ __html: product.MOTA }} />
                        </div>

                        <div className="flex items-start justify-between w-full bg-slate-100/50">
                            <div className="flex items-start justify-start gap-4 w-full min-h-[45vh]">
                                <div className="flex flex-col gap-4 !w-[80px] h-[80px] m-4">
                                    {images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={`http://127.0.0.1:8000/media/images/${image.TENFILE}`}
                                            alt={`Thumbnail ${index + 1}`}
                                            className={`w-full h-full cursor-pointer border-2 rounded-md transition ${index === currentIndex ? "border-yellow-500" : "border-transparent"}`}
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
                                        className="w-full max-h-[70vh] rounded-md object-cover"
                                    />
                                </div>
                            </div>
                           
                        </div>
                        {/* Product Details */}
                        <div className="relative flex flex-col items-start w-full mt-3 m-5"> {/* Added margin-bottom */}
                            <h2 className="text-xl font-bold mt-3 text-red-800 mb-5">
                                {new Intl.NumberFormat('vi-VN').format(product.GIABAN) || 'Sản phẩm không có tên'} đ
                            </h2>

                            <h2 className="text-lg font-bold">Thông số kỹ thuật</h2>
                            <div className="grid grid-cols-2 gap-4 text-sm w-full">
                                <div className="flex items-center">
                                    <Car className="mr-2" />
                                    <h3 className="line-clamp-3">Hãng xe: {product.HANGXE || 'Sản phẩm không có tên'}</h3>
                                </div>
                                <div className="flex items-center">
                                    <Tag className="mr-2" />
                                    <h3 className="line-clamp-3">Loại xe: {product.LOAIXE || 'Sản phẩm không có tên'}</h3>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="mr-2" />
                                    <h3 className="line-clamp-3">Năm mua: {product.NAMMUA || 'Sản phẩm không có tên'}</h3>
                                </div>
                                <div className="flex items-center">
                                    <BatteryCharging className="mr-2" />
                                    <h3 className="line-clamp-3">Dung tích: {product.DUNGTICH || 'Sản phẩm không có tên'}</h3>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="mr-2" />
                                    <h3 className="line-clamp-3">Số km: {product.SOKMDADI || 'Sản phẩm không có tên'}</h3>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className="mr-2" />
                                    <h3 className="line-clamp-3">Tình Trạng: {product.TINHTRANGXE || 'Sản phẩm không có tên'}</h3>
                                </div>
                                <div className="flex items-center">
                                    <Box className="mr-2" />
                                    <h3 className="line-clamp-3">Xuất xứ: {product.XUATXU || 'Sản phẩm không có tên'}</h3>
                                </div>
                                <div className="flex items-center">
                                    <Shield className="mr-2" />
                                    <h3 className="line-clamp-3">{product.BAOHANH || 'Sản phẩm không có tên'}</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-2/3 min-h-[80vh] bg-white rounded-lg shadow-xl border border-gray-200'>
                        {/* Seller Info */}
                        <div className="flex items-center space-x-4">
                            <img
                                src={userId.anhdaidien ? `http://127.0.0.1:8000/media/images/${userId.anhdaidien}` : "http://127.0.0.1:8000/media/images/icon.png"}
                                alt="User avatar"
                                className="w-16 h-16 rounded-full border-4 border-gray-300 shadow-lg"
                            />
                            <div className="flex-1">
                                <div className="font-medium text-gray-800 text-lg">{userId.hoten}</div>
                                <div className="font-medium text-gray-700 text-lg mt-2">
                                    <h2 className="text-xl font-bold">
                                        Số dư:
                                        {new Intl.NumberFormat('vi-VN').format(userId.sodu) || 'Sản phẩm không có tên'} đ
                                    </h2>
                                </div>
                            </div>
                        </div>

                        <h1 className="text-2xl font-bold text-gray-800 text-center m-4">Gói gia hạn thường</h1>
                        <div className="grid grid-cols-2 gap-6 p-4 ml-[10%] mr-[10%]">
                            {giaodich?.map((voucher) => (
                                <div
                                    key={voucher.MALOAIGIAODICH}
                                    className="flex items-center p-4 gap-8 bg-white border rounded-lg shadow-md mb-4"
                                >
                                    <input
                                        type="radio"
                                        name="voucher"
                                        value={voucher.MALOAIGIAODICH}
                                        checked={selectedVoucher === voucher.MALOAIGIAODICH}
                                        onChange={() => handleRadioChange(voucher)}
                                        className="w-5 h-5 text-red-600 focus:ring-red-600 mr-3"
                                    />
                                    <div className="flex-1 border-r-2 border-r-red-600 border-dashed pr-4">
                                        <h3 className="text-lg font-bold text-red-600">{voucher.MALOAIGIAODICH}</h3>
                                        <p className="text-lg text-gray-700">{voucher.TENLOAIGIAODICH}</p>
                                        <p className="text-lg text-gray-700">Giá gói:  {new Intl.NumberFormat('vi-VN').format(voucher.SOTIEN || 'Sản phẩm không có tên')} đ</p>
                                        <p className="text-lg text-gray-700">Thời hạn : {voucher.SONGAY} ngày</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='flex items-center justify-center gap-8 '>
                            <button
                                onClick={handleSubmit}
                                className="mt-2 w-40 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                            >
                                Gia hạn
                            </button>
                            <button
                                onClick={onClose}
                                className="mt-2 w-40 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExtendPostComponent;
