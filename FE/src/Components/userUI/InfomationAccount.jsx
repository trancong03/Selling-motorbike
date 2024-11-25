import React, { useEffect, useState } from 'react'
import LocationSelector from '../ui/LocationSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
export default function InfomationAccount({ user, setUserInfo }) {
    console.log(user.ngaysinh);
    

    const [selectedFile, setSelectedFile] = useState(null);
    const [hoten, setHoten] = useState(user.hoten);
    const [selectedImage, setSelectedImage] = useState(null); // Lưu trữ URL ảnh đã chọn
    useEffect(() => {
        const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (storedUserInfo) {
            setUserInfo(storedUserInfo);
        }
    }, []);
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Lấy tệp đã chọn
        if (file) {
            setSelectedFile(file); // Lưu tệp vào state
            const imageUrl = URL.createObjectURL(file); // Tạo URL tạm thời cho ảnh
            setSelectedImage(imageUrl); // Lưu URL vào state
        }
    };
    

    const [showLocationSelector, setShowLocationSelector] = useState(false);
    const toggleLocationSelector = () => {
        setShowLocationSelector(!showLocationSelector);
    };
    const updatediachi = (diachi) => {
        setUserInfo({
            ...user,
            diachi: diachi
        });
        toggleLocationSelector();
    };

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
            displayCCCDData(result);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    const displayCCCDData = (data) => {
        setUserInfo((prevUser) => ({
            ...prevUser,
            socccd: data.ID || "",
            gioitinh: data.Gender || "",
            ngaysinh: formatDate(data.Birth)|| "",
            mota: `${data.Nation || ""}, ${data.Countryside || ""}`,
            diachi: data.Address || "",
        }));
        setHoten(data.Name || "",)
    };
    
    const formatDate = (dateString) => {
        if (!dateString) return ""; // Nếu không có giá trị, trả về chuỗi rỗng
        const [day, month, year] = dateString.split("/"); // Tách ngày, tháng, năm từ định dạng DD/MM/YYYY
        return `${year}-${month}-${day}`; // Trả về định dạng YYYY-MM-DD
    };
    const saveUserInfo = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/users/${user.manguoidung}/`, {
                method: 'PUT',  // Thay bằng 'PATCH' nếu chỉ cập nhật một số trường
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    hoten: hoten,
                    email: user.email,
                    diachi: user.diachi,
                    sodienthoai: user.sodienthoai,
                    gioitinh: user.gioitinh,
                    socccd: user.socccd,
                    mota: user.mota,
                    ngaysinh: user.ngaysinh,
                }),
            });

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const result = await response.json();
            localStorage.setItem('userInfo', JSON.stringify(result));
            setUserInfo({...user, hoten: hoten })
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
              <div className='flex items-center justify-center gap-4'>
                  <div className="mb-4 p-3 w-[30vw]  border border-gray-300 rounded-md text-lg">
                      <label className="block text-sm text-slate-400  font-bold" htmlFor="name">
                          Họ và tên <span className="text-red-500">*</span>
                      </label>
                      <input
                          type="text"
                          id="name"
                          name="name"
                          value={hoten || ""}
                          onChange={(e) =>setHoten(e.target.value )}
                          className="w-full focus:outline-none text-slate-400  font-bold"
                      />
                  </div>
                  <div className="mb-4 p-3 w-[60vw]  border border-gray-300 rounded-md text-lg text-slate-400  font-bold">
                      <label className="block text-sm font-medium mb-1" htmlFor="nickname">
                          Số điện thoại :
                      </label>
                      <input
                          type="text"
                          id="sodienthoai"
                          name="sodienthoai"
                          value={user.sodienthoai || ""}
                          onChange={(e) => setUserInfo({ ...user, sodienthoai: e.target.value })}
                          className="w-full focus:outline-none text-slate-400  font-bold"
                      />
                  </div>

              </div>
              <div>
                  <div className="mb-4 p-3 w-[60vw]  border border-gray-300 rounded-md text-lg text-slate-400  font-bold">
                      <label className="block text-sm font-medium mb-1" htmlFor="nickname">
                          Email :
                      </label>
                      <input
                          type="text"
                          id="nickname"
                          name="nickname"
                          value={user.email || ""}
                          onChange={(e) => setUserInfo({ ...user, email: e.target.value })}
                          className="w-full focus:outline-none text-slate-400  font-bold "
                      />
                  </div>
              </div>
              <div className="mb-4 p-3 w-[60vw]  border border-gray-300 rounded-md text-lg ">
                  <label className="block text-sm text-slate-400  font-bold">
                      Địa chỉ <span className="text-red-500">*</span>
                  </label>
                  <div className='flex text-slate-500'>
                      <input
                          type="text"
                          id="diachi"
                          name="diachi"
                          value={user.diachi || ""}
                          onChange={(e) => setUserInfo({ ...user, diachi: e.target.value })}
                          onClick={toggleLocationSelector}
                          className="w-full focus:outline-none "
                      />
                      <FontAwesomeIcon icon={faPlay} />
                  </div>
              </div>

          </div>
          <div className="relative mt-3">
              <label className="block text-sm text-slate-400  font-bold">
                  CCCD / CMND / Hộ Chiếu <span className="text-red-500">*</span>
              </label>
              <input className="block w-full px-4 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={user.socccd || ""} onChange={(e) => setUserInfo({ ...user, socccd: e.target.value })} >
              </input>

          </div>
          <div className="grid grid-cols-2 gap-4 mt-3">
              <div className="relative">
                  <select
                      className="block w-full px-4 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={user.gioitinh || ""}
                      onChange={(e) => {
                          if (user) {
                              setUserInfo({ ...user, gioitinh: e.target.value });
                          }
                      }}
                  >
                      <option value="" disabled>Giới tính</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="LGBT">Khác</option>
                  </select>

                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>

                  </div>
              </div>

              <div className="relative">
                  <input type="date"
                      value={user.ngaysinh} // Chuyển đổi từ dd/MM/yyyy sang YYYY-MM-DD khi hiển thị
                      onChange={(e) => setUserInfo({ ...user, ngaysinh: e.target.value })} // Chuyển đổi ngược lại khi thay đổi
                      placeholder="DD/MM/YYYY"
                      className="block w-full px-4 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

              </div>
          </div>
          <div className="relative mt-3">
              <div className=" block mb-4 mt-3 p-3 w-[60vw]  border border-gray-300 rounded-md text-lg ">
                  <label className="block text-sm text-slate-400  font-bold">
                      Giới thiệu <span className="text-red-500">*</span>
                  </label>
                  <textarea
                      id="introduction"
                      name="introduction"
                      value={user.mota || ""}
                      onChange={(e) => setUserInfo({ ...user, mota: e.target.value })}
                      rows="4"
                      placeholder="Viết vài dòng giới thiệu về gian hàng của bạn..."
                      className="w-full focus:outline-none text-slate-400  font-bold ">
                  </textarea>
                  <span className="text-xs text-gray-500">Tối đa 60 từ</span>
              </div>
              <button onClick={saveUserInfo} className="w-[15vw] mb-3 bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
                  Thay đổi thông tin
              </button>
              <p className=" block text-xs text-gray-500 mt-1">
                  Tên  sau khi được cập nhật sẽ không thể thay đổi trong vòng 60 ngày tới.
              </p>
              <div className="mb-6 w-[60vw] border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-sm">
            <label className="block text-sm font-bold text-gray-600 mb-2">
                Tải ảnh CCCD <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-4">
                <label className="flex items-center justify-center w-[50%] h-12 px-4 border border-dashed border-gray-300 rounded-lg bg-white hover:bg-gray-100 cursor-pointer transition-all">
                    <span className="text-sm text-gray-500 font-medium">Chọn tệp...</span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>
                <button
                    onClick={scanCCCD}
                    className="flex items-center justify-center w-[30%] h-12 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-all"
                >
                    Quét CCCD
                </button>
            </div>
            {selectedImage && (
                <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Ảnh đã chọn:</p>
                    <img
                        src={selectedImage}
                        alt="Ảnh CCCD"
                        className="w-full max-w-md rounded-lg border border-gray-300"
                    />
                </div>
            )}
            <p className="text-sm text-gray-500 mt-2">
                Hỗ trợ định dạng: JPG, PNG. Dung lượng tối đa 5MB.
            </p>
        </div>

          </div>
          {showLocationSelector && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white p-6 rounded-md w-[50vw] relative">
                      <button
                          className="absolute top-2 right-2 text-gray-500"
                          onClick={toggleLocationSelector}
                          style={{ fontSize: '2.5rem' }}  // Kích thước tùy chỉnh
                      >
                          &times;
                      </button>
                      <LocationSelector updatediachi={updatediachi} /> {/* Hiển thị component LocationSelector */}
                  </div>
              </div>
          )}
          <br />
          <br />
      </div>

  )
}
