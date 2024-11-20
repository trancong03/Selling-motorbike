import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

function InformationAccount() {
    const [user, setUserInfo] = useState({
        fullname: '',
        email: '',
        address: '',
        phone: '',
        identity_card: '',
        gender: '',
        description: '',
        birthdate: '',
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [showLocationSelector, setShowLocationSelector] = useState(false);

    useEffect(() => {
        const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (storedUserInfo) {
            setUserInfo(storedUserInfo);
        }
    }, []);

    const toggleLocationSelector = () => {
        setShowLocationSelector((prevState) => !prevState);
    };

    const updateAddress = (address) => {
        setUserInfo((prevUser) => ({
            ...prevUser,
            address: address
        }));
        toggleLocationSelector();
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    // lỗi đâu

    const scanCCCD = async () => {
        if (!selectedFile) {
            alert("Vui lòng chọn một tệp!");
            return;
        }
    
        const formData = new FormData();
        formData.append('file', selectedFile);
        console.log(formData);
        try {
            const response = await fetch('http://localhost:8000/api/scan-cccd/', {
                method: 'POST',
                body: formData,
            });
            
            
    
            if (!response.ok) {
                const errorDetail = await response.text(); // log as text to handle non-JSON response
                console.error('Response Error:', errorDetail);
                throw new Error(`Lỗi quét CCCD: ${response.statusText}`);
            }
    
            const result = await response.json();
            console.log(result);
            displayCCCDData(result);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };
    const displayCCCDData = (data) => {
        setUserInfo((prevUser) => ({
            ...prevUser,
            identity_card: data.ID || "",
            fullname: data.Name || "",
            gender: data.Gender || "",
            birthdate: data.Birth || "",
            description: `${data.Nation || ""}, ${data.Countryside || ""}`,
            address: data.Address || "",
        }));
    };
    const formatDate = (dateString) => {
        if (!dateString) return ""; // Nếu không có giá trị, trả về chuỗi rỗng
        const [day, month, year] = dateString.split("/"); // Tách ngày, tháng, năm từ định dạng DD/MM/YYYY
        return `${year}-${month}-${day}`; // Trả về định dạng YYYY-MM-DD
    };

    const saveUserInfo = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/users/${user.iduser.trim()}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const result = await response.json();
            localStorage.setItem('userInfo', JSON.stringify(result));
            alert('Thông tin đã được cập nhật!');
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Có lỗi xảy ra khi cập nhật thông tin!');
        }
    };

    return (
        
        <div className='h-auto w-[60vw] mt-8'>
            <nav className="bg-gray-100 p-3 rounded font-sans w-full mb-4">
                <ol className="list-reset flex text-gray-600">
                    <li><a href="/" className="text-blue-600 hover:underline">Chợ Tốt</a></li>
                    <li><span className="mx-2">›</span></li>
                    <li><a href="/profile" className="text-blue-600 hover:underline">Trang cá nhân của Chí Công Trần</a></li>
                    <li><span className="mx-2">›</span></li>
                    <li className="text-gray-600">Cài đặt tài khoản</li>
                </ol>
            </nav>
            <h2 className="text-2xl font-bold mb-4">Hồ sơ cá nhân</h2>
            
            <div>
                <div className='flex items-center gap-4'>
                        <div className="mb-4 p-3 w-[30vw] border border-gray-300 rounded-md text-lg">
                            <label className="block text-sm text-slate-400 font-bold">Mã số CCCD <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={user.identity_card || ""}
                                onChange={(e) => setUserInfo({ ...user, identity_card: e.target.value })}
                                className="w-full focus:outline-none text-slate-400 font-bold"
                            />
                        </div>
                    </div>
                {/* Full Name and Phone */}
                <div className='flex items-center justify-center gap-4'>
                    <div className="mb-4 p-3 w-[30vw] border border-gray-300 rounded-md text-lg">
                        <label className="block text-sm text-slate-400 font-bold">Họ và tên <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            value={user.fullname || ""}
                            onChange={(e) => setUserInfo({ ...user, fullname: e.target.value })}
                            className="w-full focus:outline-none text-slate-400 font-bold"
                        />
                    </div>
                    <div className="mb-4 p-3 w-[30vw] border border-gray-300 rounded-md text-lg bg-gray-100">
                        <label className="block text-sm text-slate-400 font-bold">Số điện thoại <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            value={user.phone || ""}
                            className="w-full text-slate-400 font-bold"
                        />
                    </div>
                </div>
                {/* Address */}
                <div className="mb-4 p-3 w-[60vw] border border-gray-300 rounded-md text-lg">
                    <label className="block text-sm text-slate-400 font-bold">Địa chỉ <span className="text-red-500">*</span></label>
                    <div className='flex text-slate-500'>
                        <input
                            type="text"
                            value={user.address || ""}
                            onClick={toggleLocationSelector}
                            className="w-full focus:outline-none"
                        />
                        <FontAwesomeIcon icon={faPlay} />
                    </div>
                    
                </div>
                {/* Other Details */}
                <div className="mb-4 p-3 w-[60vw] border border-gray-300 rounded-md text-lg">
                    <label className="block text-sm text-slate-400 font-bold">Email:</label>
                    <input
                        type="email"
                        value={user.email || ""}
                        onChange={(e) => setUserInfo({ ...user, email: e.target.value })}
                        className="w-full focus:outline-none"
                    />
                </div>
                <div className="mb-4 p-3 w-[60vw] border border-gray-300 rounded-md text-lg">
                    <label className="block text-sm text-slate-400 font-bold">Giới tính</label>
                    <select
                        value={user.gender || ""}
                        onChange={(e) => setUserInfo({ ...user, gender: e.target.value })}
                        className="w-full focus:outline-none text-slate-500"
                    >
                        <option value="">Chọn giới tính</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                    </select>
                </div>
                {/* Date of Birth */}
                <div className="mb-4 p-3 w-[60vw] border border-gray-300 rounded-md text-lg">
                    <label className="block text-sm text-slate-400 font-bold">Ngày sinh</label>
                    <input
                        type="date"
                        value={formatDate(user.birthdate) || ""}
                        onChange={(e) => setUserInfo({ ...user, birthdate: e.target.value })}
                        className="w-full focus:outline-none text-slate-500"
                    />
                </div>
                {/* Description */}
                <div className="mb-4 p-3 w-[60vw] border border-gray-300 rounded-md text-lg">
                    <label className="block text-sm text-slate-400 font-bold">Giới thiệu</label>
                    <textarea
                        value={user.description || ""}
                        onChange={(e) => setUserInfo({ ...user, description: e.target.value })}
                        className="w-full focus:outline-none text-slate-500"
                        rows={3}
                        maxLength={200}
                        placeholder="Viết vài dòng giới thiệu về bạn..."
                    />
                </div>
                {/* Upload CCCD */}
                <div className="mb-4 p-3 w-[60vw] border border-gray-300 rounded-md text-lg">
                    <label className="block text-sm text-slate-400 font-bold">Tải ảnh CCCD <span className="text-red-500">*</span></label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full"
                    />
                    <button
                        onClick={scanCCCD}
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Quét CCCD
                    </button>
                </div>
                {/* Save Button */}
                <div className="mt-6">
                    <button
                        onClick={saveUserInfo}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Lưu thông tin
                    </button>
                </div>
            </div>
            {showLocationSelector && (
                <div>
                    {/* Thêm mã selector địa chỉ */}
                </div>
            )}
        </div>
    );
}

export default InformationAccount;
