"use client";

import { ChevronDown, LayoutGrid, LayoutList, Search } from "lucide-react";
import React, { useState } from "react";

// Danh mục con
const subCategories = [
  { name: "Bổ sung Canxi & Vitamin D", images: "/images/product.png", count: 31 },
  { name: "Vitamin tổng hợp", images: "/images/product.png", count: 39 },
  { name: "Dầu cá, Omega 3, DHA", images: "/images/product.png", count: 17 },
  { name: "Vitamin C các loại", images: "/images/product.png", count: 7 },
  { name: "Bổ sung Sắt & Axit Folic", images: "/images/product.png", count: 8 },
  { name: "Vitamin E các loại", images: "/images/product.png", count: 4 },
  { name: "Bổ sung Kẽm & Magie", images: "/images/product.png", count: 5 },
];

// Component cho filter "Đối tượng sử dụng"
const TargetFilter: React.FC = () => {
  const targetOptions = [
    "Tất cả",
    "Trẻ em",
    "Phụ nữ có thai",
    "Phụ nữ cho con bú",
    "Người lớn",
    "Người già",
    "Vận động viên",
  ];

  const [expanded, setExpanded] = useState(true); // Mở/đóng bộ lọc
  const [filterExpanded, setFilterExpanded] = useState(false); // Hiển thị thêm/Ẩn bớt tùy chọn
  const [selected, setSelected] = useState<string[]>(["Tất cả"]); // Lưu trạng thái chọn
  const [searchQuery, setSearchQuery] = useState(""); // Từ khóa tìm kiếm

  // Logic để lọc tùy chọn (hiển thị "Tất cả" bất kể từ khóa)
  const filteredOptions = targetOptions.filter(
    (option) =>
      option === "Tất cả" || option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayOptions = filterExpanded ? filteredOptions : filteredOptions.slice(0, 5);

  const toggleOption = (option: string) => {
    if (option === "Tất cả") {
      setSelected(["Tất cả"]);
    } else {
      const newSelection = selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected.filter((item) => item !== "Tất cả"), option];
      setSelected(newSelection);
    }
  };

  return (
    <div className="border-b">
      {/* Tiêu đề */}
      <h2
        onClick={() => setExpanded(!expanded)}
        className="text-1xl flex justify-between items-center cursor-pointer select-none mb-2 py-2 bg-white relative z-10"
      >
        Đối tượng sử dụng
        <ChevronDown
          className={`transform transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          size={20}
        />
      </h2>

      {/* Nội dung */}
      {expanded && (
        <>
          {/* Ô tìm kiếm */}
          <div className="relative overflow-hidden mb-3 bg-white">
            <input
              type="text"
              placeholder="Tìm theo tên"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              size={18}
            />
          </div>

          {/* Danh sách các lựa chọn */}
          <div className="space-y-2">
            {displayOptions.map((option) => (
              <label key={option} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => toggleOption(option)}
                  className="accent-blue-600"
                />
                <span>{option}</span>
              </label>
            ))}
            {/* Nút "Xem thêm/Ẩn bớt" */}
            {filteredOptions.length > 5 && (
              <button
                onClick={() => setFilterExpanded((prev) => !prev)}
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              >
                {filterExpanded ? "Ẩn bớt" : "Xem thêm"}
                <ChevronDown
                  className={`transition-transform ${filterExpanded ? "rotate-180" : ""}`}
                  size={16}
                />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};


// Component cho filter "Mùi vị/ Mùi hương"
const FlavorScentFilter: React.FC = () => {
  const flavorScentOptions = [
    "Tất cả",
    "Vị Cam",
    "Vị Dâu",
    "Hương cam",
    "Hương chanh",
    "Hương dứa",
  ];

  const [expanded, setExpanded] = useState(false); 
  const [filterExpanded, setFilterExpanded] = useState(false); 
  const [selected, setSelected] = useState<string[]>(["Tất cả"]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOptions = flavorScentOptions.filter(
    (option) =>
      option === "Tất cả" || option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayOptions = filterExpanded ? filteredOptions : filteredOptions.slice(0, 5);

  const toggleOption = (option: string) => {
    if (option === "Tất cả") {
      setSelected(["Tất cả"]);
    } else {
      const newSelection = selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected.filter((item) => item !== "Tất cả"), option];
      setSelected(newSelection);
    }
  };

  return (
    <div className="border-b">
      {/* Tiêu đề */}
      <h2
        onClick={() => setExpanded(!expanded)}
        className="text-1xl flex justify-between items-center cursor-pointer select-none mb-2 py-2 bg-white relative z-10"
      >
        Mùi vị/ Mùi hương
        <ChevronDown
          className={`transform transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          size={20}
        />
      </h2>

      {/* Phần nội dung */}
      {expanded && (
        <>
          {/* Ô tìm kiếm */}
          <div className="relative overflow-hidden mb-3 bg-white">
            <input
              type="text"
              placeholder="Tìm theo tên"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              size={18}
            />
          </div>

          {/* Danh sách tùy chọn */}
          <div className="space-y-2">
            {displayOptions.map((option) => (
              <label key={option} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => toggleOption(option)}
                  className="accent-blue-600"
                />
                <span>{option}</span>
              </label>
            ))}

            {/* Nút "Xem thêm/Ẩn bớt" */}
            {filteredOptions.length > 5 && (
              <button
                onClick={() => setFilterExpanded((prev) => !prev)}
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              >
                {filterExpanded ? "Ẩn bớt" : "Xem thêm"}
                <ChevronDown
                  className={`transition-transform ${filterExpanded ? "rotate-180" : ""}`}
                  size={16}
                />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};


// Component cho filter "Giá bán"
const PriceFilter: React.FC = () => {
  const priceOptions = [
    "Dưới 100.000đ",
    "100.000đ - 300.000đ",
    "300.000đ - 500.000đ",
    "Trên 500.000đ",
  ];

  const [expanded, setExpanded] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  const toggleOption = (option: string) => {
    if (selected === option) {
      setSelected(null);
    } else {
      setSelected(option);
    }
  };

  return (
    <div className="border-b">
      <h2
        onClick={() => setExpanded(!expanded)}
        className="text-1xl flex justify-between items-center cursor-pointer select-none mb-2 py-2 bg-white relative z-10"
      >
        Giá bán
        <ChevronDown
          className={`transform transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          size={20}
        />
      </h2>
      {expanded && (
        <div className="grid grid-cols-1 gap-3">
          {priceOptions.map((option) => (
            <button
              key={option}
              onClick={() => toggleOption(option)}
              className={`w-full py-3 px-4 rounded-md text-sm transition-colors border border-gray-300 text-left ${
                selected === option
                  ? "bg-blue-100 text-blue-600 border-blue-500"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Component cho filter "Nước sản xuất"
const CountryFilter: React.FC = () => {
  const countryOptions = [
    "Tất cả",
    "Việt Nam",
    "Hoa Kỳ",
    "Pháp",
    "Úc",
    "Nhật Bản",
    "Hàn Quốc",
    "Thái Lan",
    "Singapore",
    "Canada",
  ];

  const [expanded, setExpanded] = useState(false);
  const [filterExpanded, setFilterExpanded] = useState(false); 
  const [selected, setSelected] = useState<string[]>(["Tất cả"]); 
  const [searchQuery, setSearchQuery] = useState(""); 

  const filteredOptions = countryOptions.filter(
    (option) =>
      option === "Tất cả" || option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayOptions = filterExpanded ? filteredOptions : filteredOptions.slice(0, 5);

  const toggleOption = (option: string) => {
    if (option === "Tất cả") {
      setSelected(["Tất cả"]);
    } else {
      const newSelection = selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected.filter((item) => item !== "Tất cả"), option];
      setSelected(newSelection);
    }
  };

  return (
    <div className="border-b">
      {/* Tiêu đề */}
      <h2
        onClick={() => setExpanded(!expanded)}
        className="text-1xl flex justify-between items-center cursor-pointer select-none mb-2 py-2 bg-white relative z-10"
      >
        Nước sản xuất
        <ChevronDown
          className={`transform transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          size={20}
        />
      </h2>

      {expanded && (
        <>
          {/* Ô tìm kiếm */}
          <div className="relative overflow-hidden mb-3 bg-white">
            <input
              type="text"
              placeholder="Tìm theo tên"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              size={18}
            />
          </div>

          {/* Danh sách tùy chọn */}
          <div className="space-y-2">
            {displayOptions.map((option) => (
              <label key={option} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => toggleOption(option)}
                  className="accent-blue-600"
                />
                <span>{option}</span>
              </label>
            ))}

            {/* Nút "Xem thêm/Ẩn bớt" */}
            {filteredOptions.length > 5 && (
              <button
                onClick={() => setFilterExpanded((prev) => !prev)}
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              >
                {filterExpanded ? "Ẩn bớt" : "Xem thêm"}
                <ChevronDown
                  className={`transition-transform ${filterExpanded ? "rotate-180" : ""}`}
                  size={16}
                />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};


// Component cho filter "Chỉ định"
const IndicationFilter: React.FC = () => {
  const indicationOptions = [
    "Tất cả",
    "Còi xương",
    "Suy dinh dưỡng",
    "Mệt mỏi",
    "Suy giảm hệ miễn dịch",
    "Loãng xương",
    "Tăng sức đề kháng",
    "Hỗ trợ tiêu hóa",
    "Thiếu máu",
    "Viêm khớp",
  ];

  const [expanded, setExpanded] = useState(false);
  const [filterExpanded, setFilterExpanded] = useState(false); 
  const [selected, setSelected] = useState<string[]>(["Tất cả"]); 
  const [searchQuery, setSearchQuery] = useState(""); 

  const filteredOptions = indicationOptions.filter(
    (option) =>
      option === "Tất cả" || option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayOptions = filterExpanded ? filteredOptions : filteredOptions.slice(0, 5);

  const toggleOption = (option: string) => {
    if (option === "Tất cả") {
      setSelected(["Tất cả"]);
    } else {
      const newSelection = selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected.filter((item) => item !== "Tất cả"), option];
      setSelected(newSelection);
    }
  };

  return (
    <div className="border-b">
      {/* Tiêu đề */}
      <h2
        onClick={() => setExpanded(!expanded)}
        className="text-1xl flex justify-between items-center cursor-pointer select-none mb-2 py-2 bg-white relative z-10"
      >
        Chỉ định
        <ChevronDown
          className={`transform transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          size={20}
        />
      </h2>

      {expanded && (
        <>
          {/* Ô tìm kiếm */}
          <div className="relative overflow-hidden mb-3 bg-white">
            <input
              type="text"
              placeholder="Tìm theo tên"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              size={18}
            />
          </div>

          {/* Danh sách tùy chọn */}
          <div className="space-y-2">
            {displayOptions.map((option) => (
              <label key={option} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => toggleOption(option)}
                  className="accent-blue-600"
                />
                <span>{option}</span>
              </label>
            ))}

            {/* Nút "Xem thêm/Ẩn bớt" */}
            {filteredOptions.length > 5 && (
              <button
                onClick={() => setFilterExpanded((prev) => !prev)}
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              >
                {filterExpanded ? "Ẩn bớt" : "Xem thêm"}
                <ChevronDown
                  className={`transition-transform ${filterExpanded ? "rotate-180" : ""}`}
                  size={16}
                />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

// Component cho filter "Thương hiệu"
const BrandFilter: React.FC = () => {
  const brandOptions = [
    "Tất cả",
    "Vitabiotics",
    "Brauer",
    "ERIC FAVRE® WELLNESS",
    "DHC",
    "Nature's Way",
    "Blackmores",
    "Thorne Research",
    "Solgar",
    "Now Foods",
  ];

  const [expanded, setExpanded] = useState(false);
  const [filterExpanded, setFilterExpanded] = useState(false); 
  const [selected, setSelected] = useState<string[]>(["Tất cả"]); 
  const [searchQuery, setSearchQuery] = useState(""); 

  const filteredOptions = brandOptions.filter(
    (option) =>
      option === "Tất cả" || option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayOptions = filterExpanded ? filteredOptions : filteredOptions.slice(0, 5);

  const toggleOption = (option: string) => {
    if (option === "Tất cả") {
      setSelected(["Tất cả"]);
    } else {
      const newSelection = selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected.filter((item) => item !== "Tất cả"), option];
      setSelected(newSelection);
    }
  };

  return (
    <div className="border-b">
      {/* Tiêu đề */}
      <h2
        onClick={() => setExpanded(!expanded)}
        className="text-1xl flex justify-between items-center cursor-pointer select-none mb-2 py-2 bg-white relative z-10"
      >
        Thương hiệu
        <ChevronDown
          className={`transform transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          size={20}
        />
      </h2>

      {expanded && (
        <>
          {/* Ô tìm kiếm */}
          <div className="relative overflow-hidden mb-3 bg-white">
            <input
              type="text"
              placeholder="Tìm theo tên"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              size={18}
            />
          </div>

          {/* Danh sách tùy chọn */}
          <div className="space-y-2">
            {displayOptions.map((option) => (
              <label key={option} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => toggleOption(option)}
                  className="accent-blue-600"
                />
                <span>{option}</span>
              </label>
            ))}

            {/* Nút "Xem thêm/Ẩn bớt" */}
            {filteredOptions.length > 5 && (
              <button
                onClick={() => setFilterExpanded((prev) => !prev)}
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              >
                {filterExpanded ? "Ẩn bớt" : "Xem thêm"}
                <ChevronDown
                  className={`transition-transform ${filterExpanded ? "rotate-180" : ""}`}
                  size={16}
                />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const OriginFilter: React.FC = () => {
  const originOptions = [
    "Tất cả",
    "Việt Nam",
    "Hoa Kỳ",
    "Úc",
    "Pháp",
    "Ý",
    "Anh",
    "Ba Lan",
    "Nhật Bản",
    "Đức",
    "Singapore",
    "Thái Lan",
    "Canada",
    "New Zealand",
    "Hàn Quốc",
    "Indonesia",
    "Mỹ",
    "Na Uy",
    "Thổ Nhĩ Kỳ",
    "Tây Ban Nha",
    "Đan Mạch",
  ];

  const [expanded, setExpanded] = useState(false);
  const [filterExpanded, setFilterExpanded] = useState(false); 
  const [selected, setSelected] = useState<string[]>(["Tất cả"]); 
  const [searchQuery, setSearchQuery] = useState(""); 

  const filteredOptions = originOptions.filter(
    (option) =>
      option === "Tất cả" || option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayOptions = filterExpanded ? filteredOptions : filteredOptions.slice(0, 5);

  const toggleOption = (option: string) => {
    if (option === "Tất cả") {
      setSelected(["Tất cả"]);
    } else {
      const newSelection = selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected.filter((item) => item !== "Tất cả"), option];
      setSelected(newSelection);
    }
  };

  return (
    <div className="border-b">
      {/* Tiêu đề */}
      <h2
        onClick={() => setExpanded(!expanded)}
        className="text1-xl flex justify-between items-center cursor-pointer select-none mb-2 py-2 bg-white relative z-10"
      >
        Xuất xứ thương hiệu
        <ChevronDown
          className={`transform transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          size={20}
        />
      </h2>

      {expanded && (
        <>
          {/* Ô tìm kiếm */}
          <div className="relative overflow-hidden mb-3 bg-white">
            <input
              type="text"
              placeholder="Tìm theo tên"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              size={18}
            />
          </div>

          {/* Danh sách tùy chọn */}
          <div className="space-y-2">
            {displayOptions.map((option) => (
              <label key={option} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => toggleOption(option)}
                  className="accent-blue-600"
                />
                <span>{option}</span>
              </label>
            ))}

            {/* Nút "Xem thêm/Ẩn bớt" */}
            {filteredOptions.length > 5 && (
              <button
                onClick={() => setFilterExpanded((prev) => !prev)}
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              >
                {filterExpanded ? "Ẩn bớt" : "Xem thêm"}
                <ChevronDown
                  className={`transition-transform ${filterExpanded ? "rotate-180" : ""}`}
                  size={16}
                />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};


// AdvancedFilters tổng hợp: bao gồm tiêu đề chung
const AdvancedFilters: React.FC = () => {
  return (
    <div className="space-y-2">
      <div className="mb-2">
        <h1 className="text-1xl font-bold">Bộ lọc nâng cao</h1>
        <hr className="border-t-2 border-black mt-2" />
      </div>
      <TargetFilter />
      <PriceFilter />
      <FlavorScentFilter />
      <CountryFilter />
      <IndicationFilter />
      <BrandFilter />
      <OriginFilter />
    </div>
  );
};

// ProductPage chính
const ProductPage: React.FC = () => {
  // Danh sách sản phẩm mẫu
  const products = [
    {
      id: 1,
      name: "Viên uống NutriGrow Nutrimed bổ sung canxi, vitamin D3, vitamin K2",
      price: 384000,
      originalPrice: 480000,
      sold: 500,
      discount: "-20%",
      image: "/images/product.png",
    },
    {
      id: 2,
      name: "Siro uống Canxi-D3-K2 5ml Kingphar bổ sung canxi",
      price: 105000,
      sold: 150,
      image: "/images/product.png",
    },
    {
      id: 3,
      name: "Siro Brauer Baby Kids D3+K2 High Potency MK-7 Drops 10ml bổ sung",
      price: 396000,
      sold: 300,
      image: "/images/product.png",
    },
    {
      id: 4,
      name: "Viên uống Omexxel 3-6-9 Premium hỗ trợ tốt cho não và mắt (100 viên)",
      price: 453000,
      sold: 800,
      image: "/images/product.png",
    },
    {
      id: 5,
      name: "Viên uống Omexxel 3-6-9 Premium hỗ trợ tốt cho não và mắt (100 viên)",
      price: 453000,
      sold: 800,
      image: "/images/product.png",
    },
  ];

  // Trạng thái sắp xếp và layout
  const [gridLayout, setGridLayout] = useState(4); // 4 cột hoặc 2 cột
  const [sortOption, setSortOption] = useState("bán chạy"); // "bán chạy", "giá thấp", "giá cao"

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "bán chạy":
        return b.sold - a.sold;
      case "giá thấp":
        return a.price - b.price;
      case "giá cao":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-4">
        <span className="text-blue-600 cursor-pointer">Trang chủ</span> /{" "}
        <span className="text-blue-600 cursor-pointer">Thực phẩm chức năng</span> /{" "}
        <span className="font-semi">Vitamin & Khoáng chất</span>
      </div>

      <header className="mb-8">
        <h1 className="text-2xl font-bold text-left">Vitamin & Khoáng chất</h1>
      </header>

      {/* Danh mục con */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {subCategories.map((cat, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md cursor-pointer bg-white"
          >
            <img src={cat.images} alt={cat.name} className="w-16 h-16 object-contain" />
            <div className="flex flex-col">
              <div className="font-medium text-sm">{cat.name}</div>
              <div className="text-xs text-gray-500">{cat.count} sản phẩm</div>
            </div>
          </div>
        ))}
      </div>

      {/* Phần hiển thị sản phẩm */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Bộ lọc */}
        <div className="border rounded-lg p-4 shadow-sm bg-white">
          <AdvancedFilters />
        </div>

        {/* Khu vực danh sách sản phẩm */}
        <div className="md:col-span-3">
          {/* Bộ điều khiển sắp xếp & chuyển đổi layout */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            {/* Tiêu đề Danh sách sản phẩm */}
            <h2 className="text-1xl font-semibold sm:mb-0">
              Danh sách sản phẩm
            </h2>

            {/* Các nút sắp xếp */}
            <div className="flex flex-wrap sm:flex-nowrap justify-between items-center space-x-3">
              {/* Phần sắp xếp – nằm bên trái */}
              <div className="flex items-center space-x-2">
                <span className="font-medium text-sm">Sắp xếp theo:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSortOption("bán chạy")}
                    className={`px-3 py-1 rounded-full text-sm border ${
                      sortOption === "bán chạy"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-600"
                    }`}
                  >
                    Bán chạy
                  </button>
                  <button
                    onClick={() => setSortOption("giá thấp")}
                    className={`px-3 py-1 rounded-full text-sm border ${
                      sortOption === "giá thấp"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-600"
                    }`}
                  >
                    Giá thấp
                  </button>
                  <button
                    onClick={() => setSortOption("giá cao")}
                    className={`px-3 py-1 rounded-full text-sm border ${
                      sortOption === "giá cao"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-600"
                    }`}
                  >
                    Giá cao
                  </button>
                </div>
              </div>

              {/* Phần chuyển đổi layout – nằm bên phải */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setGridLayout(4)}
                  title="4 cột"
                  className={`p-2 rounded-md border ${
                    gridLayout === 4
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <LayoutGrid size={20} />
                </button>
                <button
                  onClick={() => setGridLayout(2)}
                  title="2 cột"
                  className={`p-2 rounded-md border ${
                    gridLayout === 2
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <LayoutList size={20} />
                </button>
              </div>
            </div>
          </div>
          {/* Danh sách sản phẩm */}
          <div className={`grid grid-cols-1 ${gridLayout === 4 ? "sm:grid-cols-4" : "sm:grid-cols-2"} gap-4`}>
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className="border rounded-xl p-4 shadow-sm bg-white hover:shadow-md flex flex-col"
              >
                <div className="relative h-56 bg-gray-100 mb-2 rounded">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full rounded"
                  />
                  {product.discount && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      {product.discount}
                    </div>
                  )}
                </div>
                <div className="font-medium text-sm mb-1 text-left">
                  {product.name}
                </div>
                <div className="text-blue-500 text-sm text-left">
                 {product.price.toLocaleString()}đ
                </div>
                {product.originalPrice && (
                  <div className="text-gray-400 text-xs line-through text-left">
                   {product.originalPrice.toLocaleString()}đ
                  </div>
                )}
                <button className="mt-auto bg-blue-600 text-white py-1 px-2 rounded-full text-sm hover:bg-blue-700">
                  Chọn mua
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
