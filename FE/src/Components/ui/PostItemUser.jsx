import { useState, useEffect, useRef } from "react";
import { MapPin, Car, Calendar, BatteryCharging, CheckCircle, Tag, Box, Shield, EllipsisVertical, DeleteIcon, Settings2, ArrowDownToDot, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ExtendPostComponent from './ExtendPostComponent ';
import ErrorBoundary from './../../ErrorBoundary';
import DayTopComponent from "./DayTopComponent";
export default function PostItemUser({ product, userId }) {
    const navigate = useNavigate();
    const images = product.HINHANH;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [footerPaymentMethods, setFooterPaymentMethods] = useState(product.MOTA);
    const [openMenus, setOpenMenus] = useState({});

    // Ref for the menu container
    const menuRef = useRef(null);

    // Function to toggle the menu
    const toggleMenu = (postId) => {
        setOpenMenus((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId],
        }));
    };
    // Function to handle clicks outside the menu to close it
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setOpenMenus({});
        }
    };

    useEffect(() => {
        // Add event listener for clicks outside of the menu
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const deletePost = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/delete-post/${product.MABAIVIET}/`);
            if (!response.ok) {
                throw new Error(`API request failed with status: ${response.status}`);
            }
            setError(error.message);  
        } finally {
            setLoading(false); 
    };
    }

    
    const handleDelete = () => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
        if (confirmed) {
            deletePost();
            window.location.reload()
        } else {
            console.log('Hủy bỏ xóa');
        }
    };

    const handleEdit = ({ product }) => {
        navigate('/update-post', { state: { product } });
    };

    const updateMainImage = (index) => {
        setCurrentIndex(index);
    };

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
    const calculateDateExprice = (date) => {
        const currentDate = new Date();
        const targetDate = new Date(date);
        if (isNaN(targetDate)) {
            throw new Error('Invalid date format');
        }

        const timeDifference = targetDate - currentDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        return daysDifference;
    };

    if (!product) {
        return <p>Không tìm thấy sản phẩm.</p>;
    }
    const [showExtendComponent, setShowExtendComponent] = useState(false);
    const [showTopComponent, setShowTopComponent] = useState(false);


    const handleExtend = async ({ product, selectedVoucher }) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/day-tin/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    MANGUOIDUNG: product.MANGUOIDUNG, // Mã người dùng
                    MALOAIGIAODICH: selectedVoucher,  // Mã loại giao dịch (voucher)
                    MABAIVIET: product.MABAIVIET,     // Mã bài viết
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json(); // Xử lý kết quả từ server
            console.log('Gia hạn thành công:', data);

            // Ẩn component sau khi gia hạn thành công
            setShowExtendComponent(false);
            setShowTopComponent(false)
            window.location.reload();
        } catch (error) {
            console.error('Lỗi khi gọi API gia hạn:', error);
        }
    };

    const handleclose = ({ product }) => {
        setShowExtendComponent(false); // Ẩn component sau khi gia hạn
        setShowTopComponent(false)
    };
    return (
        <div className="ml-[150px] bg-white rounded-lg shadow-md overflow-hidden !text-lg w-[70%]">
            <div className="flex items-center justify-between p-4 bg-slate-200">
                {/* Seller Info */}
                <div className="flex items-center space-x-4">
                    <img
                        src={userId.anhdaidien ? `http://127.0.0.1:8000/media/images/${userId.anhdaidien}` : "http://127.0.0.1:8000//media/images/icon.png"}
                        alt="User avatar"
                        className="w-12 h-12 rounded-full border-2 border-gray-300"
                    />
                    <div className="flex-1">
                        <div className="font-medium text-gray-700 text-lg">{userId.hoten}</div>
                        <div className="flex items-center text-sm text-gray-500">
                            <div className="mr-4">{calculateDateDifference(product.NGAYDANG)} ngày trước</div>
                            {product.status && product.status === 1 ? null : (
                                <h1 className="ml-4 text-red-500 font-bold bg-red-100 px-2 py-1 rounded">
                                    Đã hết hạn
                                </h1>
                            )}
                        </div>


                    </div>
                </div>

                {/* Dropdown Menu */}
                <div className="relative" ref={menuRef}>
                    <EllipsisVertical
                        onClick={() => toggleMenu(product.MABAIVIET)}
                        className="h-6 w-6 text-gray-600 hover:text-amber-500 cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
                    />
                    {openMenus[product.MABAIVIET] && (
                        <div className="absolute top-full right-1 mt-2 w-44 bg-white rounded-lg shadow-xl border border-gray-200 max-h-60 overflow-y-auto z-50">
                            <ul className="py-0 items-start flex justify-center flex-col">
                                <li
                                    className="px-4 py-2 text-gray-800 hover:bg-slate-300 hover:text-gray-900 cursor-pointer"
                                    onClick={() => handleEdit({ product })}
                                >
                                    <span className="flex text-sm items-center justify-center gap-2"> <Settings2 /> Sửa bài viết</span>
                                </li>
                                <li
                                    className="px-4 py-2 text-gray-800 hover:bg-slate-300 hover:text-gray-900 cursor-pointer"
                                    onClick={() => setShowTopComponent(true)}
                                >
                                    <span className="flex text-sm items-center justify-center gap-2"> <Settings2 /> Đẩy lên top</span>
                                </li>
                                <li
                                    className="px-4 py-2 text-gray-800 hover:bg-slate-300 hover:text-red-700 cursor-pointer"
                                    onClick={handleDelete}
                                >
                                    <span className="flex text-sm items-center justify-center gap-2"> <DeleteIcon /> Xóa bài viết</span>
                                </li>
                                {product.status !== 1 && (
                                    <li
                                        className="px-4 py-2 text-gray-800 hover:bg-slate-300 hover:text-green-700 cursor-pointer"
                                        onClick={() => setShowExtendComponent(true)} // Khi nhấn, hiển thị component absolute
                                    >
                                        <span className="flex text-sm items-center justify-center gap-2">
                                            <ArrowDownToDot /> Gia hạn bài viết
                                        </span>
                                    </li>
                                )}

                                

                            </ul>
                        </div>
                    )}

                </div>
            </div>

            {/* Description */}
            <div className="flex flex-col items-start w-full p-5 text-sm">
                <div dangerouslySetInnerHTML={{ __html: product.MOTA }} />
            </div>

            {/* Thumbnails */}
            <div className="flex items-start justify-between w-full mb-4 bg-slate-100/50"> {/* Added margin-bottom */}
                <div className="flex items-start justify-start gap-4 w-full min-h-[45vh]"> {/* Changed fixed height to min-h */}
                    <div className="flex flex-col gap-4 !w-[80px] h-[80px] m-4"> {/* Fixed size for the thumbnail container */}
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={`http://127.0.0.1:8000/media/images/${image.TENFILE}`}
                                alt={`Thumbnail ${index + 1}`}
                                className={`w-full h-full cursor-pointer border-2 rounded-md transition ${index === currentIndex ? "border-yellow-500" : "border-transparent"}`}
                                onClick={() => updateMainImage(index)}
                                onMouseEnter={() => updateMainImage(index)}  // Update image on hover
                                style={{ objectFit: 'cover' }}  // Ensures no stretching
                            />
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="mt-4 flex-1 mr-10">
                        <img
                            src={`http://127.0.0.1:8000/media/images/${images[currentIndex].TENFILE}`}
                            alt={`Main Image`}
                            className="w-[80%] max-h-[50vh] rounded-md object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Product Details */}
            <div className="relative flex flex-col items-start w-full mt-3 m-5"> {/* Added margin-bottom */}
                <h2 className="text-3xl font-bold mt-3 text-red-800 mb-5">
                    {new Intl.NumberFormat('vi-VN').format(product.GIABAN) || 'Sản phẩm không có tên'} đ
                </h2>

                <h2 className="text-xl font-bold mb-3">Thông số kỹ thuật</h2>
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
            <div className="m-4 text-sm">* Bài viết sẽ hết hạn sau {calculateDateExprice(product.NGAYHETHAN)} ngày </div>

            {showExtendComponent && (
                <div className="absolute z-100 top-0 left-0 w-70% h-90%">
                    <ErrorBoundary>
                        <ExtendPostComponent
                            product={product}
                            userId ={userId}
                            onExtend={handleExtend}
                            onClose={handleclose}
                        />
                    </ErrorBoundary>
                   
                </div>
            )}
            {showTopComponent && (
                <div className="absolute z-100 top-0 left-0 w-70% h-90%">
                    <ErrorBoundary>
                        <DayTopComponent
                            product={product}
                            userId={userId}
                            onClose={handleclose}
                        />
                    </ErrorBoundary>

                </div>
            )}

        </div> 

    );
}
