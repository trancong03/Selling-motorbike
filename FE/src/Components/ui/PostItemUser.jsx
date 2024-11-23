import { useState, useEffect, useRef } from "react";
import { MapPin, Car, Calendar, BatteryCharging, CheckCircle, Tag, Box, Shield, EllipsisVertical, DeleteIcon, Settings2 } from 'lucide-react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
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

    const handleDelete = () => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
        if (confirmed) {
            console.log('Xóa');
            // Thực hiện hành động xóa tại đây (ví dụ: gọi API để xóa sản phẩm)
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

    if (!product) {
        return <p>Không tìm thấy sản phẩm.</p>;
    }
    // Cấu hình Modal
    Modal.setAppElement('#root'); // Đảm bảo rằng Modal chỉ hiển thị khi có phần tử root

    const DeleteModal = ({ isOpen, onConfirm, onCancel }) => (
        <Modal isOpen={isOpen} onRequestClose={onCancel} contentLabel="Xác nhận xóa" className="modal" overlayClassName="overlay">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Bạn có chắc chắn muốn xóa sản phẩm này?</h2>
            <p className="text-gray-600 mb-6">Hành động này không thể hoàn tác.</p>
            <div className="flex justify-between">
                <button onClick={onCancel} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none">
                    Hủy bỏ
                </button>
                <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none">
                    Xóa
                </button>
            </div>
        </Modal>
    );
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleConfirmDelete = () => {
        console.log('Xóa sản phẩm');
        closeModal();
    };
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden !text-lg">
            <div className="flex items-center justify-between p-4 bg-slate-200">
                {/* Seller Info */}
                <div className="flex items-center space-x-4">
                    <img
                        src={userId.anhdaidien ? `http://127.0.0.1:8000//media/images/${userId.anhdaidien}` : "http://127.0.0.1:8000//media/images/icon.png"}
                        alt="User avatar"
                        className="w-12 h-12 rounded-full border-2 border-gray-300"
                    />
                    <div className="flex-1">
                        <div className="font-medium text-gray-700 text-lg">{userId.hoten}</div>
                        <div className="flex items-center text-sm text-gray-500">
                            <div className="mr-4">{calculateDateDifference(product.NGAYDANG)} ngày trước</div>
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
                        
                        <div className="absolute top-full right-1 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-200 max-h-60 overflow-y-auto z-50">
                            <ul className="py-0">
                                <li
                                    className="px-4 py-2 text-gray-800 hover:bg-slate-300 hover:text-gray-900 cursor-pointer"
                                    onClick={() => handleEdit({ product })}
                                >
                                    <span className=" flex text-sm items-center justify-center gap-2"> <Settings2 /> Sửa bài viết</span>
                                </li>
                                <li
                                    className="px-4 py-2 text-gray-800 hover:bg-slate-300 hover:text-red-700 cursor-pointer"
                                    onClick={handleDelete}
                                >
                               
                                    <span className=" flex text-sm items-center justify-center gap-2"> <DeleteIcon /> Xóa bài viết</span>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Description */}
            <div className="flex flex-col items-start w-full p-5">
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
                <h2 className="text-3xl font-bold mt-3 text-red-800 mb-5">
                    {new Intl.NumberFormat('vi-VN').format(product.GIABAN) || 'Sản phẩm không có tên'} đ
                </h2>

                <h2 className="text-xl font-bold">Thông số kỹ thuật</h2>
                <div className="grid grid-cols-2 gap-4 text-lg w-full">
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

    );
}
