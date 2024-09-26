import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faMailForward, faMailReply, faPhone, faPhoneVolume, faShare } from '@fortawesome/free-solid-svg-icons';

export default function Account({user,setUserInfo}) {
    const handleChange = (e) => {
        setUserInfo({
            ...user,
            [e.target.name]: e.target.value
        });
    };
    
  return (
      <div className=" mx-auto w-full bg-white shadow-lg rounded-md flex justify-start items-start gap-4">
        <div className='w-[30vw]'>
              <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md p-4 text-md">
                  {/* Header Image */}
                  <div className="relative">
                      <img
                          src={`image/${user.avatar}`} 
                          alt="Ford"
                          className="w-full h-40 object-cover"
                      />
                      <div className="absolute -bottom-8 left-4">
                          <img
                              src="image/cong.jpg" 
                              alt="User"
                              className="w-16 h-16 rounded-full border-4 border-white"
                          />
                      </div>
                  </div>
                    <br />
                  <div className="mt-3 pl-4">
                      <h2 className="text-xl font-semibold">{user.fullname}</h2>
                      <div className="flex items-center">
                          <span className="text-yellow-500 text-sm">
                              ★★★★★
                          </span>
                          <span className="ml-2 text-sm">(1 nhận xét)</span>
                          <span className="ml-2 text-blue-500">Đã xác thực</span>
                      </div>
                      <div className='pt-3 pb-3 text-slate-500 text-lg'>
                          <h1>Người theo dõi : <b>0</b> |  Đang theo dõi:  <b>0</b></h1>
                      </div>
                      <p className=" text-gray-600 mt-2 text-md">
                          <FontAwesomeIcon icon={faLocationDot} /> {user.address}
                      </p>
                      <p className="text-sm text-gray-600 mt-2 text-md">
                          <FontAwesomeIcon icon={faEnvelope} />  {user.email}
                      </p>
                  </div>
                  <button className='border p-2 w-[80%]  
                     border-solid rounded-xl font-bold bg-orange-400 text-white
                    text-lg mt-3 flex items-center justify-center gap-2'>
                    <FontAwesomeIcon icon={faShare}/>
                      <h1>Chia Sẻ Trang Cá Nhân</h1>
                  </button>
                  <button className='border p-2 w-[80%] hover:bg-slate-300  border-solid rounded-xl font-bold  text-lg mt-3'>Chỉnh Sửa Trang Cá Nhân</button>
              </div>
              
        </div>
          <div className='h-auto w-[60vw] mt-8'>
              <nav class="bg-gray-100 p-3 rounded font-sans w-full mb-4">
                  <ol class="list-reset flex text-gray-600">
                      <li><a href="/" class="text-blue-600 hover:underline">Chợ Tốt</a></li>
                      <li><span class="mx-2">›</span></li>
                      <li><a href="/profile" class="text-blue-600 hover:underline">Trang cá nhân của Chí Công Trần</a></li>
                      <li><span class="mx-2">›</span></li>
                      <li class="text-gray-600">Cài đặt tài khoản</li>
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
                              value={user.fullname}
                              onChange={handleChange}
                              className="w-full focus:outline-none "
                          />
                      </div>
                      <div className="mb-4 p-3 w-[30vw]  border border-gray-300 rounded-md text-lg  bg-gray-100">
                          <label className="block text-sm text-slate-400  font-bold">
                              Số điện thoại <span className="text-red-500">*</span>
                          </label>
                          <input
                              type="text"
                              id="phone"
                              name="phone"
                              value={user.phone}
                              disabled
                              className="w-full "
                          />
                      </div>

                  </div>
                  <div>
                      <div className="mb-4 p-3 w-[60vw]  border border-gray-300 rounded-md text-lg ">
                      <label className="block text-sm font-medium mb-1" htmlFor="nickname">
                          Email :
                      </label>
                      <input
                          type="text"
                          id="nickname"
                          name="nickname"
                          value={user.email}
                          onChange={handleChange}
                          className="w-full focus:outline-none "
                      />
                  </div>
                  </div>
                  <div className="mb-4 p-3 w-[60vw]  border border-gray-300 rounded-md text-lg ">
                      <label className="block text-sm text-slate-400  font-bold">
                         Địa chỉ <span className="text-red-500">*</span>
                      </label>
                      <input
                          type="text"
                          id="address"
                          name="address"
                          value={user.address}
                          onChange={handleChange}
                          className="w-full focus:outline-none "
                      />
                  </div>
                  
                 
              </div>
              <div class="relative mt-3">
                  <label className="block text-sm text-slate-400  font-bold">
                    CCCD / CMND / Hộ Chiếu <span className="text-red-500">*</span>
                  </label>
                  <input class="block w-full px-4 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
                      
                  </input>
                  
              </div>
              <div class="grid grid-cols-2 gap-4 mt-3">
                  <div class="relative">
                      <select class="block w-full px-4 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="" disabled selected>Giới tính</option>
                          <option value="male">Nam</option>
                          <option value="female">Nữ</option>
                          <option value="other">Khác</option>
                      </select>
                      <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <svg class="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                          </svg>
                      </div>
                  </div>

                  <div class="relative">
                      <input type="date" class="block w-full px-4 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                     
                  </div>
              </div>
              <div class="relative mt-3">
                  <div className=" block mb-4 mt-3 p-3 w-[60vw]  border border-gray-300 rounded-md text-lg ">
                      <label className="block text-sm text-slate-400  font-bold">
                          Giới thiệu <span className="text-red-500">*</span>
                      </label>
                      <textarea
                          id="introduction"
                          name="introduction"
                          value={user.gender}
                          onChange={handleChange}
                          rows="4"
                          placeholder="Viết vài dòng giới thiệu về gian hàng của bạn..."
                          className="w-full focus:outline-none ">
                      </textarea>
                      <span className="text-xs text-gray-500">Tối đa 60 từ</span>
                  </div>
                  <button class="w-[15vw] mb-3 bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
                     Thay đổi thông tin
                  </button>
                  <p className=" block text-xs text-gray-500 mt-1">
                      Tên  sau khi được cập nhật sẽ không thể thay đổi trong vòng 60 ngày tới.
                  </p>
              </div>
                  <h2 class="text-2xl font-bold mb-6">Thay đổi mật khẩu</h2>
                  <div class="mb-4">
                      <label class="block text-gray-700 text-sm font-bold mb-2" for="current-password">
                          Mật khẩu hiện tại <span class="text-red-500">*</span>
                      </label>
                      <input id="current-password" type="password" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Mật khẩu hiện tại" required/>
                  </div>

                  <div class="mb-4">
                      <label class="block text-gray-700 text-sm font-bold mb-2" for="new-password">
                          Mật khẩu mới <span class="text-red-500">*</span>
                      </label>
                      <input id="new-password" type="password" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Mật khẩu mới" required/>
                  </div>

                  <div class="mb-6">
                      <label class="block text-gray-700 text-sm font-bold mb-2" for="confirm-password">
                          Xác nhận mật khẩu mới <span class="text-red-500">*</span>
                      </label>
                      <input id="confirm-password" type="password" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Xác nhận mật khẩu mới" required/>
                  </div>

                  <button class="w-[15vw] mb-3 bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
                      ĐỔI MẬT KHẨU
                  </button>
              <p className=" block text-xs text-gray-500 mt-1">
                  Mật khẩu sau khi được cập nhật sẽ không thể thay đổi trong vòng 60 ngày tới.
              </p>
              <br />
              <br />
          </div>
      </div>
  )
}
