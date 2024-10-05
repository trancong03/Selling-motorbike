import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faPlay } from '@fortawesome/free-solid-svg-icons';
const LocationSelector = ({ updateAddress }) => {
    const [tinh, setTinh] = useState([]);
    const [quan, setQuan] = useState([]);
    const [phuong, setPhuong] = useState([]);
    const [selectedTinh, setSelectedTinh] = useState('');
    const [selectedQuan, setSelectedQuan] = useState('');
    const [selectedPhuong, setSelectedPhuong] = useState('');
    const [addressDetail, setAddressDetail] = useState('');

    // Lưu tên đầy đủ cho tỉnh, quận, phường
    const [tinhName, setTinhName] = useState('');
    const [quanName, setQuanName] = useState('');
    const [phuongName, setPhuongName] = useState('');
    // Lấy danh sách tỉnh thành khi component mount
    useEffect(() => {
        axios.get('https://esgoo.net/api-tinhthanh/1/0.htm')
            .then(response => {
                if (response.data.error === 0) {
                    setTinh(response.data.data);
                }
            })
            .catch(error => {
                console.error("Lỗi khi lấy danh sách tỉnh thành:", error);
            });
    }, []);

    // Lấy danh sách quận huyện khi tỉnh thay đổi
    useEffect(() => {
        if (selectedTinh) {
            axios.get(`https://esgoo.net/api-tinhthanh/2/${selectedTinh}.htm`)
                .then(response => {
                    if (response.data.error === 0) {
                        setQuan(response.data.data);
                        setPhuong([]);  // Reset danh sách phường xã khi chọn quận huyện mới
                    }
                })
                .catch(error => {
                    console.error("Lỗi khi lấy danh sách quận huyện:", error);
                });
        }
    }, [selectedTinh]);

    // Lấy danh sách phường xã khi quận thay đổi
    useEffect(() => {
        if (selectedQuan) {
            axios.get(`https://esgoo.net/api-tinhthanh/3/${selectedQuan}.htm`)
                .then(response => {
                    if (response.data.error === 0) {
                        setPhuong(response.data.data);
                    }
                })
                .catch(error => {
                    console.error("Lỗi khi lấy danh sách phường xã:", error);
                });
        }
    }, [selectedQuan]);

    const handleSubmit = () => {
        const fullAddress = ` ${addressDetail},${phuongName}, ${quanName}, ${tinhName}`;
        console.log("Địa chỉ đầy đủ:", fullAddress);
        updateAddress(fullAddress); 
    };



    return (
        <div className="p-6 max-w-full mx-auto">
            <h3 className="text-center text-2xl font-semibold mb-4">Địa chỉ</h3>
            <div className="space-y-4">
                <div className='block w-full p-2 border rounded-md'>
                    <label className="block mb-1 text-sm">Tỉnh, Thành phố *</label>
                    <div className="relative w-full">
                    <select
                            className="appearance-none text-xl w-full h-12 pl-3 pr-10 focus:outline-none focus:border-blue-500"
                        id="tinh"
                        name="tinh"
                        value={selectedTinh}
                            onChange={(e) => {
                                setSelectedTinh(e.target.value);
                                const selected = tinh.find(item => item.id === e.target.value);
                                setTinhName(selected ? selected.full_name : ''); 
                            }}
                    >
                        <option value="">Tỉnh Thành</option>
                        {tinh.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.full_name}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <FontAwesomeIcon icon={faCaretDown} />
                    </div>
                    </div>
                </div>

                <div className='block w-full p-2 border rounded-md'>
                    <label className="block mb-1">Quận, Huyện, Thị xã *</label>
                    <div className="relative w-full">
                    <select
                        className="appearance-none text-xl w-full h-12
                         pl-3 pr-10 focus:outline-none focus:border-blue-500"
                        id="quan"
                        name="quan"
                        value={selectedQuan}
                            onChange={(e) => {
                                setSelectedQuan(e.target.value);
                                const selected = quan.find(item => item.id === e.target.value);
                                setQuanName(selected ? selected.full_name : ''); 
                            }}
                        disabled={!selectedTinh}
                    >
                        <option value="">Quận Huyện</option>
                        {quan.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.full_name}
                            </option>
                        ))}
                    </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <FontAwesomeIcon icon={faCaretDown} />
                        </div>
                    </div>
                </div>

                <div className='block w-full p-2 border rounded-md'>
                    <label className="block mb-1">Phường, Xã, Thị trấn *</label>
                    <div className="relative w-full">
                    <select
                        className="appearance-none text-xl w-full h-12 pl-3 pr-10 focus:outline-none focus:border-blue-500"
                        id="phuong"
                        name="phuong"
                        value={selectedPhuong}
                            onChange={(e) => {
                                setSelectedPhuong(e.target.value);
                                const selected = phuong.find(item => item.id === e.target.value);
                                setPhuongName(selected ? selected.full_name : '');
                            }}
                        disabled={!selectedQuan}
                    >
                        <option value="">Phường Xã</option>
                        {phuong.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.full_name}
                            </option>
                        ))}
                    </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <FontAwesomeIcon icon={faCaretDown} />
                        </div>
                    </div>
                </div>

                <div className='block w-full p-2 border rounded-md'>
                    <label className="block mb-1">Địa chỉ cụ thể</label>
                    <input
                        type="text"
                        className="appearance-none text-xl w-full focus:outline-none focus:border-blue-500"
                        value={addressDetail}
                        onChange={(e) => setAddressDetail(e.target.value)}
                        placeholder="Nhập địa chỉ cụ thể"
                    />
                </div>
            </div>

            <button
                className="w-full mt-6 py-3 bg-orange-500 text-white font-semibold rounded-md"
                onClick={handleSubmit}
            >
                XONG
            </button>
        </div>
    );
};

export default LocationSelector;
