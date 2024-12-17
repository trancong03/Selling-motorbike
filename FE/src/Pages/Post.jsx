import React, { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import CartItem from "./../Components/ui/CartItem";
import ErrorBoundary from "../ErrorBoundary";
import Top100Post from "../Components/ui/Top100Post";

export default function Post() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0); // Tổng số sản phẩm
  const [dropdown, setDropdown] = useState(null); // Dropdown trạng thái
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1500000000);
  const [rangeValues, setRangeValues] = useState([0, 1500000000]);
  const [rangeNameValues, setRangeNameValues] = useState("Giá");
  const dropdownRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState("Toàn quốc");
  const [selectedBrand, setSelectedBrand] = useState("Hãng xe");

  // Hàm áp dụng bộ lọc giá
  const handleApplyFilter = () => {
    setRangeNameValues(`Từ ${rangeValues[0]} đến ${rangeValues[1]} đ`);
    setMinPrice(rangeValues[0]);
    setMaxPrice(rangeValues[1]);
    setDropdown(null); // Đóng dropdown
  };

  // Hàm đặt lại bộ lọc giá
  const handleResetFilter = () => {
    setRangeValues([0, 1500000000]);
    setMinPrice(0);
    setMaxPrice(1500000000);
    setRangeNameValues("Giá");
    setDropdown(null);
  };

  // Hàm xử lý bật/tắt dropdown
  const toggleDropdown = (name) => {
    setDropdown(dropdown === name ? null : name);
  };

  // Hàm xử lý thay đổi lọc
  const handleFilterChange = (filterType, value) => {
    if (filterType === "location") {
      setSelectedLocation(value);
    } else if (filterType === "brand") {
      setSelectedBrand(value);
    }
    setDropdown(null);
  };

  // Đóng dropdown khi nhấp ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdown]);

  // Gọi API để lấy danh sách sản phẩm
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

  // Lần đầu gọi API khi component mount
  useEffect(() => {
    fetchProducts(1);
  }, []);
  
  // Tải thêm sản phẩm
  const loadMoreProducts = () => {
    fetchProducts(currentPage + 1);
  };

  // Lọc sản phẩm theo tiêu chí
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesLocation =
        selectedLocation === "Toàn quốc" || product.location === selectedLocation;
      const matchesBrand =
        selectedBrand === "Hãng xe" || product.hangxe === selectedBrand;
      const matchesPrice =
        product.giaban >= rangeValues[0] && product.giaban <= rangeValues[1];

      return matchesLocation && matchesBrand && matchesPrice;
    });
  }, [products, selectedLocation, selectedBrand, rangeValues]);

  return (
    <div className="bg-white">
      <h1 className="text-3xl font-bold text-center p-3">DANH SÁCH CÁC BÀI VIẾT</h1>

      {/* Bộ lọc sản phẩm */}
      <div className="text-center mb-3 flex items-center justify-center w-100%">
        <div className="flex items-center gap-4 p-4 border-b bg-white relative">
          <button className="flex items-center gap-2 text-gray-700 hover:text-black">
            <i className="fas fa-filter"></i> Lọc
          </button>

          {/* Dropdown Địa điểm */}
          <select
            value={selectedLocation}
            onChange={(e) => handleFilterChange("location", e.target.value)}
            className="border rounded-full px-4 py-2 bg-white text-gray-700 hover:bg-gray-100"
          >
            <option value="Toàn quốc">Toàn quốc</option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="Hồ Chí Minh">Hồ Chí Minh</option>
          </select>

          {/* Dropdown Hãng xe */}
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

          {/* Dropdown Giá */}
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

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-4 gap-4 p-4">
        {filteredProducts.map((product) => (
          <ErrorBoundary key={product.mabaiviet}>
            <CartItem Product={product} />
          </ErrorBoundary>
        ))}
      </div>

      {/* Nút tải thêm */}
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
