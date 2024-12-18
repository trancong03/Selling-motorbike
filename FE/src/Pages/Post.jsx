import React, { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import CartItem from "./../Components/ui/CartItem";
import ErrorBoundary from "../ErrorBoundary";

export default function Post() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [dropdown, setDropdown] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1500000000);
  const [rangeValues, setRangeValues] = useState([0, 1500000000]);
  const [rangeNameValues, setRangeNameValues] = useState("Giá");
  const dropdownRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState("Toàn quốc");
  const [selectedBrand, setSelectedBrand] = useState("Hãng xe");
  const [tinh, setTinh] = useState([]);
  const [selectedTinh, setSelectedTinh] = useState("Tỉnh Thành");
  const [tinhName, setTinhName] = useState("");

  // Handle applying the price filter
  const handleApplyFilter = () => {
    setRangeNameValues(`Từ ${rangeValues[0]} đến ${rangeValues[1]} đ`);
    setMinPrice(rangeValues[0]);
    setMaxPrice(rangeValues[1]);
    setDropdown(null);
  };

  // Handle resetting the price filter
  const handleResetFilter = () => {
    setRangeValues([0, 1500000000]);
    setMinPrice(0);
    setMaxPrice(1500000000);
    setRangeNameValues("Giá");
    setDropdown(null);
  };

  // Handle toggling dropdown
  const toggleDropdown = (name) => {
    setDropdown(dropdown === name ? null : name);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdown]);

  // Fetch products from API
  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/bai-viet/?page=${page}&limit=12`
      );
      if (page === 1) {
        setProducts(response.data.products);
      } else {
        setProducts((prev) => [...prev, ...response.data.products]);
      }
      setTotalCount(response.data.total_count);
      setCurrentPage(page);
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const loadMoreProducts = () => {
    fetchProducts(currentPage + 1);
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === "location") {
      const selectedValue = String(value);
      setSelectedTinh(selectedValue);
      const selected = tinh.find(
        (item) => String(item.code) === String(selectedValue)
      );
      if (selected) {
        setTinhName(selected.name);
      } else {
        setTinhName("");
      }
    } else if (filterType === "brand") {
      setSelectedBrand(value);
    }
    setDropdown(null);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesLocation =
        selectedTinh === "Tỉnh Thành" ||
        product.diachibaiviet.split(",").pop().trim() === tinhName;
      const matchesBrand =
        selectedBrand === "Hãng xe" || product.hangxe === selectedBrand;
      const matchesPrice =
        product.giaban >= rangeValues[0] && product.giaban <= rangeValues[1];

      return matchesLocation && matchesBrand && matchesPrice;
    });
  }, [products, selectedTinh, selectedBrand, rangeValues]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://provinces.open-api.vn/api/?depth=1")
      .then((response) => {
        setTinh(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching provinces");
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white mt-10 m-10">
      <div className="border-b-2 bg-orange-500 border-orange-500 my-5 m-20 p-0.5"></div>
      <div className="flex items-center justify-center p-5">
      <div 
          className="p-4 rounded-full shadow-md w-3/4 bg-gradient-to-r from-yellow-400 to-orange-500"
        >
          <h1 className="text-3xl font-bold text-center">DANH SÁCH CÁC BÀI VIẾT</h1>
        </div>
      </div>
      <div className="text-center mb-3 flex items-center justify-center w-100%">
        <div className="flex items-center gap-4 p-4 border-b bg-white relative">
          <button className="flex items-center gap-2 text-gray-700 hover:text-black">
            <i className="fas fa-filter"></i> Lọc
          </button>

          <select
            className="border rounded-full px-4 py-2 bg-white text-gray-700 hover:bg-gray-100"
            id="tinh"
            name="tinh"
            value={selectedTinh}
            onChange={(e) => handleFilterChange("location", e.target.value)}
          >
            <option value="Tỉnh Thành">Tỉnh Thành</option>
            {tinh.map(({ code, name }) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>

          <select
            value={selectedBrand}
            onChange={(e) => handleFilterChange("brand", e.target.value)}
            className="border rounded-full px-4 py-2 bg-white text-gray-700 hover:bg-gray-100"
          >
            <option value="Hãng xe">Hãng xe</option>
            <option value="Honda">Honda</option>
            <option value="Yamaha">Yamaha</option>
            <option value="SYM">SYM</option>
          </select>

          <div className="relative" ref={dropdownRef}>
            <button
              className="border rounded-full px-4 py-2 bg-white text-gray-700 hover:bg-gray-100"
              onClick={() => toggleDropdown("price")}
            >
              {rangeNameValues}
            </button>
            {dropdown === "price" && (
              <div className="absolute mt-2 bg-white shadow-lg rounded-md w-80 p-4 z-20">
                <h3 className="font-bold mb-4 text-gray-700">Chọn khoảng giá</h3>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    value={rangeValues[0]}
                    onChange={(e) =>
                      setRangeValues([+e.target.value, rangeValues[1]])
                    }
                    className="border rounded-md p-2 w-32"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    value={rangeValues[1]}
                    onChange={(e) =>
                      setRangeValues([rangeValues[0], +e.target.value])
                    }
                    className="border rounded-md p-2 w-32"
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={handleResetFilter}
                    className="border px-4 py-2 rounded-md"
                  >
                    Xóa lọc
                  </button>
                  <button
                    onClick={handleApplyFilter}
                    className="bg-orange-500 text-white px-4 py-2 rounded-md"
                  >
                    Áp dụng
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-1 p-1 m-1">
        {filteredProducts.map((product) => (
          <ErrorBoundary key={product.mabaiviet}>
            <CartItem Product={product} />
          </ErrorBoundary>
        ))}
      </div>

      {products.length < totalCount && (
        <div className="text-center my-4">
          <button
            onClick={loadMoreProducts}
            disabled={loading}
            className="bg-white text-black border-2 border-black px-6 py-3 rounded-full hover:bg-black hover:text-white"
          >
            {loading ? "Đang tải..." : "Xem thêm"}
          </button>
        </div>
      )}
    </div>
  );
}
