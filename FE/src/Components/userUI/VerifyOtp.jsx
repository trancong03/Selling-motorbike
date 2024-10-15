import React, { useState } from 'react';
import apiClient from './../../../services/apiclient';
import ResetPasswordForgot from './ResetPasswordForgot';
import { BadgeX } from 'lucide-react';

const VerifyOtp = ({ email, closeVerifyOtp, closeForgotPassword }) => {
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false); // Trạng thái hiển thị ResetPassword

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!otp) {
            setError('Vui lòng nhập OTP');
            return;
        }

        setLoading(true);

        try {
            const response = await apiClient.post('/api/verify-otp/', { email, otp });
            setLoading(false);

            if (response.status === 200) {
                setMessage('Xác thực thành công! Vui lòng nhập mật khẩu mới.');
                setShowResetPassword(true); // Hiển thị ResetPassword khi xác thực thành công
            } else {
                setError(response.data.error);
            }
        } catch (err) {
            setLoading(false);
            console.error('Error:', err);
            setError('Có lỗi xảy ra trong quá trình xác thực OTP');
        }
    };

    return (
        <div>
            {showResetPassword ? (
                <ResetPasswordForgot email={email} closeResetPassword={() => setShowResetPassword(false)} closeVerifyOtp={closeVerifyOtp} closeForgotPassword={closeForgotPassword} /> // Hiển thị ResetPassword
            ) : (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="max-w-md w-full p-5 border border-gray-300 rounded shadow-md bg-white">
                            <button className="w-full flex items-start justify-end" onClick={closeVerifyOtp}>
                                <BadgeX className="w-8 h-8" />
                            </button>
                        <h2 className="text-2xl font-bold mb-5 text-center">Xác Thực OTP</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="otp" className="block text-gray-700 mb-2">Nhập OTP:</label>
                                <input
                                    type="text"
                                    id="otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded"
                                />
                            </div>
                            <button
                                type="submit"
                                className={`w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={loading}
                            >
                                {loading ? 'Đang Xác Thực...' : 'Xác Thực OTP'}
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

export default VerifyOtp;
