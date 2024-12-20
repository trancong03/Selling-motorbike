import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../../Style/voucherManagement.css";

const VoucherManagement = () => {
  const [vouchers, setVouchers] = useState([]);
  const [newVoucher, setNewVoucher] = useState({
    code: "",
    Mota: "",
    GiaTriGiam: 0,
    NgayBatDau: "",
    NgayKetThuc: "",
    HoatDong: true
  });
  const [editVoucher, setEditVoucher] = useState(null);

  useEffect(() => {
    // Giả lập dữ liệu voucher từ API
    fetch('http://localhost:8000/admin-api/voucher/')
      .then(response => response.json())
      .then(data => setVouchers(data));
  }, []);

  const handleAddVoucher = (e) => {
    e.preventDefault();
    // Gửi dữ liệu mới đến server
    fetch('http://localhost:8000/admin-api/voucher/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newVoucher),
    })
    .then(response => response.json())
    .then(data => {
      setVouchers([...vouchers, data]);
      setNewVoucher({
        code: "",
        Mota: "",
        GiaTriGiam: 0,
        NgayBatDau: "",
        NgayKetThuc: "",
        HoatDong: true
      });
      setEditVoucher(null); // Reset edit mode after adding a new voucher
    });
  };

  const handleUpdateVoucher = (e) => {
    e.preventDefault();
    if (editVoucher) {
      const updatedVoucher = {
        ...newVoucher,
        MaVoucher: editVoucher.MaVoucher, // Đảm bảo mã voucher không thay đổi
        NgayTao: editVoucher.NgayTao, // Ngày tạo không thay đổi, giữ nguyên giá trị từ API
      };
  
      fetch(`http://localhost:8000/admin-api/voucher/${editVoucher.MaVoucher}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedVoucher),
      })
      .then(response => response.json())
      .then(data => {
        setVouchers(vouchers.map(voucher => 
          voucher.MaVoucher === editVoucher.MaVoucher ? { ...voucher, ...data } : voucher
        ));
        setNewVoucher({
          code: "",
          Mota: "",
          GiaTriGiam: 0,
          NgayBatDau: "",
          NgayKetThuc: "",
          HoatDong: true
        });
        setEditVoucher(null); // Reset edit mode after updating
      });
    }
  };
  const handleEditVoucher = (voucher) => {
    setEditVoucher(voucher);
    setNewVoucher({
      ...voucher,
      NgayBatDau: new Date(voucher.NgayBatDau).toISOString().slice(0, 16),
      NgayKetThuc: new Date(voucher.NgayKetThuc).toISOString().slice(0, 16)
    });
  };

  const handleCancelEdit = () => {
    setEditVoucher(null);
    setNewVoucher({
      code: "",
      Mota: "",
      GiaTriGiam: 0,
      NgayBatDau: "",
      NgayKetThuc: "",
      HoatDong: true
    });
  };

  const handleToggleStatus = (voucher) => {
    fetch(`http://localhost:8000/admin-api/voucher/${voucher.MaVoucher}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...voucher, HoatDong: false}),
    })
    .then(response => response.json())
    .then(data => {
      setVouchers(vouchers.map(v => 
        v.MaVoucher === voucher.MaVoucher ? { ...v, HoatDong: data.HoatDong || false } : v
      ));
    });
  };

  return (
    <div className="voucher-management">
      <h2 className="section-title">Quản lý Voucher</h2>
      <form onSubmit={editVoucher ? handleUpdateVoucher : handleAddVoucher} className="add-voucher-form">
        <input 
          type="text" 
          placeholder="Mã Voucher" 
          value={newVoucher.code} 
          onChange={(e) => setNewVoucher({ ...newVoucher, code: e.target.value })}
          required
        />
        <textarea 
          placeholder="Mô tả" 
          value={newVoucher.Mota} 
          onChange={(e) => setNewVoucher({ ...newVoucher, Mota: e.target.value })}
        />
        <input 
          type="number" 
          placeholder="Giá trị giảm (%)" 
          value={newVoucher.GiaTriGiam} 
          onChange={(e) => setNewVoucher({ ...newVoucher, GiaTriGiam: parseFloat(e.target.value) })}
          required
        />
        <input 
          type="datetime-local" 
          value={newVoucher.NgayBatDau} 
          onChange={(e) => setNewVoucher({ ...newVoucher, NgayBatDau: e.target.value })}
          required
        />
        <input 
          type="datetime-local" 
          value={newVoucher.NgayKetThuc} 
          onChange={(e) => setNewVoucher({ ...newVoucher, NgayKetThuc: e.target.value })}
          required
        />
        <label>
          <input 
            type="checkbox" 
            checked={newVoucher.HoatDong} 
            onChange={(e) => setNewVoucher({ ...newVoucher, HoatDong: e.target.checked })}
          />
          Hoạt động
        </label>
        <button type="submit">{editVoucher ? 'Cập nhật Voucher' : 'Thêm Voucher'}</button>
        {editVoucher && <button type="button" onClick={handleCancelEdit}>Hủy</button>}
      </form>
      <table className="voucher-table">
        <thead>
          <tr>
            <th>Mã Voucher</th>
            <th>Mô tả</th>
            <th>Giá trị giảm</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày kết thúc</th>
            <th>Hoạt động</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {vouchers.map(voucher => (
            <tr key={voucher.MaVoucher}>
              <td>{voucher.code}</td>
              <td>{voucher.Mota}</td>
              <td>{voucher.GiaTriGiam * 100}%</td>
              <td>{new Date(voucher.NgayBatDau).toLocaleString()}</td>
              <td>{new Date(voucher.NgayKetThuc).toLocaleString()}</td>
              <td>{voucher.HoatDong ? 'Có' : 'Không'}</td>
              <td>
                <button onClick={() => handleEditVoucher(voucher)}><FaEdit /></button>
                <button onClick={() => handleToggleStatus(voucher)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VoucherManagement;