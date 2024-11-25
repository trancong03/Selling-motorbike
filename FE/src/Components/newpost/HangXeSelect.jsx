import { useState, useEffect, useRef } from "react";

const HangXeSelect = ({ onSelect, hangxe }) => {
    const options = [
        { value: "honda", label: "Honda" },
        { value: "yamaha", label: "Yamaha" },
        { value: "suzuki", label: "Suzuki" },
        { value: "kawasaki", label: "Kawasaki" },
        { value: "piaggio", label: "Piaggio" },
    ];

    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(hangxe || ""); // Khởi tạo với `hangxe` hoặc trống
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        // Cập nhật searchTerm khi hangxe thay đổi
        if (hangxe) {
            const matchedOption = options.find((option) => option.value === hangxe);
            setSearchTerm(matchedOption ? matchedOption.label : hangxe);
        } else {
            setSearchTerm(""); // Không có hãng xe => input trống
        }
    }, [hangxe]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value); // Cập nhật giá trị nhập
        setIsOpen(true); // Mở dropdown
        onSelect(value); // Gửi về parent
    };

    const handleOptionClick = (option) => {
        setSearchTerm(option.label); // Hiển thị tên hãng xe
        setIsOpen(false); // Đóng dropdown
        onSelect(option.value); // Trả về value của hãng xe
    };

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative w-full">
            <label htmlFor="hangXe" className="block text-sm font-medium text-gray-700">
                Hãng Xe <span className="text-red-500">*</span>
            </label>
            <input
                ref={inputRef}
                type="text"
                id="hangXe"
                value={searchTerm}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Chọn hãng xe"
            />
            {isOpen && (
                <ul
                    ref={dropdownRef}
                    className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg"
                >
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                            <li
                                key={option.value}
                                onClick={() => handleOptionClick(option)}
                                className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                            >
                                {option.label}
                            </li>
                        ))
                    ) : (
                        <li className="px-4 py-2 text-gray-500">Không tìm thấy kết quả</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default HangXeSelect;
