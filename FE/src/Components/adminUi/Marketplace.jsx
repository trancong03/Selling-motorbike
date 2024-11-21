import React, { useState, useEffect } from "react";
import { FaSearch, FaMotorcycle, FaMapMarkerAlt, FaDollarSign, FaUser, FaPhone, FaInfoCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("");
  const [bikeType, setBikeType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [errors, setErrors] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState([]);

  const regions = ["Miền Bắc", "Miền TRung", "Miền Nam"]; // Bạn có thể điều chỉnh vùng nếu cần
  const bikeTypes = ["Xe song", "Xe côn", "Xe ga"];
  const priceRanges = ["<20000000", "20000000-40000000", "40000000-60000000", "60000000-80000000", "80000000-100000000"];

  useEffect(() => {
    // Gọi admin-api để lấy bài viết
    fetch("http://localhost:8000/admin-api/baiviet/")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data); // Lưu dữ liệu bài viết vào state
      })
      .catch((error) => console.error("Error fetching posts:", error));

    // Gọi admin-api để lấy hình ảnh
    fetch("http://localhost:8000/admin-api/hinhanh/")
      .then((response) => response.json())
      .then((data) => {
        setImages(data); // Lưu dữ liệu hình ảnh vào state
      })
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  // Hàm để tìm hình ảnh tương ứng với bài viết
  const getImageForPost = (mabaiviet) => {
    const image = images.find((img) => img.mabaiviet.trim() === mabaiviet.trim());
    return image ? `http://localhost:8000/uploads/${image.tenfile}` : "https://via.placeholder.com/150";
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!searchTerm.trim()) {
      newErrors.searchTerm = "Vui lòng nhập từ khóa tìm kiếm";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const filteredResults = posts.filter((post) => {
        const matchesTerm = post.tieude.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRegion = region ? post.diachibaiviet.includes(region) : true;
        const matchesType = bikeType ? post.tieude.includes(bikeType) : true;
        const matchesPrice = priceRange ? matchPriceRange(post.giatri, priceRange) : true;

        return matchesTerm && matchesRegion && matchesType && matchesPrice;
      });

      setSearchResults(filteredResults);
    }
  };

  const matchPriceRange = (price, range) => {
    const numericPrice = parseInt(price);
    switch (range) {
      case "<20000000":
        return numericPrice < 20000000;
      case "20000000-40000000":
        return numericPrice >= 20000000 && numericPrice <= 40000000;
      case "40000000-60000000":
        return numericPrice >= 40000000 && numericPrice <= 60000000;
      case "60000000-80000000":
        return numericPrice >= 60000000 && numericPrice <= 80000000;
      case "80000000-100000000":
        return numericPrice > 8000;
      default:
        return true;
    }
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleViewMore = (post) => {
    setSelectedPost(post);
  };

  const closeDetailView = () => {
    setSelectedPost(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Tìm Chiếc Xe Máy Cũ Giá Hợp Túi Tiền</h2>
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-grow relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm xe máy cũ"
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
              aria-label="Tìm kiếm xe máy cũ"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-400" />
          </div>
          <button
            type="button"
            onClick={toggleFilter}
            className="mt-2 md:mt-0 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            aria-expanded={isFilterOpen}
            aria-controls="filter-options"
          >
            Tùy chọn bộ lọc
          </button>
        </div>

        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
              id="filter-options"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="region" className="block mb-1 font-medium text-gray-700">
                    <FaMapMarkerAlt className="inline-block mr-2" />
                    Khu vực
                  </label>
                  <select
                    id="region"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="">Chọn khu vực</option>
                    {regions.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="bikeType" className="block mb-1 font-medium text-gray-700">
                    <FaMotorcycle className="inline-block mr-2" />
                    Loại xe
                  </label>
                  <select
                    id="bikeType"
                    value={bikeType}
                    onChange={(e) => setBikeType(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="">Chọn loại xe</option>
                    {bikeTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="priceRange" className="block mb-1 font-medium text-gray-700">
                    <FaDollarSign className="inline-block mr-2" />
                    Mức giá
                  </label>
                  <select
                    id="priceRange"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="">Chọn mức giá</option>
                    {priceRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {errors.searchTerm && (
          <p className="text-red-500 text-sm">{errors.searchTerm}</p>
        )}

        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Tìm kiếm
        </button>
      </form>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {searchResults.map((post) => (
          <motion.div
            key={post.mabaiviet}
            className="bg-white rounded-lg shadow-md p-4"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={getImageForPost(post.mabaiviet)}
              alt={post.tieude}
              className="h-48 w-full object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-lg font-bold mb-2">{post.tieude}</h3>
            <p className="text-gray-600">{post.mota}</p>
            <button
              onClick={() => handleViewMore(post)}
              className="mt-2 py-1 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Xem thêm
            </button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={closeDetailView}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <FaInfoCircle size={24} />
              </button>
              <h3 className="text-2xl font-bold mb-4">{selectedPost.tieude}</h3>
              <p className="text-gray-700">{selectedPost.mota}</p>
              <p className="text-gray-700">
                <FaUser className="inline-block mr-2" />
                Người bán: {selectedPost.tennguoiban}
              </p>
              <p className="text-gray-700">
                <FaPhone className="inline-block mr-2" />
                Số điện thoại: {selectedPost.sodienthoai}
              </p>
              <p className="text-gray-700">
                <FaMapMarkerAlt className="inline-block mr-2" />
                Địa chỉ: {selectedPost.diachibaiviet}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Marketplace;
