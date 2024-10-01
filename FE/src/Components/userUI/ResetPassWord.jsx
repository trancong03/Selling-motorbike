import React from 'react'

export default function ResetPassWord() {
  return (
    <div>
          <h2 className="text-2xl font-bold mb-6">Thay đổi mật khẩu</h2>
          <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="current-password">
                  Mật khẩu hiện tại <span className="text-red-500">*</span>
              </label>
              <input id="current-password" type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Mật khẩu hiện tại" required />
          </div>

          <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new-password">
                  Mật khẩu mới <span className="text-red-500">*</span>
              </label>
              <input id="new-password" type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Mật khẩu mới" required />
          </div>

          <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                  Xác nhận mật khẩu mới <span className="text-red-500">*</span>
              </label>
              <input id="confirm-password" type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Xác nhận mật khẩu mới" required />
          </div>

          <button className="w-[15vw] mb-3 bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
              ĐỔI MẬT KHẨU
          </button>
          <p className=" block text-xs text-gray-500 mt-1">
              Mật khẩu sau khi được cập nhật sẽ không thể thay đổi trong vòng 60 ngày tới.
          </p>
    </div>
  )
}
