import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faMailForward, faMailReply, faPhone, faPhoneVolume, faShare } from '@fortawesome/free-solid-svg-icons';
const BusinessCard = ({user}) => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    return (
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md p-4">
            {/* Header Image */}
            <div className="relative">
                <img
                src={`image/${user.avatar}`} // Thay bằng URL ảnh của bạn
                    alt="Ford"
                    className="w-full h-40 object-cover"
                />
                <div className="absolute top-3 right-3 bg-black text-white text-xs px-2 py-1 rounded">
                    Hoạt động 5 ngày trước
                </div>

                {/* Avatar Image */}
                <div className="absolute -bottom-8 left-4">
                    <img
                        src="image/cong.jpg" // Thay bằng URL avatar của bạn
                        alt="User"
                        className="w-16 h-16 rounded-full border-4 border-white"
                    />
                </div>
            </div>
            {/* Buttons */}
            <div className="flex justify-end gap-4 items-center mt-4">
                <button className="bg-white text-black border border-solid px-4 py-1 rounded"> <FontAwesomeIcon icon={faShare}/> Chia sẻ</button>
                <button className="bg-white text-black border border-1 px-4 py-1 rounded">+ Theo dõi</button>
            </div>
            {/* Profile Info */}
            <div className="mt-3 pl-4">
                <h2 className="text-xl font-semibold">{user.fullname}</h2>
                <div className="flex items-center">
                    <span className="text-yellow-500 text-sm">
                        ★★★★★
                    </span>
                    <span className="ml-2 text-sm">(1 nhận xét)</span>
                    <span className="ml-2 text-blue-500">Đã xác thực</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                    <FontAwesomeIcon icon={faLocationDot}/> {user.address}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                    <FontAwesomeIcon icon={faEnvelope} />  {user.email}
                </p>
            </div>
            <div onClick={toggleVisibility} className='bg-green-600 w-[15vw]  h-12 flex justify-start gap-2 items-center p-4 rounded-2xl font-bold text-white mt-3'>
                <FontAwesomeIcon icon={faPhoneVolume}/>
                {isVisible ? (
                    <div className='flex gap-4'>
                        <h3>{`${user.phone.slice(0, 4)}***${user.phone.slice(7)}`}</h3>
                        <h5 className='text-sm'>Bấm để hiện số</h5>
                    </div>
                ) : (
                    <h3 >{user.phone}</h3>
                )}
                
            </div>
           
        </div>
    );
};

export default BusinessCard;
