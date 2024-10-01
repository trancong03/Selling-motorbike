import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faMailForward, faMailReply, faPhone, faPhoneVolume, faShare } from '@fortawesome/free-solid-svg-icons';

export default function NavigationAccount({ user }) {
  return (
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
                  <FontAwesomeIcon icon={faShare} />
                  <h1>Chia Sẻ Trang Cá Nhân</h1>
              </button>
              <button className='border p-2 w-[80%] hover:bg-slate-300  border-solid rounded-xl font-bold  text-lg mt-3'>Chỉnh Sửa Trang Cá Nhân</button>
          </div>

      </div>
  )
}
