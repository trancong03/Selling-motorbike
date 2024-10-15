import React, { useState } from 'react';
import apiClient from './../../../services/apiclient';
import { BadgeX } from 'lucide-react';

const ResetPasswordForgot = ({ email, closeResetPassword, closeVerifyOtp, closeForgotPassword }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!newPassword || !confirmPassword) {
            setError('Vui lòng nhập đầy đủ thông tin');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Mật khẩu mới và xác nhận mật khẩu không khớp');
            return;
        }

        setLoading(true);

        try {
            const response = await apiClient.post('/api/reset-password-forgot/', { email, newPassword });
            setLoading(false);

            if (response.status === 200) {
                window.alert('Mật khẩu đã được đặt lại thành công!'); // Hiển thị alert
                closeResetPassword(); // Đóng component ResetPassword
                closeVerifyOtp();
                closeForgotPassword();
            } else {
                setError(response.data.error);
            }
        } catch (err) {
            setLoading(false);
            console.error('Error:', err);
            setError('Có lỗi xảy ra trong quá trình đặt lại mật khẩu');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="max-w-md w-full p-5 border border-gray-300 rounded shadow-md bg-white">
                <button className="w-full flex items-start justify-end" onClick={closeResetPassword}>
                    <BadgeX className="w-8 h-8" />
                </button>
                <h2 className="text-2xl font-bold mb-5 text-center">Đặt Lại Mật Khẩu</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="new-password" className="block text-gray-700 mb-2">Mật Khẩu Mới:</label>
                        <input
                            type="password"
                            id="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirm-password" className="block text-gray-700 mb-2">Xác Nhận Mật Khẩu:</label>
                        <input
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Đang Đặt Lại...' : 'Đặt Lại Mật Khẩu'}
                    </button>
                </form>
                {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
            </div>
        </div>
    );
};

export default ResetPasswordForgot;
