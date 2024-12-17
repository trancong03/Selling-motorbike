import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const SystemSettings = () => {
    const [logo, setLogo] = useState(null);
    const [themeColor, setThemeColor] = useState('#ffcc00');
    const [footerAddress, setFooterAddress] = useState('');
    const [footerMembers, setFooterMembers] = useState('');
    const [footerSocialChannels, setFooterSocialChannels] = useState('');
    const [footerPaymentMethods, setFooterPaymentMethods] = useState('');
    const [introductionPage, setIntroductionPage] = useState('');

    useEffect(() => {
        // Fetch the latest settings based on the highest ID
        axios.get('http://127.0.0.1:8000/admin-api/thuoctinhhethong/')
            .then(response => {
                if (response.data && response.data.length > 0) {
                    const latestSettings = response.data.sort((a, b) => b.id - a.id)[0]; // Get the latest entry based on the highest ID
                    setThemeColor(latestSettings.maugiaodien || '#ffcc00');
                    setFooterAddress(latestSettings.diachifooter || '');
                    setFooterMembers(latestSettings.thanhvienfooter || '');
                    setFooterSocialChannels(latestSettings.kenhtruyenthongfooter || '');
                    setFooterPaymentMethods(latestSettings.phuongthucthanhtoanfooter || '');
                    setIntroductionPage(latestSettings.tranggioithieu || '');
                }
            })
            .catch(error => {
                console.error("Lỗi khi tải dữ liệu:", error);
            });
    }, []);

    const handleImageUpload = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result); // Base64 data
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handlePaste = async (e, setContent) => {
        const clipboardData = e.clipboardData || window.clipboardData;
        const items = clipboardData.items;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.type.indexOf('image') !== -1) {
                const file = item.getAsFile();
                if (file) {
                    const base64 = await handleImageUpload(file);
                    setContent((prevContent) => `${prevContent}<img src="${base64}" alt="Pasted Image" />`);
                }
                e.preventDefault(); // Ngăn trình duyệt dán ảnh trực tiếp
            }
        }
    };

    const handleSaveSettings = () => {
        const formData = new FormData();
        formData.append('maugiaodien', themeColor);
        formData.append('diachifooter', footerAddress);
        formData.append('thanhvienfooter', footerMembers);
        formData.append('kenhtruyenthongfooter', footerSocialChannels);
        formData.append('phuongthucthanhtoanfooter', footerPaymentMethods);
        formData.append('tranggioithieu', introductionPage);

        // Nếu có file logo, thêm vào formData
        if (logo) {
            formData.append('logo', logo);
        }

        axios.post('http://127.0.0.1:8000/admin-api/thuoctinhhethong/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Đảm bảo gửi đúng kiểu dữ liệu
            },
        })
            .then(response => {
                alert("Lưu cài đặt thành công!");
            })
            .catch(error => {
                console.error("Lỗi khi lưu cài đặt:", error);
                alert("Lưu cài đặt thất bại!");
            });
    };

    const quillModules = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
        ],
        clipboard: {
            matchVisual: false,
        },
    };

    return (
        <div className="p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
            {/* Logo Upload */}
            <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">Cập nhật Logo:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) setLogo(file);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
                {logo && <img src={URL.createObjectURL(logo)} alt="Logo Preview" className="mt-4 h-24 w-auto rounded-lg" />}
            </div>

            {/* Theme Color Picker */}
            <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">Màu giao diện:</label>
                <input
                    type="color"
                    value={themeColor}
                    onChange={(e) => setThemeColor(e.target.value)}
                    className="w-16 h-10 p-0 border"
                />
            </div>

            {/* Footer Address */}
            <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">Địa chỉ footer:</label>
                <ReactQuill
                    value={footerAddress}
                    onChange={setFooterAddress}
                    theme="snow"
                    modules={quillModules}
                    onPaste={(e) => handlePaste(e, setFooterAddress)}
                />
            </div>

            {/* Footer Members */}
            <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">
                    Thành viên Footer:
                </label>
                <ReactQuill
                    value={footerMembers}
                    onChange={setFooterMembers}
                    theme="snow"
                    modules={quillModules}
                    onPaste={(e) => handlePaste(e, setFooterMembers)}
                />
            </div>

            {/* Footer Social Channels */}
            <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">
                    Kênh truyền thông footer:
                </label>
                <ReactQuill
                    value={footerSocialChannels}
                    onChange={setFooterSocialChannels}
                    theme="snow"
                    modules={quillModules}
                    onPaste={(e) => handlePaste(e, setFooterSocialChannels)}
                />
            </div>

            {/* Footer Payment Methods */}
            <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">
                    Phương thức thanh toán:
                </label>
                <ReactQuill
                    value={footerPaymentMethods}
                    onChange={setFooterPaymentMethods}
                    theme="snow"
                    modules={quillModules}
                    onPaste={(e) => handlePaste(e, setFooterPaymentMethods)}
                />
            </div>

            {/* Introduction Page */}
            <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">
                    Trang giới thiệu:
                </label>
                <ReactQuill
                    value={introductionPage}
                    onChange={setIntroductionPage}
                    theme="snow"
                    modules={quillModules}
                    onPaste={(e) => handlePaste(e, setIntroductionPage)}
                />
            </div>

            {/* Save Button */}
            <div className="mt-6">
                <button
                    onClick={handleSaveSettings}
                    className="px-6 py-2 rounded-md shadow-md bg-indigo-600 text-white font-bold hover:bg-indigo-700"
                >
                    Lưu cài đặt
                </button>
            </div>
        </div>
    );
};

export default SystemSettings;
