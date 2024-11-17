import { ImagePlus } from "lucide-react";
import React, { useState } from "react";
import LocationSelector from "../Components/ui/LocationSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

function NewPost() {
    const [showLocationSelector, setShowLocationSelector] = useState(false);
    const toggleLocationSelector = () => {
        setShowLocationSelector(!showLocationSelector);
    };
    const [images, setImages] = useState([]);
    const [formData, setFormData] = useState({
        tinhTrang: "Đã sử dụng",
        hangXe: "",
        namDangKy: "",
        loaiXe: "",
        dungTich: "",
        bienSo: "",
        xuatXu: "",
        soKm: "",
        giaBan: "",
        tieuDe: "",
        moTa: "",
        diachibaiviet:""
    });
    // Xử lý khi chọn ảnh
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 10 || images.length + files.length > 10) {
            alert("Bạn chỉ được chọn tối đa 10 ảnh.");
            return;
        }
        const newImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setImages((prev) => [...prev, ...newImages]);
    };

    // Xóa ảnh đã chọn
    const handleRemoveImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    // Xử lý khi thay đổi form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Xử lý khi submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data:", formData);
        console.log("Images:", images);
        // Xử lý upload form và hình ảnh tại đây
    };

    return (
        <form className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg"
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
                       <ImagePlus className="text-orange-400" size={100}/>
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


            {/* Thông tin chi tiết */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {/* Hãng xe */}
                <div>
                    <label htmlFor="hangXe" className="block text-sm font-medium text-gray-700">
                        Hãng xe <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="hangXe"
                        name="hangXe"
                        value={formData.hangXe}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    />
                </div>

                {/* Năm đăng ký */}
                <div>
                    <label htmlFor="namDangKy" className="block text-sm font-medium text-gray-700">
                        Năm đăng ký <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        id="namDangKy"
                        name="namDangKy"
                        value={formData.namDangKy}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    />
                </div>

                {/* Loại xe */}
                <div>
                    <label htmlFor="loaiXe" className="block text-sm font-medium text-gray-700">
                        Loại xe <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="loaiXe"
                        name="loaiXe"
                        value={formData.loaiXe}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    />
                </div>

                {/* Dung tích xe */}
                <div>
                    <label htmlFor="dungTich" className="block text-sm font-medium text-gray-700">
                        Dung tích xe
                    </label>
                    <input
                        type="text"
                        id="dungTich"
                        name="dungTich"
                        value={formData.dungTich}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Biển số xe */}
                <div>
                    <label htmlFor="bienSo" className="block text-sm font-medium text-gray-700">
                        Biển số xe
                    </label>
                    <input
                        type="text"
                        id="bienSo"
                        name="bienSo"
                        value={formData.bienSo}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Xuất xứ */}
                <div>
                    <label htmlFor="xuatXu" className="block text-sm font-medium text-gray-700">
                        Xuất xứ
                    </label>
                    <input
                        type="text"
                        id="xuatXu"
                        name="xuatXu"
                        value={formData.xuatXu}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Số KM đã đi */}
                <div>
                    <label htmlFor="soKm" className="block text-sm font-medium text-gray-700">
                        Số Km đã đi
                    </label>
                    <input
                        type="number"
                        id="soKm"
                        name="soKm"
                        value={formData.soKm}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Giá bán */}
                <div>
                    <label htmlFor="giaBan" className="block text-sm font-medium text-gray-700">
                        Giá bán <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        id="giaBan"
                        name="giaBan"
                        value={formData.giaBan}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    />
                </div>
            </div>



            {/* Tiêu đề và mô tả */}
            <div className="mb-6">
                <label className="block font-medium mb-1">
                    Tiêu đề tin đăng <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                    required
                />
            </div>
            <div className="mb-6">
                <label className="block font-medium mb-1">
                    Mô tả chi tiết <span className="text-red-500">*</span>
                </label>
                <textarea
                    rows="5"
                    maxLength="1500"
                    className="w-full border border-gray-300 rounded-md p-2"
                    required
                />
                <p className="text-gray-500 text-sm mt-1">
                    0/1500 ký tự
                </p>
            </div>
            <div className="mb-6 ">
                <label className="block font-medium mb-1">
                    Địa chỉ giao dịch <span className="text-red-500">*</span>
                </label>
                <div className='flex text-slate-500'>
                    <input
                        type="text"
                        id="diachi"
                        name="diachi"
                        value={formData.diachibaiviet}
                        onChange={handleChange}
                        onClick={toggleLocationSelector}
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
            </div>
            <div className="flex items-center justify-center gap-4">
                {/* Nút xem trước */}
                <button
                    type="submit"
                    className="w-80 border border-solid  font-semibold p-3 rounded-md hover:bg-slate-500/50"
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
                        <LocationSelector  /> {/* Hiển thị component LocationSelector */}
                    </div>
                </div>
            )}
        </form>

    );
}

export default NewPost;
