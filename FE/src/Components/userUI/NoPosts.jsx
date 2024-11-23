import React from 'react';

const NoPosts = ({ onCreatePost }) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg shadow-lg bg-white max-w-screen mx-auto my-10">
            <img
                src="http://127.0.0.1:8000//media/images/logo.png"
                alt="No posts illustration"
                className="w-auto h-auto mb-6 object-cover"
            />
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Bạn chưa có bài đăng nào</h2>
            <p className="text-gray-500 mb-6 text-center">Hãy tạo bài đăng mới để chia sẻ với mọi người. Những bài viết của bạn sẽ được hiển thị tại đây.</p>
            <button
                onClick={onCreatePost}
                className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105"
            >
                Đăng bài mới
            </button>
        </div>
    );
};

export default NoPosts;
