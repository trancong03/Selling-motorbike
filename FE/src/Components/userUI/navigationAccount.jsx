import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Nhập Link từ react-router-dom
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faShare, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function NavigationAccount({ user, setUserInfo }) {
    const [coverImage, setCoverImage] = useState(`image/${user.anhnen || 'default-cover.jpg'}`); // Thay 'default-cover.jpg' bằng đường dẫn tới hình ảnh mặc định
    const [avatarImage, setAvatarImage] = useState(`image/${user.anhdaidien || 'default-avatar.jpg'}`); // Thay 'default-avatar.jpg' bằng đường dẫn tới hình ảnh mặc định
    const [avatarFile, setAvatarFile] = useState(null);
    const [coverFile, setCoverFile] = useState(null);

    useEffect(() => {
        setCoverImage(`/image/${user.anhnen || 'default-cover.jpg'}`);
        setAvatarImage(`/image/${user.anhdaidien || 'default-avatar.jpg'}`);
    }, [user]);



    const handleCoverChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverImage(reader.result);
            };
            setCoverFile(file); // Lưu file để gửi lên máy chủ
            reader.readAsDataURL(file);
        }
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarImage(reader.result);
            };
            setAvatarFile(file); // Lưu file để gửi lên máy chủ
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
    const formData = new FormData();
    let updatedUserInfo = { ...user }; // Tạo bản sao của user để cập nhật
    
    if (coverFile) {
        formData.append('background', coverFile.name); // Gửi tên file
        updatedUserInfo = {
            ...updatedUserInfo,
            background: coverFile.name, // Cập nhật background trong bản sao của user
        };
    }
    
    if (avatarFile) {
        formData.append('avatar', avatarFile.name); // Gửi tên file
        updatedUserInfo = {
            ...updatedUserInfo,
            avatar: avatarFile.name, // Cập nhật avatar trong bản sao của user
        };
    }
    
    formData.append('iduser', user.manguoidung);

    try {
        const response = await fetch('http://localhost:8000/api/update-images/', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        
        if (result.success) {
            alert('Images updated successfully');
            // Cập nhật state userInfo và lưu vào localStorage
            setUserInfo(updatedUserInfo);
            localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo)); // Lưu userInfo sau khi state đã được cập nhật
        } else {
            alert('Error updating images: ' + result.error);
        }
    } catch (error) {
        alert('Error: ' + error);
    }
};

    return (
        <div className='w-[30vw]'>
            <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md p-4 text-md">
                <div className="relative">
                    <img
                        src={coverImage}
                        alt="Cover"
                        className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleCoverChange}
                            id="cover-upload"
                            className="hidden"
                        />
                        <label htmlFor="cover-upload" className="border rounded p-1 bg-white cursor-pointer opacity-70">
                            <FontAwesomeIcon icon={faPlus} className="text-gray-600" />
                        </label>
                    </div>
                    <div className="absolute -bottom-8 left-4">
                        <img
                            src={avatarImage}
                            alt="User"
                            className="w-16 h-16 rounded-full border-4 border-white"
                        />
                        <div className="absolute bottom-0 right-0">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                id="avatar-upload"
                                className="hidden"
                            />
                            <label htmlFor="avatar-upload" className="border rounded p-1 bg-white cursor-pointer opacity-70">
                                <FontAwesomeIcon icon={faPlus} className="text-gray-600" />
                            </label>
                        </div>
                    </div>
                </div>
                <br />
                <div className="mt-3 pl-4">
                    <h2 className="text-xl font-semibold">{user.hoten}</h2>
                    <div className="flex items-center">
                        <span className="text-yellow-500 text-sm">★★★★☆</span>
                        <span className="ml-2 text-sm">(1 nhận xét)</span>
                        <span className="ml-2 text-blue-500">Đã xác thực</span>
                    </div>
                    <div className='pt-3 pb-3 text-slate-500 text-lg'>
                        <h1>Người theo dõi : <b>0</b> |  Đang theo dõi:  <b>0</b></h1>
                    </div>
                    <p className="text-gray-600 mt-2 text-md">
                        <FontAwesomeIcon icon={faLocationDot} /> {user.diachi}
                    </p>
                    <p className="text-sm text-gray-600 mt-2 text-md">
                        <FontAwesomeIcon icon={faEnvelope} />  {user.email}
                    </p>
                </div>
                <button onClick={handleSubmit} className='border p-2 w-[80%] border-solid rounded-xl font-bold bg-orange-400 text-white text-lg mt-3 flex items-center justify-center gap-2'>
                    <FontAwesomeIcon icon={faShare} />
                    <h1>Cập Nhật Hình Ảnh</h1>
                </button>
                <Link to="/account"> {/* Sử dụng Link để điều hướng */}
                    <button className='border p-2 w-[80%] hover:bg-slate-300 border-solid rounded-xl font-bold text-lg mt-3'>
                        Chỉnh Sửa Trang Cá Nhân
                    </button>
                </Link>
                <Link to="/account/reset-password"> {/* Sử dụng Link để điều hướng */}
                    <button className='border p-2 w-[80%] hover:bg-slate-300 border-solid rounded-xl font-bold text-lg mt-3'>
                        Thay đổi mật khẩu
                    </button>
                </Link>
            </div>
        </div>
    );
}
