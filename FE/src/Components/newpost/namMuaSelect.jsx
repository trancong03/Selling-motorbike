import { useState, useEffect, useRef } from "react";

const NamMuaSelect = ({ onSelect, nammua }) => {
    const options = Array.from({ length: 2024 - 1980 + 1 }, (_, index) => {
        const year = 1980 + index;
        return { value: year.toString(), label: year.toString() };
    });

    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(nammua || ""); // Khởi tạo searchTerm với nammua nếu có
    const [selectedOption, setSelectedOption] = useState(nammua || ""); // Khởi tạo selectedOption
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && inputRef.current && !inputRef.current.contains(event.target)) {
                setIsOpen(false); // Đóng dropdown khi click ra ngoài
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value); // Cập nhật giá trị nhập vào

        // Kiểm tra nếu giá trị nhập vào là số và trong khoảng 1980 - 2024
        const numericValue = parseInt(value, 10);
        if (!isNaN(numericValue) && numericValue >= 1980 && numericValue <= 2024) {
            setIsOpen(true); // Mở dropdown khi giá trị hợp lệ
            onSelect(value); // Gửi giá trị tới component cha
        } else {
            setIsOpen(false); // Đóng dropdown khi giá trị không hợp lệ
        }
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option.label);
        setSearchTerm(option.label);
        setIsOpen(false); // Đóng dropdown sau khi chọn
        onSelect(option.label); // Gửi giá trị đã chọn tới component cha
    };

    useEffect(() => {
        setSearchTerm(nammua || ""); // Đặt lại searchTerm nếu nammua thay đổi
        setSelectedOption(nammua || ""); // Đặt lại selectedOption nếu nammua thay đổi
    }, [nammua]);

    const filteredOptions = options.filter((option) =>
        option.label.includes(searchTerm) // Lọc các tùy chọn theo giá trị nhập vào
    );

    return (
        <div className="relative w-full">
            <label htmlFor="namMua" className="block text-sm font-medium text-gray-700">
                Năm mua <span className="text-red-500">*</span>
            </label>
            <input
                ref={inputRef}
                type="text"  // Để người dùng có thể nhập tự do
                id="namMua"
                value={searchTerm}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                aria-expanded={isOpen}
                aria-controls="dropdown-list"
                aria-autocomplete="list"
            />
            {isOpen && (
                <ul
                    ref={dropdownRef}
                    id="dropdown-list"
                    className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-auto shadow-lg"
                    role="listbox"
                    aria-live="polite"
                >
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                            <li
                                key={option.value}
                                onClick={() => handleOptionClick(option)}
                                className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                                role="option"
                                aria-selected={selectedOption === option.label}
                            >
                                {option.label}
                            </li>
                        ))
                    ) : (
                        <li className="px-4 py-2 text-gray-500" role="option">
                            Không tìm thấy kết quả
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default NamMuaSelect;
