import { useState, useEffect, useRef } from "react";

const XuatXuSelect = ({ onSelect, xuatXu }) => {
    const options = [
        { value: "nhat-ban", label: "Nhật Bản" },
        { value: "trung-quoc", label: "Trung Quốc" },
        { value: "an-do", label: "Ấn Độ" },
        { value: "my", label: "Mỹ" },
        { value: "y", label: "Ý" },
        { value: "indonesia", label: "Indonesia" },
        { value: "duc", label: "Đức" },
        { value: "thailand", label: "Thái Lan" },
        { value: "brazil", label: "Brazil" },
        { value: "vietnam", label: "Việt Nam" },
    ];

    const [isOpen, setIsOpen] = useState(false); // Dropdown open/close state
    const [searchTerm, setSearchTerm] = useState(""); // Search term entered by user
    const [selectedOption, setSelectedOption] = useState(""); // Selected option
    const dropdownRef = useRef(null); // Reference for dropdown
    const inputRef = useRef(null); // Reference for input

    // Close dropdown when clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                inputRef.current &&
                !inputRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Update search term and notify parent
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value); // Update search term
        setIsOpen(true); // Open dropdown
        onSelect(value); // Notify parent of selection
    };

    // Handle option click
    const handleOptionClick = (option) => {
        setSelectedOption(option.label); // Set selected option
        setSearchTerm(option.label); // Update input value
        setIsOpen(false); // Close dropdown
        onSelect(option.label); // Notify parent
    };

    // Set default value when xuatXu changes
    useEffect(() => {
        if (xuatXu) {
            setSearchTerm(xuatXu); // Set search term if xuatXu is provided
        } else {
            setSearchTerm(""); // Clear search term if xuatXu is not provided
        }
    }, [xuatXu]);

    // Filter options based on search term
    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative w-full">
            <label htmlFor="xuatXu" className="block text-sm font-medium text-gray-700">
                Xuất xứ<span className="text-red-500">*</span>
            </label>
            <input
                ref={inputRef} // Attach ref to input
                type="text"
                id="xuatXu"
                value={searchTerm} // Display the search term
                onChange={handleInputChange} // Update search term on input change
                placeholder="Nhập hoặc chọn xuất xứ"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                aria-expanded={isOpen}
                aria-controls="dropdown-list"
                aria-autocomplete="list"
            />
            {isOpen && (
                <ul
                    ref={dropdownRef} // Attach ref to dropdown
                    id="dropdown-list"
                    className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-auto shadow-lg"
                    role="listbox"
                    aria-live="polite"
                >
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                            <li
                                key={option.value}
                                onClick={() => handleOptionClick(option)} // Handle option click
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

export default XuatXuSelect;
