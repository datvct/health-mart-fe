"use client";

import {
  ChevronDown,
  Menu,
  Mic,
  Phone,
  Search,
  ShoppingCart,
  Smartphone,
  User,
  UserPlus,
  X,
} from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { IMAGES } from "../constants/images";
import { Category } from "../types";
import { categories } from "./categories/data";

type SubCategory = {
  id: string;
  name: string;
  slug: string;
};

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
};


const MegaMenu: React.FC<{ category: Category }> = ({ category }) => {
  const featuredProducts: Product[] = [
    {
      id: "fp1",
      name: "Viên uống NutriGrow Nutrimed bổ sung canxi",
      image: "/images/product.png",
      price: 384000,
      originalPrice: 480000,
    },
    {
      id: "fp2",
      name: "Siro Brauer Baby Kids D3+K2 High Potency MK-7",
      image: "/images/product.png",
      price: 316800,
      originalPrice: 396000,
    },
    {
      id: "fp3",
      name: "Viên uống Omexxel 3-6-9 Premium",
      image: "/images/product.png",
      price: 453000,
    },
    {
      id: "fp4",
      name: "Viên uống hỗ trợ phụ nữ mang thai và cho con bú Brauer",
      image: "/images/product.png",
      price: 440000,
      originalPrice: 550000,
    },
  ];

  return (
    <div className="absolute left-0 top-full mt-3 w-full bg-white shadow-lg border-t border-gray-200">
      <div className="container mx-auto px-4 py-8 grid grid-cols-4 gap-6">
        {/* Cột trái: danh sách sub-category */}
        <div className="col-span-1">
          {category.subCategories && category.subCategories.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-4">{category.name}</h3>
              <ul className="space-y-2">
                {category.subCategories.map((subCat: SubCategory) => (
                  <li key={subCat.id}>
                    <a
                      href={`/category/${category.slug}/${subCat.slug}`}
                      className="block text-gray-700 hover:text-blue-600"
                    >
                      {subCat.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* Cột bên phải: hiển thị sản phẩm bán chạy */}
        <div className="col-span-3">
          <h3 className="text-lg font-bold mb-4">Bán chạy nhất</h3>
          <div className="grid grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="border border-gray-200 rounded p-2 hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="object-cover rounded"
                  />
                  {product.originalPrice && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-1 py-0.5 rounded">
                      Sale
                    </div>
                  )}
                </div>
                <h4 className="mt-2 text-sm font-medium text-gray-800">
                  {product.name}
                </h4>
                <div className="mt-1">
                  <span className="text-sm font-bold text-blue-600">
                    {product.price.toLocaleString("vi-VN")}₫
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-500 line-through ml-1">
                      {product.originalPrice.toLocaleString("vi-VN")}₫
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryNav: React.FC<{ categories: Category[] }> = ({ categories }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleContainerMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleContainerMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 200);
  };

  const handleItemMouseEnter = (id: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setActiveCategory(id);
  };

  return (
    <nav className="bg-white text-gray-800 py-3 border-b border-gray-200 hidden lg:block">
      <div
        className="relative container mx-auto px-4"
        onMouseLeave={handleContainerMouseLeave}
        onMouseEnter={handleContainerMouseEnter}
      >
        <div className="flex justify-center">
          <ul className="flex space-x-8">
            {categories.map((category) => (
              <li
                key={category.id}
                className="relative group"
                onMouseEnter={() => handleItemMouseEnter(category.id)}
              >
                <a
                  href={`/category/${category.slug}`}
                  className={`flex items-center text-sm font-medium hover:text-blue-600 transition-colors ${
                    activeCategory === category.id ? "text-blue-600" : ""
                  }`}
                >
                  {category.name}
                  {category.subCategories &&
                    category.subCategories.length > 0 && (
                      <ChevronDown size={16} className="ml-1" />
                    )}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* render mega menu */}
        {activeCategory && (() => {
          const activeCat = categories.find(
            (cat) => cat.id === activeCategory
          );
          if (
            activeCat &&
            activeCat.subCategories &&
            activeCat.subCategories.length > 0
          ) {
            return <MegaMenu category={activeCat} />;
          }
          return null;
        })()}
      </div>
    </nav>
  );
};

const DesktopHeader = () => {
  return (
    <header className="custom-background-header text-white hidden lg:block">
      {/* Top Section */}
      <div className="container flex justify-between items-center px-6 py-2 text-sm">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3">
            <Image
              src={IMAGES.IconLoudSpeaker}
              alt="Nhà thuốc Long Châu"
              width={20}
              height={20}
            />
            <span className="text-sm font-bold">
              Trung tâm tiêm chủng Long Châu
            </span>
          </div>
          <a href="#" className="underline text-sm font-bold">
            Xem chi tiết
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="flex items-center gap-2">
            <Smartphone size={20} />
            <span className="text-sm font-bold">Tải ứng dụng</span>
          </a>
          <a href="#" className="flex items-center gap-2">
            <Phone size={20} />
            <span className="text-sm font-bold">Tư vấn ngay: 1800 6928</span>
          </a>
        </div>
      </div>

      {/* Middle Section */}
      <div className="container flex items-center justify-between px-6 py-3">
        <div className="flex items-center">
          <Image
            src={IMAGES.ImageLogo}
            alt="Nhà thuốc Long Châu"
            width={160}
            height={50}
          />
        </div>
        <div className="flex items-center w-1/2 bg-white rounded-[25px] overflow-hidden">
          <input
            type="text"
            placeholder="Tìm tên thuốc, bệnh lý, thực phẩm chức năng..."
            className="w-full px-4 py-2 text-black focus:outline-none"
          />
          <button className="bg-[#0094FF] px-4 py-3">
            <Search className="text-white" size={20} />
          </button>
        </div>
        <div className="flex items-center space-x-6">
          <a href="#" className="flex items-center space-x-2">
            <User size={20} />
            <span>Đăng nhập</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 relative bg-[#1250DC] p-3 rounded-[25px]"
          >
            <ShoppingCart size={24} />
            <span className="absolute top-[-5px] right-[-5px] bg-red-500 text-white text-xs px-2 rounded-full">
              2
            </span>
            <span>Giỏ hàng</span>
          </a>
        </div>
      </div>

      {/* Navigation Categories */}
      <CategoryNav categories={categories} />
    </header>
  );
};

const MobileHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});

  return (
    <header className="lg:hidden custom-background-header">
      {/* Top Banner */}
      <div className="px-6 py-2">
        <div className="flex justify-center items-center">
          <Image
            src={IMAGES.IconLoudSpeaker}
            alt="Nhà thuốc Long Châu"
            width={20}
            height={20}
          />
          <span className="text-sm font-bold text-white ml-2">
            Nhà thuốc Long Châu
          </span>
          <a href="#" className="underline text-xs font-bold text-white ml-2">
            Xem chi tiết
          </a>
        </div>
      </div>

      <div className="container px-6 py-3 flex items-center justify-between">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2"
        >
          {isMobileMenuOpen ? (
            <X size={24} className="text-white" />
          ) : (
            <Menu size={24} className="text-white" />
          )}
        </button>

        <div className="flex flex-col items-center">
          <Image
            src={IMAGES.ImageLogo}
            alt="Nhà thuốc Long Châu"
            width={150}
            height={60}
          />
        </div>

        <button className="relative bg-[#1250DC] p-2 rounded-full">
          <ShoppingCart size={24} className="text-white" />
          <span className="absolute top-[-5px] right-[-5px] bg-red-500 text-white text-xs px-2 rounded-full">
            2
          </span>
        </button>
      </div>

      {/* Row 2: Search Bar */}
      <div className="container px-6 py-3">
        <div className="flex items-center bg-white rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="Freeship qua ứng dụng"
            className="flex-1 px-4 py-2 text-black focus:outline-none"
          />
          <button className="p-3">
            <Search size={20} className="text-gray-600" />
          </button>
          <button className="p-3">
            <Mic size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Overlay Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="relative container px-6 py-4">
            <div className="absolute top-4 right-4">
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={24} className="text-gray-600" />
              </button>
            </div>
            <div className="flex justify-around items-center mb-4">
              <a href="#" className="flex flex-col items-center">
                <User size={20} className="text-gray-600" />
                <span className="text-xs text-gray-600">Đăng nhập</span>
              </a>
              <a href="#" className="flex flex-col items-center">
                <UserPlus size={20} className="text-gray-600" />
                <span className="text-xs text-gray-600">Đăng ký</span>
              </a>
              <a href="#" className="flex flex-col items-center">
                <Smartphone size={20} className="text-gray-600" />
                <span className="text-xs text-gray-600">Tải ngay</span>
              </a>
              <a href="#" className="flex flex-col items-center">
                <Phone size={20} className="text-gray-600" />
                <span className="text-xs text-gray-600">Tư vấn</span>
              </a>
            </div>
            <h2 className="text-lg font-bold mb-4">Danh mục</h2>
            <ul className="space-y-2">
              {categories.map((category) => {
                const isExpanded = expandedCategories[category.id] || false;
                return (
                  <li key={category.id}>
                    <div className="flex items-center justify-between border-b">
                      <a
                        href={`/category/${category.slug}`}
                        className="block p-2 text-gray-800"
                      >
                        {category.name}
                      </a>
                      {category.subCategories &&
                        category.subCategories.length > 0 && (
                          <button
                            onClick={() =>
                              setExpandedCategories((prev) => ({
                                ...prev,
                                [category.id]: !prev[category.id],
                              }))
                            }
                            className="p-2"
                          >
                            <ChevronDown
                              className={`transform transition-transform duration-300 ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                              size={16}
                            />
                          </button>
                        )}
                    </div>
                    {isExpanded &&
                      category.subCategories &&
                      category.subCategories.length > 0 && (
                        <ul className="pl-4">
                          {category.subCategories.map((subCategory) => (
                            <li key={subCategory.id}>
                              <a
                                href={`/category/${category.slug}/${subCategory.slug}`}
                                className="block p-2 border-b text-gray-800"
                              >
                                {subCategory.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

const Header = () => {
  return (
    <>
      <DesktopHeader />
      <MobileHeader />
    </>
  );
};

export default Header;
