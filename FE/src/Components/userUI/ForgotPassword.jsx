import { BadgeX } from 'lucide-react';
import React, { useState } from 'react';
import apiClient from './../../../services/apiclient';
import VerifyOtp from './VerifyOtp'; // Import component VerifyOtp

const ForgotPassword = ({ closeForgotPassword }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Trạng thái tải
    const [showVerifyOtp, setShowVerifyOtp] = useState(false); // Trạng thái hiển thị VerifyOtp

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!email) {
            setError('Vui lòng nhập email');
            return;
        }

        setLoading(true); // Bắt đầu trạng thái tải

        try {
            const response = await apiClient.post('/api/forgot-password/', { email });
            setLoading(false); // Kết thúc trạng thái tải
            if (response.status === 200) {
                setMessage(response.data.message);
                setShowVerifyOtp(true); // Hiển thị VerifyOtp khi gửi thành công
            } else {
                setError(response.data.error); // Lấy thông điệp lỗi từ phản hồi
            }
        } catch (err) {
            setLoading(false); // Kết thúc trạng thái tải
            console.error('Error:', err);
            setError('Có lỗi xảy ra trong quá trình gửi email');
        }
    };

    return (
        <div>
            {showVerifyOtp ? (
                <VerifyOtp email={email} closeVerifyOtp={() => setShowVerifyOtp(false)} closeForgotPassword={closeForgotPassword}/> 
            ) : (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={closeForgotPassword}  // Đóng modal khi nhấp ra ngoài
                >
                    <div
                        className="max-w-md w-full p-5 border border-gray-300 rounded shadow-md bg-white"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="w-full flex items-start justify-end" onClick={closeForgotPassword}>
                            <BadgeX className="w-8 h-8" />
                        </button>
                        <h2 className="text-2xl font-bold mb-5 text-center">Quên Mật Khẩu</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 mb-2">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded"
                                />
                            </div>
                            <button
                                type="submit"
                                className={`w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={loading} // Vô hiệu hóa nút khi đang tải
                            >
                                {loading ? 'Đang Gửi...' : 'Gửi Liên Kết Đặt Lại Mật Khẩu'}
                            </button>
                        </form>
                        {message && <p className="mt-4 text-green-600 text-center">{message}</p>}
                        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;
