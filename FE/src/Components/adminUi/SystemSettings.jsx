import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';

const SystemSettings = () => {
    const [logo, setLogo] = useState(null);
    const [themeColor, setThemeColor] = useState('#ffcc00');
    const [footerAddress, setFooterAddress] = useState('');
    const [footerMembers, setFooterMembers] = useState('');
    const [footerSocialChannels, setFooterSocialChannels] = useState('');
    const [footerPaymentMethods, setFooterPaymentMethods] = useState('');

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
                }
            })
            .catch(error => {
                console.error("Lỗi khi tải dữ liệu:", error);
            });
    }, []);

    const handleSaveSettings = () => {
        const formData = new FormData();
        formData.append('maugiaodien', themeColor);
        formData.append('diachifooter', footerAddress);
        formData.append('thanhvienfooter', footerMembers);
        formData.append('kenhtruyenthongfooter', footerSocialChannels);
        formData.append('phuongthucthanhtoanfooter', footerPaymentMethods);

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
                <Editor
                    admin-apiKey="gltcgzof6fowyb88lc3fck7g7qv36vf2sjdv3zudygelciiw"
                    value={footerAddress}
                    onEditorChange={(content) => setFooterAddress(content)}
                    init={{
                        height: 300,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount',
                            'emoticons'
                        ],
                        toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | emoticons | help'
                    }}
                />
            </div>

            {/* Footer Members */}
            <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">Thành viên Footer:</label>
                <Editor
                    admin-apiKey="gltcgzof6fowyb88lc3fck7g7qv36vf2sjdv3zudygelciiw"
                    value={footerMembers}
                    onEditorChange={(content) => setFooterMembers(content)}
                    init={{
                        height: 300,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount',
                            'emoticons'
                        ],
                        toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | emoticons | help'
                    }}
                />
            </div>

            {/* Footer Social Channels */}
            <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">Kênh truyền thông footer:</label>
                <Editor
                    admin-apiKey="gltcgzof6fowyb88lc3fck7g7qv36vf2sjdv3zudygelciiw"
                    value={footerSocialChannels}
                    onEditorChange={(content) => setFooterSocialChannels(content)}
                    init={{
                        height: 300,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount',
                            'emoticons'
                        ],
                        toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | emoticons | help'
                    }}
                />
            </div>

            {/* Footer Payment Methods */}
            <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">Phương thức thanh toán:</label>
                <Editor
                    admin-apiKey="gltcgzof6fowyb88lc3fck7g7qv36vf2sjdv3zudygelciiw"
                    value={footerPaymentMethods}
                    onEditorChange={(content) => setFooterPaymentMethods(content)}
                    init={{
                        height: 300,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount',
                            'emoticons'
                        ],
                        toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | emoticons | help'
                    }}
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
