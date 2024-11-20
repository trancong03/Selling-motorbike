import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import '../Style/PostForm.css';

const PostForm = () => {
  const [postData, setPostData] = useState({
    mabaiviet: '',
    tieude: '',
    noidung: '',
    thongtinlienlac: '',
    mota: '',
    diachibaiviet: '',
    giatri: '',
    ngaydang: '',
    ngayhethan: '',
    maxe: '',
    manguoidung: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleContentChange = (value) => {
    setPostData((prevData) => ({
      ...prevData,
      noidung: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/admin-api/baiviet/', postData);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <div className="form-group">
        <label>Mã bài viết:</label>
        <input
          type="text"
          name="mabaiviet"
          value={postData.mabaiviet}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Tiêu đề:</label>
        <input
          type="text"
          name="tieude"
          value={postData.tieude}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Nội dung:</label>
        <ReactQuill
          value={postData.noidung}
          onChange={handleContentChange}
          placeholder="Nhập nội dung bài viết..."
        />
      </div>
      <div className="form-group">
        <label>Thông tin liên lạc:</label>
        <input
          type="text"
          name="thongtinlienlac"
          value={postData.thongtinlienlac}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Mô tả:</label>
        <input
          type="text"
          name="mota"
          value={postData.mota}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Địa chỉ bài viết:</label>
        <input
          type="text"
          name="diachibaiviet"
          value={postData.diachibaiviet}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Giá trị:</label>
        <input
          type="number"
          name="giatri"
          value={postData.giatri}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Ngày đăng:</label>
        <input
          type="date"
          name="ngaydang"
          value={postData.ngaydang}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Ngày hết hạn:</label>
        <input
          type="date"
          name="ngayhethan"
          value={postData.ngayhethan}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Mã xe:</label>
        <input
          type="text"
          name="maxe"
          value={postData.maxe}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Mã người dùng:</label>
        <input
          type="text"
          name="manguoidung"
          value={postData.manguoidung}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" className="submit-btn">Submit</button>
    </form>
  );
};

export default PostForm;
