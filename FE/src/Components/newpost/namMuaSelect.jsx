import { useState, useEffect, useRef } from "react";

const NamMuaSelect = ({ onSelect }) => {
    const options = Array.from({ length: 2024 - 1980 + 1 }, (_, index) => {
        const year = 1980 + index;
        return { value: year.toString(), label: year.toString() };
    });


    const [isOpen, setIsOpen] = useState(false);  // Dropdown open/close state
    const [searchTerm, setSearchTerm] = useState("");  // Search term entered by the user
    const [selectedOption, setSelectedOption] = useState("");  // Selected option
    const dropdownRef = useRef(null);  // Reference for the dropdown
    const inputRef = useRef(null);  // Reference for the input

    // Close dropdown when clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && inputRef.current && !inputRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);  // Update search term
        setIsOpen(true);  // Open dropdown when user types
        onSelect(e.target.value);  // Pass the input value to the parent component (formData)
    };

    const handleOptionClick = (option) => {
        handleInputChange;
        setSelectedOption(option.label);  // Update selected option with label
        setSearchTerm(option.label);  // Set search term to selected option labe
        setIsOpen(false);  // Close the dropdown
        onSelect(option.label);
    };

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())  // Filter options based on search term
    );

    return (
        <div className="relative w-full">
            <label htmlFor="loaiXe" className="block text-sm font-medium text-gray-700">
               Năm mua <span className="text-red-500">*</span>
            </label>
            <input
                ref={inputRef}  // Attach ref to input
                type="number"
                id="namMua"
                value={searchTerm}  // Display the search term entered by the user
                onChange={handleInputChange}  // Update search term on input change
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                aria-expanded={isOpen}
                aria-controls="dropdown-list"
                aria-autocomplete="list"
            />
            {isOpen && (
                <ul
                    ref={dropdownRef}  // Attach ref to dropdown
                    id="dropdown-list"
                    className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-auto shadow-lg"
                    role="listbox"
                    aria-live="polite"
                >
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                            <li
                                key={option.value}
                                onClick={() => handleOptionClick(option)}  // Handle option click
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
