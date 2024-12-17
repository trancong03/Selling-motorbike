import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ExtendPostComponent = ({ product, onExtend, onClose }) => {
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
        onExtend({ product, selectedVoucher });
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
        if (!selectedVoucher && giaodich.length > 0) {
            setSelectedVoucher(voucher.MALOAIGIAODICH);
        } else {
            setSelectedVoucher(voucher.MALOAIGIAODICH);
        }
    };


    return (
        <div className="right-1 mt-2 w-[100vw] h-auto bg-white rounded-lg shadow-xl border border-gray-200">
            <div className="p-4">
                <label htmlFor="newExpiryDate" className="block text-3xl text-gray-800">Bài Viết của bạn:</label>
                <div className='flex justify-center items-center gap-8'>
                    <div className='w-1/3 border shadow-sm p-2'>
                        {/* Description */}
                        <div className="flex flex-col items-start w-full p-5">
                            <div dangerouslySetInnerHTML={{ __html: product.MOTA }} />
                        </div>

                        {/* Thumbnails */}
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

                                {/* Main Image */}
                                <div className="mt-4 flex-1">
                                    <img
                                        src={`http://127.0.0.1:8000/media/images/${images[currentIndex].TENFILE}`}
                                        alt={`Main Image`}
                                        className="w-full max-h-[70vh] rounded-md object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-2/3 min-h-[80vh] bg-white rounded-lg shadow-xl border border-gray-200'>
                        <h1 className="text-2xl font-bold text-gray-800 text-center m-4">Gói gia hạn thường</h1>
                        <div className="grid grid-cols-2 gap-6 p-4 ml-[10%] mr-[10%]">
                            {giaodich?.map((voucher) => (
                                <div
                                    key={voucher.MALOAIGIAODICH}
                                    className="flex items-center p-4 gap-8 bg-white border rounded-lg shadow-md mb-4"
                                >
                                    {/* Radio button */}
                                    <input
                                        type="radio"
                                        name="voucher"
                                        value={voucher.MALOAIGIAODICH}
                                        checked={selectedVoucher === voucher.MALOAIGIAODICH}
                                        onChange={() => handleRadioChange(voucher)}
                                        className="w-5 h-5 text-red-600 focus:ring-red-600 mr-3"
                                    />
                                    {/* Nội dung bên trái */}
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
