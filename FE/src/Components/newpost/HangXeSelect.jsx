import { useState, useEffect, useRef } from "react";

const HangXeSelect = ({ onSelect,hangxe }) => {
    const options = [
        { value: "honda", label: "Honda" },
        { value: "yamaha", label: "Yamaha" },
        { value: "suzuki", label: "Suzuki" },
        { value: "kawasaki", label: "Kawasaki" },
        { value: "piaggio", label: "Piaggio" },
        { value: "sym", label: "SYM" },
        { value: "vespa", label: "Vespa" },
        { value: "harleyDavidson", label: "Harley-Davidson" },
        { value: "bajaj", label: "Bajaj" },
        { value: "ducati", label: "Ducati" },
        { value: "ktm", label: "KTM" },
        { value: "bmw", label: "BMW Motorrad" },
        { value: "aprilia", label: "Aprilia" },
        { value: "triumph", label: "Triumph" },
        { value: "royalEnfield", label: "Royal Enfield" },
        { value: "husqvarna", label: "Husqvarna" },
        { value: "hondaScooter", label: "Honda (Scooter)" },
        { value: "yamahaScooter", label: "Yamaha (Scooter)" },
        { value: "benelli", label: "Benelli" },
        { value: "zongshen", label: "Zongshen" },
        { value: "cfmoto", label: "CFMOTO" },
        { value: "lexmoto", label: "Lexmoto" },
        { value: "kymco", label: "Kymco" },
        { value: "peugeotMotorcycles", label: "Peugeot Motorcycles" },
        { value: "tvs", label: "TVS Motor" },
        { value: "sachs", label: "Sachs" }
    ];


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
    useEffect(() => {
        setSearchTerm(hangxe);
    }, [hangxe]);
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
                Hãng Xe <span className="text-red-500">*</span>
            </label>
            <input
                ref={inputRef}  // Attach ref to input
                type="text"
                id="hangXe"
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

export default HangXeSelect;
