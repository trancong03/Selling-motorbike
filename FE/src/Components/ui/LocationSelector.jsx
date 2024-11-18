import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const LocationSelector = ({ updatediachi }) => {
    const [tinh, setTinh] = useState([]);
    const [quan, setQuan] = useState([]);
    const [phuong, setPhuong] = useState([]);
    const [selectedTinh, setSelectedTinh] = useState('');
    const [selectedQuan, setSelectedQuan] = useState('');
    const [selectedPhuong, setSelectedPhuong] = useState('');
    const [diachiDetail, setDiachiDetail] = useState('');
    
    const [tinhName, setTinhName] = useState('');
    const [quanName, setQuanName] = useState('');
    const [phuongName, setPhuongName] = useState('');
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch provinces
    useEffect(() => {
        setLoading(true);
        axios.get('https://provinces.open-api.vn/api/?depth=1')
            .then(response => {
                setTinh(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching provinces');
                setLoading(false);
            });
    }, []);

    // Fetch districts when province changes
    useEffect(() => {
        if (selectedTinh) {
            setLoading(true);
            axios.get(`https://provinces.open-api.vn/api/p/${selectedTinh}?depth=2`)
                .then(response => {
                    setQuan(response.data.districts);
                    setPhuong([]);
                    setLoading(false);
                })
                .catch(error => {
                    setError('Error fetching districts');
                    setLoading(false);
                });
        }
    }, [selectedTinh]);

    // Fetch wards when district changes
    useEffect(() => {
        if (selectedQuan) {
            setLoading(true);
            axios.get(`https://provinces.open-api.vn/api/d/${selectedQuan}?depth=2`)
                .then(response => {
                    setPhuong(response.data.wards);
                    setLoading(false);
                })
                .catch(error => {
                    setError('Error fetching wards');
                    setLoading(false);
                });
        }
    }, [selectedQuan]);

    const handleSubmit = () => {
        // Ensure each value is selected and valid
        if (!selectedTinh || !selectedQuan || !selectedPhuong || !diachiDetail) {
            alert('Please complete all fields');
            return;
        }
        const fulldiachi = `${diachiDetail}, ${phuongName}, ${quanName}, ${tinhName}`;
        updatediachi(fulldiachi);
    };

    const isFormValid = selectedTinh && selectedQuan && selectedPhuong && diachiDetail;

    return (
        <div className="p-6 max-w-full mx-auto">
            <h3 className="text-center text-2xl font-semibold mb-4">Địa chỉ</h3>
            
            {/* Error message */}
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}

            <div className="space-y-4">
                {/* Province (Tỉnh) Dropdown */}
                <div className="block w-full p-2 border rounded-md">
                    <label className="block mb-1 text-sm">Tỉnh, Thành phố *</label>
                    <div className="relative w-full">
                        <select
                            className="appearance-none text-xl w-full h-12 pl-3 pr-10 focus:outline-none focus:border-blue-500"
                            id="tinh"
                            name="tinh"
                            value={selectedTinh}
                            onChange={(e) => {
                                const selectedValue =  String(e.target.value);
                                setSelectedTinh(selectedValue);

                                // Normalize the comparison by converting the code and value to strings
                                const selected = tinh.find(item =>  String(item.code) === String(selectedValue));

                                if (selected) {
                                    setTinhName(selected.name);  // Update province name
                                } else {
                                    setTinhName('');  // Reset name if no match
                                }
                            }}

                        >
                            <option value="">Tỉnh Thành</option>
                            {tinh.map(({ code, name }) => (
                                <option key={code} value={code}>
                                    {name}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <FontAwesomeIcon icon={faCaretDown} />
                        </div>
                    </div>
                </div>

                {/* District (Quận, Huyện) Dropdown */}
                <div className="block w-full p-2 border rounded-md">
                    <label className="block mb-1">Quận, Huyện, Thị xã *</label>
                    <div className="relative w-full">
                        <select
                            className="appearance-none text-xl w-full h-12 pl-3 pr-10 focus:outline-none focus:border-blue-500"
                            id="quan"
                            name="quan"
                            value={selectedQuan}
                            onChange={(e) => {
                                setSelectedQuan( String(e.target.value));
                                const selected = quan.find(item =>  String(item.code) ===  String(e.target.value));
                                setQuanName(selected ? selected.name : '');
                            }}
                            disabled={!selectedTinh}
                        >
                            <option value="">Quận Huyện</option>
                            {quan.map(({ code, name }) => (
                                <option key={code} value={code}>
                                    {name}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <FontAwesomeIcon icon={faCaretDown} />
                        </div>
                    </div>
                </div>

                {/* Ward (Phường, Xã) Dropdown */}
                <div className="block w-full p-2 border rounded-md">
                    <label className="block mb-1">Phường, Xã, Thị trấn *</label>
                    <div className="relative w-full">
                        <select
                            className="appearance-none text-xl w-full h-12 pl-3 pr-10 focus:outline-none focus:border-blue-500"
                            id="phuong"
                            name="phuong"
                            value={selectedPhuong}
                            onChange={(e) => {
                                setSelectedPhuong( String(e.target.value));
                                const selected = phuong.find(item =>  String(item.code) ===  String(e.target.value));
                                setPhuongName(selected ? selected.name : '');
                            }}
                            disabled={!selectedQuan}
                        >
                            <option value="">Phường Xã</option>
                            {phuong.map(({ code, name }) => (
                                <option key={code} value={code}>
                                    {name}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <FontAwesomeIcon icon={faCaretDown} />
                        </div>
                    </div>
                </div>

                {/* Specific Address Input */}
                <div className="block w-full p-2 border rounded-md">
                    <label className="block mb-1">Địa chỉ cụ thể</label>
                    <input
                        type="text"
                        className="appearance-none text-xl w-full focus:outline-none focus:border-blue-500"
                        value={diachiDetail}
                        onChange={(e) => {
                            const valueWithoutComma = e.target.value.replace(/,/g, '');
                            setDiachiDetail(valueWithoutComma);
                        }}
                        placeholder="Nhập địa chỉ cụ thể"
                    />

                </div>
            </div>

            <button
                className={`w-full mt-6 py-3 ${isFormValid ? 'bg-orange-500' : 'bg-gray-300'} text-white font-semibold rounded-md`}
                onClick={handleSubmit}
                disabled={!isFormValid}
            >
                XONG
            </button>
        </div>
    );
};

export default LocationSelector;
