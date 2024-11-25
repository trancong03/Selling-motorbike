import { ImagePlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import LocationSelector from "../Components/ui/LocationSelector";
import { useCart } from "../Components/context/CardContext";
import DungTichSelect from "../Components/newpost/DungTichSelect ";
import NamMuaSelect from "../Components/newpost/namMuaSelect";
import XuatXuSelect from './../Components/newpost/XuatXuSelect';
import HangXeSelect from './../Components/newpost/HangXeSelect';
import XemTruoc from "../Components/newpost/XemTruoc";
import apiClient from './../../services/apiclient';
import { Editor } from "@tinymce/tinymce-react";
import { useLocation, useNavigate } from 'react-router-dom';
function UpdatePost() {
    const [post, setPost] = useState(null);
    const [formData, setFormData] = useState({
        maBaiViet: '',
        magd: '',
        tieuDe: '',
        thongTinLienLac: '',
        moTa: '',
        diaChiBaiViet: '',
        hangXe: '',
        loaiXe: '',
        namMua: '',
        dungTich: '',
        soKmDaDi: '',
        baoHanh: '',
        xuatXu: '',
        tinhTrangXe: '',
        giaBan: '',
        danhSachHinh: '',
    });
    const [images, setImages] = useState([]);
    const location = useLocation();
    const { product } = location.state || {};
    
    useEffect(() => {
        if (product) {
            const initImages = product.HINHANH.map((file) => ({
                fileObject: null,
                fileName: file.TENFILE,
                preview: `http://127.0.0.1:8000//media/images/${file.TENFILE}`,
            }));
            setImages(initImages);
        }
    }, [product]);  // Cập nhật images khi product thay đổi

    useEffect(() => {
        if (!product) return;  // Nếu không có product, không thực hiện fetch
        const fetchPost = async () => {
            const response = await fetch(`http://127.0.0.1:8000/api/post-id/${product.MABAIVIET}`);
            const data = await response.json();
            setPost(data);
        };
        fetchPost();
    }, [product]);

    useEffect(() => {
        if (post) {
            console.log(post);
            
            const DANHSACHHINH = product.HINHANH.map((file) => file.TENFILE).join(",");
            setFormData({
                maBaiViet: post?.mabaiviet || '', 
                magd: post?.magd || '',
                tieuDe: post?.tieude || '',
                thongTinLienLac: post?.thongtinlienlac || '',
                moTa: post?.mota || '',
                diaChiBaiViet: post?.diachibaiviet || '',
                hangXe: post?.hangxe || '',
                loaiXe: post?.loaixe || '',
                namMua: post?.nammua || '',
                dungTich: post?.dungtich || '',
                soKmDaDi: post?.sokmdadi || '',
                baoHanh: post?.baohanh || '',
                xuatXu: post?.xuatxu || '',
                tinhTrangXe: post?.tinhtrangxe || '',
                giaBan: post?.giaban|| '',
                danhSachHinh: DANHSACHHINH,  
            });
        }
    }, [post]);  

    const [showLocationSelector, setShowLocationSelector] = useState(false);
    const toggleLocationSelector = () => {
        setShowLocationSelector(!showLocationSelector);
    };
    const [showPreview, setShowPreview] = useState(false);
    const { personID, User } = useCart();
    const updatediachi = (diachi) => {
        setFormData({
            ...formData,
            diaChiBaiViet: diachi
        });
        toggleLocationSelector();
    };
    useEffect(() => {
    }, [formData.diaChiBaiViet]);

    useEffect(() => {
        // Only update formData if personID is available
        if (personID) {
            setFormData(prevData => ({
                ...prevData,
                manguoidung: personID
            }));
        }
    }, [personID]);
    // Xử lý khi chọn ảnh
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 10 || images.length + files.length > 10) {
            alert("Bạn chỉ được chọn tối đa 10 ảnh.");
            return;
        }
        const newImages = files.map((file) => ({
            fileObject: file,
            fileName: file.name,
            preview: URL.createObjectURL(file),
        }));

        setImages((prev) => [...prev, ...newImages]);

    };

    // Xóa ảnh đã chọn
    const handleRemoveImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);

    };
    useEffect(() => {
        const imageString = images.map((file) => file.fileName).join(",");
        const fileObjects = images.map((file) => file.fileObject);
        setFormData((prevFormData) => ({
            ...prevFormData,
            danhSachHinh: imageString,
            danhSachFileHinh: fileObjects,
        }));
    }, [images]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleDropdownChange = (fieldName) => (selectedValue) => {
        setFormData({ ...formData, [fieldName]: selectedValue });
    };
    const navigate = useNavigate();
    // Xử lý khi submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                if (key !== 'danhSachFileHinh' && formData[key] !== undefined && formData[key] !== null) {
                    if (Array.isArray(formData[key])) {
                        formDataToSend.append(key, JSON.stringify(formData[key]));
                    } else {
                        formDataToSend.append(key, formData[key]);
                    }
                }
            });

            // Thêm danh sách tệp hình
            if (formData.danhSachFileHinh && Array.isArray(formData.danhSachFileHinh)) {
                formData.danhSachFileHinh.forEach(file => {
                    if (file instanceof File) {
                        formDataToSend.append('danhSachFileHinh[]', file);
                    }
                });
            }

            // Gửi dữ liệu
            const token = localStorage.getItem('authToken');
            const response = await apiClient.post('/api/update-post/', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('Cập nhật thành công:', response.data);
        } catch (error) {
            if (error.response) {
                console.error('Lỗi phía server:', error.response.data);
            } else if (error.request) {
                console.error('Không nhận được phản hồi từ server:', error.request);
            } else {
                console.error('Lỗi thiết lập yêu cầu:', error.message);
            }
        }
    };

    // Toggle xem trước
    const togglePreview = () => {
        setShowPreview(!showPreview);
    };
    return (
        <div>
            <form className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg "
                onSubmit={handleSubmit}>
                {/* Phần hình ảnh */}
                <label className="block text-lg font-medium mb-2">Hình ảnh và Video sản phẩm</label>
                <div className="mb-8 flex items-center justify-betweens">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center w-1/2 h-[30vh]">
                        <p className="text-gray-500">Đăng 1 tới 10 hình ảnh hợp lệ</p>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="hidden"
                            id="upload-images"
                        />
                        <label
                            htmlFor="upload-images"
                            className="mt-4 px-4 py-2 rounded-md cursor-pointer inline-block"
                        >
                            <ImagePlus className="text-orange-400" size={100} />
                        </label>
                    </div>
                    {/* Hiển thị preview hình ảnh */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 w-1/2">
                        {images.map((image, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={image.preview}
                                    alt={`preview-${index}`}
                                    className="w-full h-32 object-cover rounded-md"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full p-1"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    {/* Tiêu đề */}
                    <div>
                        <label htmlFor="tieuDe" className="block text-sm font-medium text-gray-700">
                            Tiêu đề <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="tieuDe"
                            name="tieuDe"
                            value={formData.tieuDe}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>


                    {/* Thông tin liên lạc */}
                    <div>
                        <label htmlFor="thongTinLienLac" className="block text-sm font-medium text-gray-700">
                            Thông tin liên lạc
                        </label>
                        <input
                            type="text"
                            id="thongTinLienLac"
                            name="thongTinLienLac"
                            value={formData.thongTinLienLac}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Hãng xe */}
                    <div>
                        <HangXeSelect onSelect={handleDropdownChange("hangXe")} hangxe={post?.hangxe || ''} />
                    </div>

                    {/* Loại xe */}
                    <div>
                        <label htmlFor="loaiXe" className="block text-sm font-medium text-gray-700">
                            Loại xe <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="loaiXe"
                            name="loaiXe"
                            value={formData.loaiXe}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        >
                            <option value="" disabled>Chọn loại xe</option>
                            <option value="Tay ga">Tay ga</option>
                            <option value="Xe số">Xe số</option>
                            <option value="Xe côn/moto">Xe côn/moto</option>
                        </select>
                    </div>


                    {/* Năm đăng ký */}
                    <div>
                        <NamMuaSelect onSelect={handleDropdownChange("namMua")} nammua={post?.nammua.toString() || ''} />
                    </div>

                    {/* Dung tích */}
                    <div>
                        <DungTichSelect onSelect={handleDropdownChange("dungTich")} dungtich={post?.dungtich|| ''}/>
                    </div>


                    {/* Số km đã đi */}
                    <div>
                        <label htmlFor="soKmDaDi" className="block text-sm font-medium text-gray-700">
                            Số Km đã đi
                        </label>
                        <input
                            type="number"
                            id="soKmDaDi"
                            name="soKmDaDi"
                            value={formData.soKmDaDi}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Bảo hành */}
                    <div>
                        <label htmlFor="baoHanh" className="block text-sm font-medium text-gray-700">
                            Bảo hành
                        </label>
                        <select
                            id="baoHanh"
                            name="baoHanh"
                            value={formData.baoHanh}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="" disabled>Chọn bảo hành</option>
                            <option value="Bảo hành chính hãng">Bảo hành chính hãng</option>
                            <option value="Không bảo hành">Không bảo hành</option>
                        </select>
                    </div>

                    {/* Xuất xứ */}
                    <div>
                        <XuatXuSelect onSelect={handleDropdownChange("xuatXu")} xuatXu={post?.xuatxu || ''} />
                    </div>

                    {/* Tình trạng xe */}
                    <div>
                        <label htmlFor="tinhTrangXe" className="block text-sm font-medium text-gray-700">
                            Tình trạng xe
                        </label>
                        <select
                            id="tinhTrangXe"
                            name="tinhTrangXe"
                            value={formData.tinhTrangXe}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="Mới">Mới</option>
                            <option value="Đã sử dụng">Đã sử dụng</option>
                        </select>
                    </div>


                    {/* Giá bán */}
                    <div>
                        <label htmlFor="giaBan" className="block text-sm font-medium text-gray-700">
                            Giá bán
                        </label>
                        <input
                            type="number"
                            id="giaBan"
                            name="giaBan"
                            value={formData.giaBan}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                </div>

                {/* Tiêu đề và mô tả */}
                <div className="mb-6">
                    <label className="block font-medium mb-1">
                        Mô tả chi tiết <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <Editor
                            apiKey="4u15wmtfgj5kkf159xm91c0j8n6rbc4k4gst12ittmzuqo53"
                            value={formData.moTa}
                            onEditorChange={(content) =>
                                setFormData((prev) => ({ ...prev, moTa: content }))
                            }
                            init={{
                                height: 300,
                                menubar: false,
                                plugins: [

                                ],
                                toolbar: false,
                                statusbar: false
                            }}
                        />
                        <span className="absolute bottom-1 right-2 text-sm text-gray-500">
                            {formData.moTa.length}/1500
                        </span>
                    </div>
                </div>

                <div className="mb-6 ">
                    <label className="block font-medium mb-1">
                        Địa chỉ giao dịch <span className="text-red-500">*</span>
                    </label>
                    <div className='flex text-slate-500'>
                        <input
                            type="text"
                            name="diaChiBaiViet"
                            value={formData.diaChiBaiViet}  // Bind the value to the state
                            onChange={handleChange} // Handle change for other fields
                            onClick={toggleLocationSelector}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-center gap-4 ">
                    {/* Nút Xem trước */}
                    <button
                        type="button"
                        onClick={togglePreview}
                        className="w-80  font-semibold p-3 border border-solid rounded-md bg-white hover:bg-slate-300"
                    >
                        Xem trước
                    </button>

                    {/* Nút submit */}
                    <button
                        type="submit"
                        className="w-80  font-semibold p-3 rounded-md bg-orange-300 hover:bg-orange-500 text-white"
                    >
                        Đăng tin
                    </button>
                </div>
            </form>
            {showLocationSelector && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-md w-[50vw] relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500"
                            onClick={toggleLocationSelector}
                            style={{ fontSize: '2.5rem' }}  // Kích thước tùy chỉnh
                        >
                            &times;
                        </button>
                        <LocationSelector updatediachi={updatediachi} /> {/* Hiển thị component LocationSelector */}
                    </div>
                </div>
            )}
            {showPreview && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={togglePreview}>
                    <div

                        className="bg-white p-6 rounded-md w-auto max-h-[90vh] overflow-y-auto"
                    >
                        <XemTruoc product={formData} user={User} imageReview={images} />
                        <button
                            type="button"
                            onClick={togglePreview}
                            className="  mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default UpdatePost;
