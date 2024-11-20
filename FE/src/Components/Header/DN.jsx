import React, { useEffect, useState, useRef } from 'react';
import '../../Style/login.css';
import { FaFacebookF, FaGooglePlusG } from 'react-icons/fa';
import { BadgeX } from 'lucide-react';
import { getCSRFToken } from './../getCSRFToken';
const DN = ({ closeLogin, onLoginSuccess, onForgotPassword }) => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const formRef = useRef(null); // Dùng để theo dõi khu vực form
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError("Username và Password không được để trống.");
            return;
        }
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!usernameRegex.test(username)) {
            setError("Username chỉ được chứa chữ cái, số và dấu gạch dưới.");
            return;
        }
        if (password.length < 5) {
            setError("Password phải có ít nhất 5 ký tự.");
            return;
        }
        setError(""); // Xóa lỗi trước khi gửi
        try {
            const csrftoken = getCSRFToken();
            const response = await fetch('http://127.0.0.1:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Thông tin xác thực không hợp lệ');
            }
            const data = await response.json();
            
            onLoginSuccess(data);
            
        } catch (err) {
            setError(err.message);
        }
    };
    const handleSignUpSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra các trường đầu vào
        if (!username || !password || !email) {
            setError("Username, Password và Email là bắt buộc.");
            return;
        }

        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!usernameRegex.test(username)) {
            setError("Username chỉ được chứa chữ cái, số và dấu gạch dưới.");
            return;
        }

        if (password.length < 5) {
            setError("Password phải có ít nhất 5 ký tự.");
            return;
        }

        setError(""); // Xóa lỗi trước khi gửi

        try {
            const csrftoken = getCSRFToken();
            const response = await fetch('http://127.0.0.1:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                },
                body: JSON.stringify({ username, password, email,fullname }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Something went wrong');
            }

            const data = await response.json();
            alert(data.message);
            // Có thể chuyển hướng đến trang đăng nhập hoặc làm gì đó sau khi đăng ký thành công
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSignUpClick = () => {
        setIsRightPanelActive(true);
    };

    const handleSignInClick = () => {
        setIsRightPanelActive(false);
    };
    return (
        <div className='login-container fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
            onClick={closeLogin}
        >
            <div
                className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`}
                id="container"
                onClick={(e) => e.stopPropagation()} 
                ref={formRef} // Tham chiếu form để theo dõi sự kiện nhấn ra ngoài
            >
                {/* Nút đóng (X) */}
                <button className="close-button " onClick={closeLogin}>
                    <BadgeX className="w-8 h-8" />
                </button>

                <div className="form-container sign-up-container">
                    <form onSubmit={handleSignUpSubmit}>
                        <h1>Create Account</h1>
                        <div className="social-container">
                            <a href="#" className="social"><FaFacebookF /></a>
                            <a href="#" className="social"><FaGooglePlusG /></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input
                            type="text"
                            placeholder="Full name"
                            autoComplete="current-email"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Username"
                            autoComplete="current-username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            autoComplete="current-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit">Sign Up</button>
                        <span className="error">{error}</span>
                    </form>

                </div>

                <div className="form-container sign-in-container">
                    {/* Nút đóng (X) */}
                    <button className="close-button " onClick={closeLogin}>
                        <BadgeX className="w-8 h-8" />
                    </button>

                    <form onSubmit={handleSubmit} method='POST'>
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <a href="#" className="social"><FaFacebookF /></a>
                            <a href="#" className="social"><FaGooglePlusG /></a>
                        </div>
                        <span>or use your account</span>
                        <input type="text" placeholder="Username" 
                            value={username} autoComplete="current-username"
                            onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" 
                            placeholder="Password" value={password} autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)} />
                            <span className='text-red-600'>
                            {error && <p className="error">{error}</p>}
                            </span>
                        <a
                            href="#"
                            onClick={() => onForgotPassword()}
                            className="text-blue-500 hover:underline"
                        >
                            Forgot your password?
                        </a>
                        <button type="submit">Sign In</button>
                    </form>
                   

                </div>

                <div className="overlay-container bg-slate-600/50">
                    <div className="overlay  bg-slate-600/50">
                        <div className="overlay-panel overlay-left  bg-slate-600/50">
                            <img
                                className="h-16  w-40"
                                src="http://127.0.0.1:8000//media/images/logo.png"
                                alt="Logo"
                            />
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn" onClick={handleSignInClick}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right  bg-slate-500/50">
                            <img
                                className="h-16  w-40"
                                src="http://127.0.0.1:8000//media/images/logo.png"
                                alt="Logo"
                            />
                            <h1>Hello!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DN;
