'use client';
import { Button, Modal } from 'antd';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

const ProductDetail = () => {
  const productData = {
    brand: "Sanofi",
    name: "Hỗn dịch uống men vi sinh Enterogermina Gut Defense Sanofi tăng cường tiêu hóa, hỗ trợ bảo vệ đường ruột",
    code: "00047402",
    rating: 4.8,
    reviewsCount: 19,
    commentsCount: 185,
    price: 165000,
    units: ["Hộp", "Vỉ", "Ống",],
    category: "Dạ dày, tá tràng",
    registrationNumber: "2085/2024/ĐKSP",
    dosageForm: "Hỗn dịch uống",
    packaging: "Hộp 2 vỉ x 10 ống",
    origin: {
      brandCountry: "Pháp",
      manufacturer: "Opella Healthcare Italy S.R.L.",
      productionCountry: "Ý",
    },
    ingredients: ["Bacillus clausii"],
    shortDescription: "Enterogermina Gut Defense giúp tăng cường tiêu hóa, hỗ trợ bảo vệ đường ruột trước hại khuẩn.",
    promotion: {
      description: "Giảm ngay 10% áp dụng đến",
      validUntil: "31/05",
    },
    images: [
      'https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_01959_4e83fd083f.jpg',
      'https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_01967_5ba17b9fc3.jpg',
      'https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_01960_1704a27488.jpg',
      'https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_01961_d57d546354.jpg',
      'https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_01962_da6b5b93a5.jpg',
      'https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_01962_da6b5b93a5.jpg',
      'https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_01962_da6b5b93a5.jpg',
      'https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_01962_da6b5b93a5.jpg',
      'https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_01962_da6b5b93a5.jpg',
      'https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_01962_da6b5b93a5.jpg',
      'https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_01962_da6b5b93a5.jpg',
      'https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_01962_da6b5b93a5.jpg',
      'https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_01962_da6b5b93a5.jpg',
      'https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_01962_da6b5b93a5.jpg',
      'https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_01962_da6b5b93a5.jpg',
      'https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_01962_da6b5b93a5.jpg',

    ],
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleNextImage = () => {
    if (currentImageIndex < productData.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalVisible(true);
  };

  const closeModal = () => setIsModalVisible(false);

  // Tự động cuộn thumbnail được chọn vào giữa view
  useEffect(() => {
    const currentThumb = thumbnailRefs.current[currentImageIndex];
    if (currentThumb) {
      currentThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [currentImageIndex]);

  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const tabData = [
    {
      key: '1',
      label: 'Mô tả sản phẩm',
      title: 'Mô tả sản phẩm',
      content: [
        'Tại Việt Nam, ngày càng nhiều trẻ nhỏ gặp vấn đề về tiêu hóa, với tỷ lệ mắc bệnh lên tới 40%...',
        'Đường ruột của chúng ta là nơi cư trú của hàng triệu vi khuẩn...',
      ],
    },
    {
      key: '2',
      label: 'Thành phần',
      title: 'Thành phần',
      content: ['Bacillus clausii'],
    },
    {
      key: '3',
      label: 'Công dụng',
      title: 'Công dụng',
      content: [
        'Enterogermina Gut Defense giúp tăng cường tiêu hóa, hỗ trợ bảo vệ đường ruột trước hại khuẩn.',
      ],
    },
    {
      key: '4',
      label: 'Cách dùng',
      title: 'Cách dùng',
      content: [
        'Uống trực tiếp. Cho trẻ 0 - 12 tuổi: 1 - 2 ống mỗi ngày. Trẻ trên 12 tuổi và người lớn: 2 - 3 ống mỗi ngày.',
      ],
    },
    {
      key: '5',
      label: 'Tác dụng phụ',
      title: 'Tác dụng phụ',
      content: ['Chưa có thông tin về tác dụng phụ của sản phẩm.'],
    },
    {
      key: '6',
      label: 'Lưu ý',
      title: 'Lưu ý',
      content: [
        'Không sử dụng cho người mẫn cảm/kiêng kỵ với bất kỳ thành phần nào của sản phẩm.',
      ],
    },
    {
      key: '7',
      label: 'Bảo quản',
      title: 'Bảo quản',
      content: [
        'Bảo quản nơi khô ráo, thoáng mát, nhiệt độ không quá 30 độ C, tránh ánh sáng. Để xa tầm tay trẻ em.',
      ],
    },
  ];
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [isExpanded, setIsExpanded] = useState(false);

  const scrollToSection = (key: string) => {
    const index = tabData.findIndex((item) => item.key === key);

    if (!isExpanded && index >= 3) {
      setIsExpanded(true);

      // Đợi cho render xong rồi mới scroll
      setTimeout(() => {
        sectionRefs.current[key]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      sectionRefs.current[key]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const visibleTabs = isExpanded ? tabData : tabData.slice(0, 3);

  const [isFontLarge, setIsFontLarge] = useState(false); // Trạng thái phóng to chữ
  const [activeTab, setActiveTab] = useState<string | null>(null); // Trạng thái tab được chọn

  const handleTabClick = (key: string) => {
    setActiveTab(key);
    scrollToSection(key);
  };

  const mockReviews = [
    {
      id: 1,
      userName: "Vũ Hoàng Hải",
      initials: "HH",
      rating: 5,
      content: "",
      createdAt: "6 giờ trước",
      reply: {
        repliedBy: "Vi Trần",
        initials: "VT",
        role: "Dược sĩ",
        replyContent:
          "Chào bạn Vũ Hoàng Hải, dạ rất cảm ơn tình cảm của bạn dành cho nhà thuốc FPT Long Châu. Bất cứ khi nào bạn cần hỗ trợ, vui lòng liên hệ tổng đài miễn phí 18006928 để được tư vấn và đặt hàng. Thân mến!",
        repliedAt: "3 giờ trước",
      },
    },
    {
      id: 2,
      userName: "Chị Trang",
      initials: "CT",
      rating: 5,
      content: "bé bị táo dùng được không ạ",
      createdAt: "5 ngày trước",
      reply: {
        repliedBy: "Anh Mạc Thị Tuyết",
        initials: "AT",
        role: "Dược sĩ",
        replyContent:
          "Chào chị Trang, dạ mình có thể cho bé sử dụng và theo dõi thêm ạ. Nhà thuốc thông tin đến chị. Thân mến!",
        repliedAt: "5 ngày trước",
      },
    },
    {
      id: 3,
      userName: "Bùi Anh Tuấn",
      initials: "AT",
      rating: 4,
      content: "e",
      createdAt: "5 ngày trước",
      reply: {
        repliedBy: "Quỳnh Chu",
        initials: "QC",
        role: "Dược sĩ",
        replyContent:
          "Chào bạn, cảm ơn bạn đã đánh giá. Nếu có bất kỳ thắc mắc nào, bạn cứ để lại câu hỏi nhé!",
        repliedAt: "4 ngày trước",
      },
    },
    {
      id: 4,
      userName: "Bùi Anh Tuấn",
      initials: "AT",
      rating: 4,
      content: "e",
      createdAt: "5 ngày trước",
      reply: {
        repliedBy: "Quỳnh Chu",
        initials: "QC",
        role: "Dược sĩ",
        replyContent:
          "Chào bạn, cảm ơn bạn đã đánh giá. Nếu có bất kỳ thắc mắc nào, bạn cứ để lại câu hỏi nhé!",
        repliedAt: "4 ngày trước",
      },
    },
    {
      id: 5,
      userName: "Bùi Anh Tuấn",
      initials: "AT",
      rating: 4,
      content: "e",
      createdAt: "5 ngày trước",
      reply: {
        repliedBy: "Quỳnh Chu",
        initials: "QC",
        role: "Dược sĩ",
        replyContent:
          "Chào bạn, cảm ơn bạn đã đánh giá. Nếu có bất kỳ thắc mắc nào, bạn cứ để lại câu hỏi nhé!",
        repliedAt: "4 ngày trước",
      },
    },
    {
      id: 6,
      userName: "Bùi Anh Tuấn",
      initials: "AT",
      rating: 4,
      content: "e",
      createdAt: "5 ngày trước",
      reply: {
        repliedBy: "Quỳnh Chu",
        initials: "QC",
        role: "Dược sĩ",
        replyContent:
          "Chào bạn, cảm ơn bạn đã đánh giá. Nếu có bất kỳ thắc mắc nào, bạn cứ để lại câu hỏi nhé!",
        repliedAt: "4 ngày trước",
      },
    },
    {
      id: 7,
      userName: "Bùi Anh Tuấn",
      initials: "AT",
      rating: 4,
      content: "e",
      createdAt: "5 ngày trước",
      reply: {
        repliedBy: "Quỳnh Chu",
        initials: "QC",
        role: "Dược sĩ",
        replyContent:
          "Chào bạn, cảm ơn bạn đã đánh giá. Nếu có bất kỳ thắc mắc nào, bạn cứ để lại câu hỏi nhé!",
        repliedAt: "4 ngày trước",
      },
    },

    {
      id: 8,
      userName: "Bùi Anh Tuấn",
      initials: "AT",
      rating: 4,
      content: "e",
      createdAt: "5 ngày trước",
      reply: {
        repliedBy: "Quỳnh Chu",
        initials: "QC",
        role: "Dược sĩ",
        replyContent:
          "Chào bạn, cảm ơn bạn đã đánh giá. Nếu có bất kỳ thắc mắc nào, bạn cứ để lại câu hỏi nhé!",
        repliedAt: "4 ngày trước",
      },
    },
    {
      id: 9,
      userName: "Bùi Anh Tuấn",
      initials: "AT",
      rating: 4,
      content: "e",
      createdAt: "5 ngày trước",
      reply: {
        repliedBy: "Quỳnh Chu",
        initials: "QC",
        role: "Dược sĩ",
        replyContent:
          "Chào bạn, cảm ơn bạn đã đánh giá. Nếu có bất kỳ thắc mắc nào, bạn cứ để lại câu hỏi nhé!",
        repliedAt: "4 ngày trước",
      },
    },
  ];

  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [visibleReviews, setVisibleReviews] = useState(5);

  // Hàm lọc đánh giá theo sao
  const handleFilter = (rating: number) => {
    setSelectedRating(rating);
    setVisibleReviews(5); // Reset lại số lượng bình luận khi thay đổi bộ lọc
  };

  // Hàm load thêm bình luận
  const handleLoadMore = () => {
    setVisibleReviews(visibleReviews + 5);
  };

  // Lọc các bình luận theo số sao đã chọn
  const filteredReviews = selectedRating
    ? mockReviews.filter((review) => review.rating === selectedRating)
    : mockReviews;

  // Cập nhật lại số lượng đánh giá và trung bình sao cho toàn bộ bình luận (không bị ảnh hưởng bởi bộ lọc)
  const overallRatingStats = {
    total: mockReviews.length,
    average: mockReviews.length
      ? mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length
      : 0,
    counts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  };

  // Tính số lượng sao cho tất cả các đánh giá
  mockReviews.forEach((review) => {
    overallRatingStats.counts[review.rating as keyof typeof overallRatingStats.counts]++;
  });

  return (
    <section className='py-5'>
      <div className="bg-white p-6 rounded-xl shadow-md w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Section: Product Images */}
          <div className="flex flex-col items-center">
            {/* Nút "Chính hãng - Tra cứu" */}
            <div className="flex justify-end l20 w-full mb-2 mr-20">
              <Image
                src="/images/authenticity-badge.webp"
                alt="Chính hãng"
                width={72}
                height={90}
              />
            </div>

            {/* Ảnh lớn */}
            <div className="relative mb-4">
              <Image
                src={productData.images[currentImageIndex]}
                alt={`Ảnh sản phẩm ${currentImageIndex + 1}`}
                width={450}
                height={450}
                className="rounded-lg object-cover cursor-pointer"
                onClick={() => openModal(currentImageIndex)}
              />

              {/* Nút điều hướng trái */}
              <button
                onClick={handlePrevImage}
                disabled={currentImageIndex === 0}
                className="absolute top-1/2 left-0 opacity-80 transform -translate-y-1/2 bg-gray-500 hover:bg-gray-600 rounded-full p-3 shadow-md disabled:opacity-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Nút điều hướng phải */}
              <button
                onClick={handleNextImage}
                disabled={currentImageIndex === productData.images.length - 1}
                className="absolute top-1/2 right-0 opacity-80 transform -translate-y-1/2 bg-gray-500 hover:bg-gray-600 rounded-full p-3 shadow-md disabled:opacity-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

            </div>

            {/* Thumbnail */}
            <div className="flex gap-2 items-center mb-2">
              {productData.images.slice(0, 3).map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`cursor-pointer border p-1 ${currentImageIndex === idx ? 'border-blue-500' : 'border-gray-300'}`}
                  style={{ borderRadius: '10px' }}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>
              ))}

              {/* Ảnh thứ 4 bị overlay nếu có nhiều hơn 4 ảnh */}
              {productData.images.length > 4 && (
                <div
                  onClick={() => openModal(3)} // Mở modal khi nhấn vào "Xem thêm"
                  className="relative cursor-pointer border p-1 rounded-md border-gray-300"
                  style={{ borderRadius: '10px' }}
                >
                  <Image
                    src={productData.images[3]}
                    alt="Thumbnail 4"
                    width={100}
                    height={100}
                    className="rounded-md object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-sm"
                    style={{ borderRadius: '10px' }} // Thêm border-radius cho lớp phủ đen
                  >
                    <span>Xem thêm</span>
                    <span>{productData.images.length - 3} ảnh</span>
                  </div>
                </div>
              )}


              {/* Nếu chỉ có đúng 4 ảnh thì hiển thị ảnh thứ 4 bình thường */}
              {productData.images.length === 4 && (
                <div
                  onClick={() => setCurrentImageIndex(3)}
                  className={`cursor-pointer border p-1 rounded-md ${currentImageIndex === 3 ? 'border-blue-500' : 'border-gray-300'}`}
                  style={{ borderRadius: '10px' }}
                >
                  <Image
                    src={productData.images[3]}
                    alt="Thumbnail 4"
                    width={100}
                    height={100}
                    className="rounded-md object-cover"
                  />
                </div>
              )}
            </div>

            {/* Ghi chú */}
            <p className="text-sm text-gray-500">
              Mẫu mã sản phẩm có thể thay đổi theo lô hàng
            </p>
          </div>

          {/* Right Section: Product Information */}
          <div>
            <p className="text-base text-black">
              <span className="font-semibold">Thương hiệu:</span>{' '}
              <a href="#" className="text-blue-600 no-underline">
                {productData.brand}
              </a>
            </p>
            <h1 className="text-2xl font-bold text-gray-800">
              {productData.name}
            </h1>
            <p className="text-base text-gray-600 mt-2 flex items-center gap-2 flex-wrap">
              <span>{productData.code}</span>
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span className="flex items-center gap-1">
                <span className="text-yellow-500 font-semibold">{productData.rating}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 text-yellow-500"
                >
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.857 1.464 8.837L12 18.896l-7.4 4.104 1.464-8.837L0 9.306l8.332-1.151z" />
                </svg>
              </span>
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <a href="#" className="text-blue-600 hover:underline">
                {productData.reviewsCount} đánh giá
              </a>
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <a href="#" className="text-blue-600 hover:underline">
                {productData.commentsCount} bình luận
              </a>
            </p>


            {/* Price */}
            <div className="mt-4">
              <p className="text-4xl font-bold text-blue-600">{productData.price.toLocaleString()}đ/ Hộp</p>
              <p className="text-xl text-gray-400 line-through">184.000đ</p>
            </div>

            {/* Additional Info */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
              <p className="font-semibold text-gray-500">Chọn đơn vị tính:</p>
              <div className="flex gap-2 flex-wrap">
                {productData.units.map((unit, idx) => (
                  <Button key={idx} className="hover:border-blue-600 hover:text-blue-600">{unit}</Button>
                ))}
              </div>


              <p className="text-base text-gray-500">
                <span className="font-semibold">Danh mục:</span>
              </p>
              <p className="text-base text-gray-500">{productData.category}</p>

              <p className="text-base text-gray-500">
                <span className="font-semibold">Số đăng ký:</span>
              </p>
              <p className="text-base text-gray-500">{productData.registrationNumber}</p>

              <p className="text-base text-gray-500">
                <span className="font-semibold">Xem giấy công bố sản phẩm:</span>
              </p>
              <a href="#" className="text-base text-blue-600 no-underline flex items-center gap-1">
                <span>Click để xem</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 text-blue-600"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm-1-17h2v8h-2zm0 10h2v2h-2z" />
                </svg>
              </a>

              <p className="text-base text-gray-500">
                <span className="font-semibold">Dạng bào chế:</span>
              </p>
              <p className="text-base text-gray-500">{productData.dosageForm}</p>

              <p className="text-base text-gray-500">
                <span className="font-semibold">Quy cách:</span>
              </p>
              <p className="text-base text-gray-500">{productData.packaging}</p>

              <p className="text-base text-gray-500">
                <span className="font-semibold">Xuất xứ thương hiệu:</span>
              </p>
              <p className="text-base text-gray-500">{productData.origin.brandCountry}</p>

              <p className="text-base text-gray-500">
                <span className="font-semibold">Nhà sản xuất:</span>
              </p>
              <p className="text-base text-gray-500">{productData.origin.manufacturer}</p>

              <p className="text-base text-gray-500">
                <span className="font-semibold">Nước sản xuất:</span>
              </p>
              <p className="text-base text-gray-500">{productData.origin.productionCountry}</p>

              <p className="text-base text-gray-500">
                <span className="font-semibold">Thành phần:</span>
              </p>
              <p className="text-base text-gray-500">{productData.ingredients.join(", ")}</p>

              <p className="text-base text-gray-500">
                <span className="font-semibold">Mô tả ngắn:</span>
              </p>
              <p className="text-base text-gray-500">
                {productData.shortDescription}
              </p>
            </div>

            {/* Promotion */}
            <div
              className="border border-orange-400 mt-4 shadow-sm"
              style={{ borderRadius: '10px', overflow: 'hidden' }}
            >
              {/* Phần trên: Nền cam nhạt */}
              <div className="bg-orange-50 p-2">
                <p className="text-sm font-semibold text-orange-600 flex items-center gap-2">
                  <svg className="text-warning-7 mr-1" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.5299 10.87L20.0099 9.35001C19.7499 9.09 19.5399 8.58001 19.5399 8.22001V6.06C19.5399 5.18 18.8199 4.46 17.9399 4.46H15.7899C15.4299 4.46 14.9199 4.25 14.6599 3.99L13.1399 2.47C12.5199 1.85 11.4999 1.85 10.8799 2.47L9.33988 3.99C9.08988 4.25 8.57988 4.46 8.20988 4.46H6.05988C5.17988 4.46 4.45988 5.18 4.45988 6.06V8.21C4.45988 8.57 4.24988 9.08 3.98988 9.34L2.46988 10.86C1.84988 11.48 1.84988 12.5 2.46988 13.12L3.98988 14.64C4.24988 14.9 4.45988 15.41 4.45988 15.77V17.92C4.45988 18.8 5.17988 19.52 6.05988 19.52H8.20988C8.56988 19.52 9.07988 19.73 9.33988 19.99L10.8599 21.51C11.4799 22.13 12.4999 22.13 13.1199 21.51L14.6399 19.99C14.8999 19.73 15.4099 19.52 15.7699 19.52H17.9199C18.7999 19.52 19.5199 18.8 19.5199 17.92V15.77C19.5199 15.41 19.7299 14.9 19.9899 14.64L21.5099 13.12C22.1599 12.51 22.1599 11.49 21.5299 10.87ZM7.99988 9C7.99988 8.45 8.44988 8 8.99988 8C9.54988 8 9.99988 8.45 9.99988 9C9.99988 9.55 9.55988 10 8.99988 10C8.44988 10 7.99988 9.55 7.99988 9ZM9.52988 15.53C9.37988 15.68 9.18988 15.75 8.99988 15.75C8.80988 15.75 8.61988 15.68 8.46988 15.53C8.17988 15.24 8.17988 14.76 8.46988 14.47L14.4699 8.47001C14.7599 8.18001 15.2399 8.18001 15.5299 8.47001C15.8199 8.76 15.8199 9.24 15.5299 9.53L9.52988 15.53ZM14.9999 16C14.4399 16 13.9899 15.55 13.9899 15C13.9899 14.45 14.4399 14 14.9899 14C15.5399 14 15.9899 14.45 15.9899 15C15.9899 15.55 15.5499 16 14.9999 16Z" fill="currentColor"></path></svg>
                  Khuyến mãi được áp dụng
                </p>
              </div>

              {/* Phần dưới: Nền trắng */}
              <div className="bg-white p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 flex items-center justify-center rounded-md">
                  <img
                    src="https://s3-sgn09.fptcloud.com/lc-public/web-lc/default/promotion_used.webp"
                    alt="Promotion Icon"
                    className="w-6 h-6"
                  />
                </div>
                <p className="text-sm text-gray-700">
                  {productData.promotion.description}{' '}
                  <span className="font-semibold">
                    {productData.promotion.validUntil}
                  </span>
                </p>
              </div>
            </div>


            {/* Quantity and Actions */}
            <div className="mt-6">
              {/* Chọn số lượng */}
              <div className="flex items-center gap-4 mb-6">
                <p className="text-base text-gray-500 font-semibold">Chọn số lượng</p>

                <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                  <button
                    className="w-8 h-8 text-lg text-gray-600 hover:bg-gray-100"
                    onClick={handleDecrease}
                  >
                    −
                  </button>
                  <div className="w-10 h-8 flex items-center justify-center border-l border-r border-gray-300">
                    {quantity}
                  </div>
                  <button
                    className="w-8 h-8 text-lg text-gray-600 hover:bg-gray-100"
                    onClick={handleIncrease}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Nút hành động */}
              <div className="flex gap-4 mb-3">
                <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold py-3 rounded-full hover:opacity-90">
                  Chọn mua
                </button>
                <button className="flex-1 bg-gray-100 text-blue-600 text-sm font-semibold py-3 rounded-full hover:bg-gray-200">
                  Tìm nhà thuốc
                </button>
              </div>

              {/* Thông báo */}
              <div className="text-sm mt-1">
                <span className="text-orange-600 font-semibold">
                  ⚡ Sản phẩm đang được chú ý
                </span>
                <span className="text-black">
                  , có 20 người thêm vào giỏ hàng & 42 người đang xem
                </span>
              </div>
            </div>


            {/* Footer */}
            <div className="mt-6 border-t pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-700">
                {/* Đổi trả trong 30 ngày */}
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full">
                    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.6698 13.9732H20.5481C20.3 13.9732 20.0995 13.7727 20.0995 13.5246V11.7043L15.0391 15.3192L20.0995 18.934V17.1138C20.0995 16.8657 20.3 16.6652 20.5481 16.6652H20.7725C24.1123 16.6652 26.8294 19.3822 26.8294 22.7221C26.8294 24.3906 26.1515 25.9035 25.0563 27C27.1834 25.8093 28.624 23.5337 28.624 20.9274C28.624 17.0927 25.5045 13.9732 21.6698 13.9732Z" fill="#7EB5FF"></path><path fillRule="evenodd" clipRule="evenodd" d="M13.3463 7.90195C13.0745 8.17369 12.9218 8.54226 12.9218 8.92656V10.3839C12.9218 10.8795 13.3236 11.2812 13.8192 11.2812C14.3147 11.2812 14.7165 10.8795 14.7165 10.3839V8.8864C14.7165 8.52563 14.8488 8.17738 15.0884 7.90766L17.6713 5H16.2482L13.3463 7.90195ZM24.1383 18.8142C23.2872 18.0802 22.1947 17.619 20.9977 17.5674V19.8058C20.9977 19.974 20.9039 20.1279 20.7545 20.2051C20.6042 20.2809 20.4248 20.2688 20.2884 20.171L14.0071 15.6844C13.8892 15.6 13.8192 15.4641 13.8192 15.3192C13.8192 15.1742 13.8892 15.0383 14.0071 14.9544L20.2884 10.4678C20.4248 10.3696 20.6042 10.3565 20.7545 10.4337C20.9039 10.5104 20.9977 10.6643 20.9977 10.8326V13.0759H21.6707C22.5335 13.0759 23.3612 13.2208 24.1383 13.4792V8.58927H16.6138C16.0615 8.58927 15.6138 9.03699 15.6138 9.58927V11.7299C15.6138 11.978 15.4132 12.1785 15.1651 12.1785H12.4732C12.2251 12.1785 12.0245 11.978 12.0245 11.7299V9.58927C12.0245 9.03699 11.5768 8.58927 11.0245 8.58927H3.5V22.741C3.5 23.8456 4.39543 24.741 5.5 24.741H22.1383C23.2429 24.741 24.1383 23.8456 24.1383 22.741V18.8142ZM10.6785 22.4977C10.6785 22.7455 10.4777 22.9464 10.2299 22.9464H5.7433C5.49551 22.9464 5.29464 22.7455 5.29464 22.4977C5.29464 22.2499 5.49551 22.049 5.7433 22.049H10.2299C10.4777 22.049 10.6785 22.2499 10.6785 22.4977ZM10.6785 20.7031C10.6785 20.9509 10.4777 21.1517 10.2299 21.1517H5.7433C5.49551 21.1517 5.29464 20.9509 5.29464 20.7031C5.29464 20.4553 5.49551 20.2544 5.7433 20.2544H10.2299C10.4777 20.2544 10.6785 20.4553 10.6785 20.7031ZM5.36225 6.46447C6.29994 5.52678 7.57171 5 8.89779 5H14.9798L12.2878 7.69196H4.13477L5.36225 6.46447ZM16.2482 7.69196H24.4013L27.0932 5H18.9402L16.2482 7.69196ZM27.7271 5.6344V14.6462L25.0352 13.3002V8.32635L27.7271 5.6344Z" fill="url(#paint0_linear_4723_154886)"></path><defs><linearGradient id="paint0_linear_4723_154886" x1="15.8371" y1="26.1511" x2="7.14707" y2="8.52384" gradientUnits="userSpaceOnUse"><stop stopColor="#1B5EEB"></stop><stop offset="1" stopColor="#4987FF"></stop></linearGradient></defs></svg>
                  </div>
                  <div>
                    <p className="font-semibold">Đổi trả trong 30 ngày</p>
                    <p className="text-gray-500">kể từ ngày mua hàng</p>
                  </div>
                </div>

                {/* Miễn phí 100% */}
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full">
                    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 14.7622H5.16079V25.1344H1.5V14.7622Z" fill="#7EB5FF"></path><path d="M29.3645 18.8073C29.143 18.3815 28.763 18.0598 28.3065 17.9114C27.85 17.7631 27.3535 17.8 26.924 18.0142L20.0478 21.5163C19.1753 22.8769 17.7537 23.7555 16.3199 23.0661L11.506 20.8025C11.3719 20.7262 11.2716 20.6019 11.2255 20.4547C11.1793 20.3075 11.1906 20.1483 11.2571 20.0091C11.3236 19.8699 11.4404 19.7611 11.5839 19.7045C11.7275 19.6479 11.8871 19.6478 12.0307 19.7042C17.2717 22.1448 16.9544 22.0715 17.3632 22.0837C18.8092 22.1509 19.7244 19.9056 18.1442 19.2039C9.52914 15.1587 10.7494 15.2869 6.38086 15.8299V23.9141C7.04486 23.8626 7.71132 23.9757 8.32108 24.2436C17.2046 28.2766 14.7031 28.362 28.5713 21.2723C28.7853 21.1626 28.9756 21.0118 29.1313 20.8285C29.287 20.6452 29.405 20.4331 29.4787 20.2041C29.5523 19.9752 29.5802 19.7341 29.5606 19.4944C29.541 19.2547 29.4744 19.0212 29.3645 18.8073Z" fill="url(#paint0_linear_4723_154899)"></path><path fillRule="evenodd" clipRule="evenodd" d="M19.6878 18.8835C19.4058 18.552 19.0561 18.2847 18.6622 18.0995C17.2036 17.4142 16.0447 16.8626 15.1079 16.4169C11.7499 14.8188 11.248 14.58 10.041 14.4082V5H15.5322V8.66079C15.5325 8.7648 15.5594 8.86699 15.6103 8.95768C15.6613 9.04837 15.7345 9.12453 15.8232 9.17894C15.9118 9.23334 16.0129 9.26419 16.1168 9.26854C16.2207 9.27289 16.324 9.25061 16.4169 9.20381L18.5829 8.12387C19.0587 8.35989 19.4394 8.55355 19.7474 8.71021C20.9363 9.31491 21.0415 9.36839 21.3468 9.1794C21.6535 8.98954 21.6533 8.96282 21.6407 6.94829C21.6375 6.43803 21.6335 5.80025 21.6335 5H27.1247V16.6596C27.0631 16.6708 27.0143 16.6786 26.9659 16.6887C26.593 16.7667 26.2496 16.9859 20.2973 20.0214C20.1776 19.603 19.9698 19.215 19.6878 18.8835ZM24.6842 14.7621H22.2436C22.0818 14.7621 21.9266 14.8264 21.8122 14.9408C21.6978 15.0552 21.6335 15.2104 21.6335 15.3722C21.6335 15.5341 21.6978 15.6892 21.8122 15.8037C21.9266 15.9181 22.0818 15.9824 22.2436 15.9824H24.6842C24.846 15.9824 25.0012 15.9181 25.1156 15.8037C25.23 15.6892 25.2943 15.5341 25.2943 15.3722C25.2943 15.2104 25.23 15.0552 25.1156 14.9408C25.0012 14.8264 24.846 14.7621 24.6842 14.7621ZM19.3993 7.16896C18.722 6.83039 18.722 6.83039 18.5823 6.83039C18.446 6.83039 18.446 6.83039 17.8142 7.14588C17.5696 7.26801 17.2304 7.4374 16.752 7.67238V5H20.4127V7.67238C19.9653 7.45186 19.6397 7.28909 19.3993 7.16896Z" fill="url(#paint1_linear_4723_154899)"></path><defs><linearGradient id="paint0_linear_4723_154899" x1="18.1877" y1="27.8176" x2="14.7038" y2="16.1535" gradientUnits="userSpaceOnUse"><stop stopColor="#1B5EEB"></stop><stop offset="1" stopColor="#4987FF"></stop></linearGradient><linearGradient id="paint1_linear_4723_154899" x1="18.7405" y1="21.0944" x2="11.8273" y2="8.09924" gradientUnits="userSpaceOnUse"><stop stopColor="#1B5EEB"></stop><stop offset="1" stopColor="#4987FF"></stop></linearGradient></defs></svg>
                  </div>
                  <div>
                    <p className="font-semibold">Miễn phí 100%</p>
                    <p className="text-gray-500">đổi thuốc</p>
                  </div>
                </div>

                {/* Miễn phí vận chuyển */}
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full">
                    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_4723_154911)"><path fillRule="evenodd" clipRule="evenodd" d="M21.6544 22.1987C22.0338 20.3237 23.805 18.8337 25.7087 18.8337C27.5419 18.8337 28.8631 20.2156 28.8269 21.9925C30.8094 22.0444 31.3612 19.4338 31.3612 19.4338C31.5281 18.7038 31.7775 17.2806 31.9863 15.8837C32.0547 15.4525 32.0021 15.0107 31.8344 14.6075C31.3161 13.3978 30.6899 12.2372 29.9631 11.14C29.2756 10.1144 28.1225 9.50688 26.8062 9.485C26.0212 9.4725 25.2506 9.465 24.6687 9.465L24.6637 9.46C24.5887 8.205 23.6737 7.24375 22.3894 7.12875C21.5537 7.05437 18.2437 7 16.655 7C16.0237 7 15.1181 7.00875 14.2019 7.02375V7.02H14.1944H3.17813C3.03792 7.01992 2.89907 7.04747 2.76951 7.10109C2.63996 7.15471 2.52225 7.23334 2.42311 7.33248C2.32396 7.43162 2.24533 7.54934 2.19172 7.67889C2.1381 7.80844 2.11054 7.94729 2.11063 8.0875V8.0925C2.11063 8.37429 2.22257 8.64454 2.42182 8.8438C2.62108 9.04306 2.89133 9.155 3.17313 9.155H5.39375C5.66114 9.17471 5.91119 9.29479 6.09376 9.49115C6.27633 9.68751 6.3779 9.94563 6.37812 10.2137V10.2194C6.37854 10.3597 6.35127 10.4988 6.29788 10.6286C6.2445 10.7584 6.16605 10.8763 6.06701 10.9758C5.96797 11.0752 5.8503 11.1542 5.72073 11.2081C5.59115 11.262 5.45222 11.2898 5.31187 11.29H4.17312C3.89017 11.29 3.61881 11.4024 3.41873 11.6025C3.21865 11.8026 3.10625 12.0739 3.10625 12.3569C3.10617 12.497 3.1337 12.6358 3.18728 12.7653C3.24086 12.8949 3.31943 13.0125 3.41851 13.1117C3.51759 13.2108 3.63523 13.2894 3.76471 13.3431C3.89419 13.3968 4.03297 13.4244 4.17312 13.4244H5.31187C5.59499 13.4244 5.86652 13.5368 6.06671 13.737C6.26691 13.9372 6.37937 14.2088 6.37937 14.4919C6.37937 14.775 6.26691 15.0465 6.06671 15.2467C5.86652 15.4469 5.59499 15.5594 5.31187 15.5594H1.05187C0.768865 15.5594 0.497437 15.6718 0.297259 15.8718C0.0970823 16.0719 -0.0154593 16.3432 -0.015625 16.6262C-0.015625 16.9094 0.0968434 17.1809 0.297038 17.3811C0.497234 17.5813 0.768756 17.6937 1.05187 17.6937H5.31187C5.59499 17.6937 5.86652 17.8062 6.06671 18.0064C6.26691 18.2066 6.37937 18.4781 6.37937 18.7612C6.37904 19.0442 6.26643 19.3154 6.06627 19.5153C5.86611 19.7152 5.59478 19.8275 5.31187 19.8275H3.99437C3.71142 19.8275 3.44006 19.9399 3.23998 20.14C3.0399 20.3401 2.9275 20.6114 2.9275 20.8944C2.9275 21.1774 3.03988 21.4488 3.23994 21.649C3.44 21.8492 3.71136 21.9617 3.99437 21.9619L8.19812 21.9587L8.5475 21.0881C9.26313 19.7681 10.6869 18.8331 12.1944 18.8331C14.0988 18.8331 15.4513 20.3244 15.3025 22.2006H21.6537L21.6544 22.1987ZM24.5706 10.945C25.1287 10.945 25.8512 10.9525 26.5763 10.9644C27.455 10.9787 28.2237 11.3825 28.685 12.0712C29.1777 12.814 29.6205 13.5886 30.0106 14.39C30.2169 14.81 29.8375 15.3569 29.3406 15.3569H24.0125L24.5706 10.945ZM1.40508 11.3086C1.99447 11.3086 2.47227 11.7864 2.47227 12.3758C2.47227 12.9652 1.99447 13.443 1.40508 13.443C0.815687 13.443 0.337891 12.9652 0.337891 12.3758C0.337891 11.7864 0.815687 11.3086 1.40508 11.3086Z" fill="url(#paint0_linear_4723_154911)"></path><path d="M13.189 24.0291C14.2103 23.0771 14.3676 21.5858 13.5402 20.6983C12.7129 19.8108 11.2143 19.8632 10.193 20.8152C9.17169 21.7673 9.01442 23.2585 9.84173 24.146C10.669 25.0335 12.1677 24.9812 13.189 24.0291Z" fill="#7EB5FF"></path><path d="M26.7026 24.0291C27.724 23.0771 27.8812 21.5858 27.0539 20.6983C26.2266 19.8108 24.728 19.8631 23.7067 20.8152C22.6854 21.7673 22.5281 23.2585 23.3554 24.146C24.1827 25.0335 25.6813 24.9812 26.7026 24.0291Z" fill="#7EB5FF"></path></g><defs><linearGradient id="paint0_linear_4723_154911" x1="16.2954" y1="23.2864" x2="11.8202" y2="7.69953" gradientUnits="userSpaceOnUse"><stop stopColor="#1B5EEB"></stop><stop offset="1" stopColor="#4987FF"></stop></linearGradient><clipPath id="clip0_4723_154911"><rect width="32" height="32" fill="white"></rect></clipPath></defs></svg>
                  </div>
                  <div>
                    <p className="font-semibold">Miễn phí vận chuyển</p>
                    <p className="text-gray-500">theo chính sách giao hàng</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Modal hiển thị ảnh lớn */}
      <Modal
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
        centered
        width={900}
        className="product-image-modal"
      >
        <div className="text-center relative">
          {/* Chỉ số ảnh hiện tại */}
          <div className="absolute top-4 right-4 bg-black bg-opacity-30 text-white px-3 py-1 rounded-md text-sm">
            {currentImageIndex + 1}/{productData.images.length}
          </div>

          <h2 className="text-lg font-bold mb-4">
            {productData.name}
          </h2>

          <div className="relative">
            <Image
              src={productData.images[currentImageIndex]}
              alt={`Ảnh sản phẩm ${currentImageIndex + 1}`}
              width={500}
              height={300}
              className="rounded-lg object-cover mx-auto"
            />

            {/* Nút điều hướng trái */}
            <button
              onClick={handlePrevImage}
              disabled={currentImageIndex === 0}
              className="absolute top-1/2 left-0 opacity-80 transform -translate-y-1/2 bg-gray-500 hover:bg-gray-600 rounded-full p-3 shadow-md disabled:opacity-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Nút điều hướng phải */}
            <button
              onClick={handleNextImage}
              disabled={currentImageIndex === productData.images.length - 1}
              className="absolute top-1/2 right-0 opacity-80 transform -translate-y-1/2 bg-gray-500 hover:bg-gray-600 rounded-full p-3 shadow-md disabled:opacity-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

          </div>

          {/* Thumbnail trong modal */}
          <div className="flex gap-2 justify-start mt-4 overflow-x-auto flex-nowrap">
            {productData.images.map((img, idx) => (
              <div
                key={idx}
                ref={(el) => { thumbnailRefs.current[idx] = el; }}
                onClick={() => setCurrentImageIndex(idx)}
                className={`cursor-pointer border p-1 rounded-md flex-shrink-0 ${currentImageIndex === idx ? 'border-blue-500' : 'border-gray-300'}`}
                style={{ borderRadius: '10px' }}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
              </div>
            ))}
          </div>

        </div>
      </Modal>

      <div className="bg-white p-6 rounded-xl shadow-md mt-6 flex flex-col lg:flex-row gap-8">
        {/* Menu trái */}
        <div className="lg:w-1/4 w-full sticky top-6 self-start hidden lg:block">
          <div className="border rounded-md divide-y">
            {tabData.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => handleTabClick(key)}
                className={`w-full text-left px-4 py-3 hover:bg-gray-100 transition ${activeTab === key
                  ? 'bg-blue-100 font-bold text-[20px]'
                  : 'text-gray-700'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Nội dung phải */}
        <div className="lg:w-3/4 w-full space-y-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h2 className="text-xl font-bold">Nội dung</h2>
            <div className="flex items-center gap-3">
              <span className="text-gray-700">Kích thước chữ:</span>

              {/* Công tắc trượt */}
              <div
                className="relative w-32 h-10 rounded-full border-2 flex items-center transition-all duration-300 ease-in-out bg-white shadow-inner overflow-hidden border-gray-300"
              >
                <div
                  className={`absolute top-0 bottom-0 w-1/2 bg-blue-600 rounded-full transition-all duration-300 ${isFontLarge ? 'left-1/2' : 'left-0'
                    }`}
                ></div>
                <button
                  onClick={() => setIsFontLarge(false)}
                  className={`w-1/2 z-10 text-sm font-medium transition-colors duration-300 ${!isFontLarge ? 'text-white' : 'text-gray-700'
                    }`}
                >
                  Mặc định
                </button>
                <button
                  onClick={() => setIsFontLarge(true)}
                  className={`w-1/2 z-10 text-sm font-medium transition-colors duration-300 ${isFontLarge ? 'text-white' : 'text-gray-700'
                    }`}
                >
                  Lớn hơn
                </button>
              </div>
            </div>
          </div>

          {/* Nội dung từng tab */}
          {visibleTabs.map(({ key, title, content }) => (
            <div key={key} ref={(el) => { sectionRefs.current[key] = el; }}>
              <h2 className="text-xl font-bold mb-2">{title}</h2>
              {content.map((text, idx) => (
                <p
                  key={idx}
                  className={`mb-2 text-gray-700 ${isFontLarge ? 'text-lg' : 'text-base'
                    }`}
                >
                  {text}
                </p>
              ))}
            </div>
          ))}

          {/* Nút xem thêm / thu gọn */}
          {tabData.length > 3 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-block px-5 py-2 bg-blue-50 text-blue-600 rounded-lg shadow-sm hover:bg-blue-100 transition-all duration-300"
              >
                {isExpanded ? 'Thu gọn ▲' : 'Xem thêm ▼'}
              </button>
            </div>
          )}
        </div>
      </div>



      <div className="bg-white p-6 rounded-xl shadow-md mt-6 space-y-6">
        {/* --- Giao diện Tổng quan đánh giá --- */}
        <div>
          <h2 className="text-lg font-semibold">
            Đánh giá sản phẩm{" "}
            <span className="text-gray-500">({overallRatingStats.total} đánh giá)</span>
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between p-4 border-t border-b rounded-md gap-10">
            {/* Cột trái: Trung bình */}
            <div className="flex flex-col items-center sm:items-start gap-2 sm:gap-0 w-full sm:w-auto">
              <div className="text-center sm:text-left">
                <p className="text-base font-bold text-gray-600">Trung bình</p>
                <div className="text-[36px] font-bold leading-none mt-1 flex items-center justify-center sm:justify-start gap-1">
                  {overallRatingStats.average.toFixed(1)}{" "}
                  <span className="text-yellow-400 text-xl">★</span>
                </div>
              </div>

              {/* Nút */}
              <div className="w-full sm:w-auto mt-4 sm:mt-3 flex justify-center sm:justify-start">
                <button className="px-4 py-2 text-base bg-blue-600 text-white rounded-full hover:bg-blue-700 transition whitespace-nowrap">
                  Gửi đánh giá
                </button>
              </div>
            </div>

            {/* Cột phải: Biểu đồ đánh giá */}
            <div className="flex flex-col justify-center w-full space-y-1">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = overallRatingStats.counts[star as keyof typeof overallRatingStats.counts] || 0;
                const total = Object.values(overallRatingStats.counts).reduce((a, b) => a + b, 0);
                const percent = total > 0 ? (count / total) * 100 : 0;

                return (
                  <div key={star} className="flex items-center gap-2 text-sm">
                    {/* Hàng sao */}
                    <div className="flex w-[72px]">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={i} className={i < star ? "text-yellow-400" : "text-gray-400"}>★</span>
                      ))}
                    </div>

                    {/* Thanh biểu đồ */}
                    <div className="w-[140px] bg-gray-200 h-2 rounded relative">
                      <div
                        className="absolute top-0 left-0 h-2 bg-yellow-400 rounded"
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    {/* Số lượng */}
                    <div className="w-6 text-right text-sm font-medium">{count}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lọc theo sao */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:space-x-2 gap-2 text-sm">
            <span className="text-gray-700">Lọc theo:</span>
            <div className="flex flex-wrap gap-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <button
                  key={star}
                  onClick={() => handleFilter(star)}
                  className={`border px-3 py-1 rounded-full text-gray-700 hover:bg-gray-200 ${selectedRating === star ? 'bg-blue-100' : ''
                    }`}
                >
                  {star} sao
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* --- Danh sách đánh giá từ mockReviews --- */}
        {filteredReviews.slice(0, visibleReviews).map((review) => (
          <div key={review.id} className="mb-4">
            <div className="flex flex-col sm:flex-row items-start sm:space-x-3">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center font-bold text-white mb-3 sm:mb-0">
                {review.initials}
              </div>
              <div className="w-full">
                <p className="font-semibold">{review.userName}</p>
                <div className="flex items-center text-yellow-400">
                  {"★".repeat(review.rating)}
                </div>
                {review.content && <p className="text-gray-800 mt-1">{review.content}</p>}
                <p className="text-sm text-gray-600 mt-1">
                  {review.createdAt} ·{" "}
                  <button className="text-blue-600 hover:underline">Trả lời</button>
                </p>
              </div>
            </div>

            {/* Reply nếu có */}
            {review.reply && (
              <div className="ml-0 sm:ml-12 mt-2 border-l-2 pl-4 border-gray-200">
                <div className="flex flex-col sm:flex-row items-start sm:space-x-3">
                  <div className="w-12 aspect-square bg-blue-500 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 mb-3 sm:mb-0">
                    {review.reply.initials}
                  </div>

                  <div className="w-full">
                    <p className="font-semibold flex items-center gap-1">
                      {review.reply.repliedBy}{" "}
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                        {review.reply.role}
                      </span>
                    </p>
                    <p className="text-sm text-gray-700">{review.reply.replyContent}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {review.reply.repliedAt} ·{" "}
                      <button className="text-blue-600 hover:underline">Trả lời</button>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}


        {/* Nút Xem thêm bình luận */}
        {filteredReviews.length > visibleReviews && (
          <div className="text-center mt-4">
            <button
              onClick={handleLoadMore}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Xem thêm 5 bình luận
            </button>
          </div>
        )}
      </div>



    </section>
  );
};

export default ProductDetail;
