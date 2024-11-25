import { useState, useEffect, useRef } from "react";

const DungTichSelect = ({ onSelect, dungtich }) => {
    const options = [
        { value: "under50", label: "Dưới 50 cc" },
        { value: "50to100", label: "50 - 100 cc" },
        { value: "100to175", label: "100 - 175 cc" },
        { value: "over175", label: "Trên 175 cc" },
        { value: "unknown", label: "Không biết rõ" },
    ];

    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(dungtich || "");
    const [selectedOption, setSelectedOption] = useState("");
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

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

    useEffect(() => {
        setSearchTerm(dungtich || "");
    }, [dungtich]);

    const handleInputChange = (e) => {
        const value = e.target.value.trim();
        setSearchTerm(value);
        setIsOpen(true);
        onSelect(value);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option.label);
        setSearchTerm(option.label);
        setIsOpen(false);
        onSelect(option.label);
    };

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes((searchTerm || "").toLowerCase())
    );

    return (
        <div className="relative w-full">
            <label htmlFor="loaiXe" className="block text-sm font-medium text-gray-700">
                Dung Tích <span className="text-red-500">*</span>
            </label>
            <input
                ref={inputRef}
                type="text"
                id="dungTich"
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

export default DungTichSelect;
