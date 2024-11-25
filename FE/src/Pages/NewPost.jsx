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
import { useNavigate } from 'react-router-dom';
function NewPost() {
    const [showLocationSelector, setShowLocationSelector] = useState(false);
    const toggleLocationSelector = () => {
        setShowLocationSelector(!showLocationSelector);
    };
    const [showPreview, setShowPreview] = useState(false);
    const { personID, User } = useCart();
    const [images, setImages] = useState([]);
    const [loaiXe,setLoaiXe] = useState([]);
    console.log(loaiXe);
    
    const [formData, setFormData] = useState({
        manguoidung: "",
        magd:"",
        tieuDe: "",
        thongTinLienLac: "",
        moTa: "",
        diaChiBaiViet: "",
        hangXe: "",
        loaiXe: "",
        namMua: "",
        dungTich: "",
        soKmDaDi: "",
        baoHanh: "",
        xuatXu: "",
        tinhTrangXe: "",
        giaBan: "",
        mauXe: "",
        mauSac:"",
        style:"",
        danhSachHinh: "", // Sẽ chứa chuỗi ảnh
    });
    console.log(formData.hangXe);
    
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
            fileObject:file,
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
        // Chỉ cập nhật formData nếu có hình ảnh
        const imageString = images.map((file) => file.fileName).join(",");
        const fileObjects = images.map((file) => file.fileObject);
        // Cập nhật danh sách hình ảnh và file hình ảnh trong formData
        setFormData((prevFormData) => ({
            ...prevFormData,
            danhSachHinh: imageString,
            danhSachFileHinh: fileObjects,
        }));
    }, [images]);

    // Xử lý khi thay đổi form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log("Form data:", formData);
    };
    const handleDropdownChange = (fieldName) => (selectedValue) => {
        setFormData({ ...formData, [fieldName]: selectedValue });
        console.log("Form data:", formData);
    };
    const navigate = useNavigate();
    // Xử lý khi submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        Object.keys(formData).forEach(key => {
            console.log(key, formData[key]);
            if (Array.isArray(formData[key])) {
                formData[key].forEach(item => {
                    console.log(item);
                });
            }
        });

        try {
            const formDataToSend = new FormData();

            // Thêm các trường không phải tệp vào formData
            Object.keys(formData).forEach(key => {
                if (key !== 'danhSachFileHinh') {
                    formDataToSend.append(key, formData[key]);
                }
            });

            // Thêm tệp hình ảnh vào FormData
            formData.danhSachFileHinh.forEach((file) => {
                formDataToSend.append('danhSachFileHinh', file);
            });

            // Thêm token vào header (nếu có)
            const token = localStorage.getItem('authToken'); // Hoặc lấy token từ Context, Redux, v.v.
            
            const response = await apiClient.post('/api/new-post/', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`, 
                },
            });
            navigate('/'); // Chuyển hướng về trang chủ
        } catch (error) {
            console.error('Lỗi khi tạo bài viết:', error.response ? error.response.data : error.message);
        }
    };

      
    // Toggle xem trước
    const togglePreview = () => {
        setShowPreview(!showPreview);
    };
    const [footerPaymentMethods, setFooterPaymentMethods] = useState(formData.moTa); // Lưu trữ nội dung mô tả
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
                        <HangXeSelect onSelect={handleDropdownChange("hangXe")} setLoaiXe={setLoaiXe}/>
                    </div>

                    {/* Loại xe */}
                    <div>
                        <label htmlFor="mauXe" className="block text-sm font-medium text-gray-700">
                            Dòng xe <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="mauXe"
                            name="mauXe"
                            value={formData.mauXe}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        >
                            <option value="" disabled>Chọn dòng xe</option>
                            {loaiXe.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Tiêu đề */}
                    <div>
                        <label htmlFor="mauSac" className="block text-sm font-medium text-gray-700">
                            Màu sắc <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="mauSac"
                            name="mauSac"
                            value={formData.mauSac}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    {/*Năm mua */}
                    <div>
                        <label htmlFor="soKmDaDi" className="block text-sm font-medium text-gray-700">
                            Năm mua:
                        </label>
                        <input
                            type="number"
                            id="namMua"
                            name="namMua"
                            value={formData.namMua}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    {/* Dung tích */}
                    <div>
                        <DungTichSelect onSelect={handleDropdownChange("dungTich")} />
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
                    {/* Bảo hành */}
                    <div>
                        <label htmlFor="loaiXe" className="block text-sm font-medium text-gray-700">
                           Loại xe
                        </label>
                        <select
                            id="loaiXe"
                            name="loaiXe"
                            value={formData.loaiXe}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="" disabled>Chọn loại xe</option>
                            <option value="1">Xe số</option>
                            <option value="2">Xe tay ga</option>
                            <option value="3">Xe côn </option>
                            <option value="4">Xe phân khối lớn</option>
                        </select>
                    </div>
                    {/* Bảo hành */}
                    <div>
                        <label htmlFor="loaiXe" className="block text-sm font-medium text-gray-700">
                           Phong cách
                        </label>
                        <select
                            id="loaiXe"
                            name="loaiXe"
                            value={formData.loaiXe}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="" disabled>Chọn Style</option>
                            <option value="Thể Thao">Thể Thao</option>
                            <option value="Đặc Biệt">Đặc Biệt</option>
                            <option value="Cao Cấp">Cao Cấp </option>
                            <option value="Tiêu Chuẩn">Tiêu Chuẩn</option>
                        </select>
                    </div>
                    {/* Xuất xứ */}
                    <div>
                        <XuatXuSelect onSelect={handleDropdownChange("xuatXu")} xuatXu={''} />
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

export default NewPost;
