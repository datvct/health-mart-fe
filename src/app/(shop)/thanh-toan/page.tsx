'use client';

import { ChevronRight, Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AddressModal from '../../../components/order/AddressModal';
import DiscountModal from '../../../components/order/DiscountModal';
import EditAddressModal from '../../../components/order/EditAddressModal';
import NewAddressModal from '../../../components/order/NewAddressModal';
import { useVietnamLocations } from '../../../hook/useVietnamLocations';
import { CreateOrderPromotionRequest, orderApi, OrderData, Voucher } from '../../../lib/apis/order';
import { productApi } from '../../../lib/apis/product';
import { userApi } from '../../../lib/apis/user';
import { RootState } from '../../../lib/store';
import { useCart } from '../../../hook/useCart';
import { paymentApi } from '../../../lib/apis/payment';

// Interface cho CartItem
interface CartItem {
  product_id: number;
  variant_unit: string;
  image: string;
  name: string;
  price: number;
  sale_price: number;
  quantity: number;
}

interface PharmacyStockItem {
  pharmacy_id: number;
  name: string;
  district: string;
  ward: string;
  address_street: string;
  city: string;

  product_id?: number;
  quantity?: number;
}

export default function CheckoutPage() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const { clearCart } = useCart(user?.id?.toString() || undefined);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');

  // SVG error icon
  const ErrorIcon = () => (
    <svg
      className="w-5 h-5 mr-1 shrink-0 grow-0"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C17.523 2 22 6.478 22 12C22 17.522 17.523 22 12 22C6.477 22 2 17.522 2 12C2 6.478 6.477 2 12 2ZM12.0018 15.0037C11.4503 15.0037 11.0031 15.4508 11.0031 16.0024C11.0031 16.5539 11.4503 17.001 12.0018 17.001C12.5533 17.001 13.0005 16.5539 13.0005 16.0024C13.0005 15.4508 12.5533 15.0037 12.0018 15.0037ZM11.9996 7C11.4868 7.00018 11.0643 7.38638 11.0067 7.88374L11 8.00036L11.0018 13.0012L11.0086 13.1179C11.0665 13.6152 11.4893 14.0011 12.0022 14.0009C12.515 14.0007 12.9375 13.6145 12.9951 13.1171L13.0018 13.0005L13 7.99964L12.9932 7.88302C12.9353 7.3857 12.5125 6.99982 11.9996 7Z"
        fill="currentColor"
      />
    </svg>
  );

  // --- Lấy danh sách sản phẩm từ sessionStorage ---
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  useEffect(() => {
    const stored = sessionStorage.getItem('checkoutItems');
    if (stored) {
      try {
        const items = JSON.parse(stored) as CartItem[];
        setCartItems(items);
      } catch (error) {
        console.error('Error parsing checkoutItems from sessionStorage', error);
      }
    }
  }, []);

  const totalOriginal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalFinal = cartItems.reduce((sum, item) => {
    const actualPrice = item.sale_price < item.price ? item.sale_price : item.price;
    return sum + actualPrice * item.quantity;
  }, 0);
  const directDiscount = totalOriginal - totalFinal;

  // --- Xử lý tăng giảm số lượng và xóa sản phẩm ---
  const handleQuantityChange = (product_id: number, variant_unit: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updated = cartItems.map((item) =>
      item.product_id === product_id && item.variant_unit === variant_unit
        ? { ...item, quantity: newQuantity }
        : item,
    );
    setCartItems(updated);
    sessionStorage.setItem('checkoutItems', JSON.stringify(updated));
  };

  const handleRemove = (product_id: number, variant_unit: string) => {
    const updated = cartItems.filter(
      (item) => !(item.product_id === product_id && item.variant_unit === variant_unit),
    );
    setCartItems(updated);
    sessionStorage.setItem('checkoutItems', JSON.stringify(updated));
  };

  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const voucherDiscount = useMemo(() => {
    if (!selectedVoucher) return 0;
    if (selectedVoucher.discountType === 'PERCENTAGE') {
      return totalFinal * (selectedVoucher.discountValue / 100);
    } else {
      // Ép về số để tránh lỗi cộng chuỗi
      return Number(selectedVoucher.discountValue);
    }
  }, [selectedVoucher, totalFinal]);
  const totalSavings = directDiscount + voucherDiscount;

  // --- Các state UI chung ---
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [editAddress, setEditAddress] = useState(false);

  // --- Cho hình thức pickup: Lấy danh sách nhà thuốc và tồn kho sản phẩm ---
  const [pharmacyStocks, setPharmacyStocks] = useState<PharmacyStockItem[]>([]);
  const [pharmacyProducts, setPharmacyProducts] = useState<PharmacyStockItem[]>([]);

  // Lấy danh sách thông tin nhà thuốc (không bao gồm thông tin tồn kho chi tiết)
  useEffect(() => {
    if (deliveryMethod === 'pickup') {
      productApi
        .getListPharmacyStocks()
        .then((response) => {
          console.log('Pharmacy stocks:', response);
          setPharmacyStocks(response.data);
        })
        .catch((err) => console.error('Error fetching pharmacy stocks:', err));
    }
  }, [deliveryMethod]);

  // Lấy tồn kho chi tiết của tất cả các nhà thuốc
  useEffect(() => {
    if (deliveryMethod === 'pickup') {
      productApi
        .getPharmacyProducts()
        .then((response) => {
          console.log('Pharmacy products:', response);
          setPharmacyProducts(response.data.data || response.data);
        })
        .catch((err) => console.error('Error fetching pharmacy products:', err));
    }
  }, [deliveryMethod]);

  const groupedPharmacies = useMemo(() => {
    const map = new Map<number, { info: PharmacyStockItem; stocks: PharmacyStockItem[] }>();
    pharmacyStocks.forEach((info) => {
      map.set(info.pharmacy_id, { info, stocks: [] });
    });
    pharmacyProducts.forEach((stock) => {
      if (map.has(stock.pharmacy_id)) {
        map.get(stock.pharmacy_id)?.stocks.push(stock);
      } else {
        map.set(stock.pharmacy_id, { info: stock, stocks: [stock] });
      }
    });
    return Array.from(map.values());
  }, [pharmacyStocks, pharmacyProducts]);

  // Các state dùng cho bộ lọc địa lý khi đặt hình thức pickup
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [districts, setDistricts] = useState<string[]>([]);

  // Hàm lấy tỉnh/thành phố từ thông tin nhà thuốc.
  const getProvince = (stock: PharmacyStockItem): string => {
    if (stock.city && stock.city.trim() !== '') {
      return stock.city;
    }
    if (stock.district && stock.district.includes('Thành phố')) {
      return stock.district;
    }
    return 'Hồ Chí Minh';
  };

  // Danh sách tỉnh/thành phố có nhà thuốc
  const provincesPickup = useMemo(() => {
    if (groupedPharmacies.length === 0) return [];
    return [...new Set(groupedPharmacies.map((group) => getProvince(group.info)))];
  }, [groupedPharmacies]);

  // Cập nhật danh sách quận/huyện dựa theo tỉnh đã chọn
  useEffect(() => {
    if (selectedProvince) {
      const filteredDistricts = groupedPharmacies
        .filter((group) => getProvince(group.info) === selectedProvince)
        .map((group) => group.info.district);
      setDistricts([...new Set(filteredDistricts)]);
      setSelectedDistrict('');
    } else {
      setDistricts([]);
      setSelectedDistrict('');
    }
  }, [selectedProvince, groupedPharmacies]);

  // Lọc danh sách nhà thuốc theo tỉnh và quận (nếu đã chọn)
  const filteredPharmacies = useMemo(() => {
    if (!selectedProvince) return [];
    let result = groupedPharmacies.filter((group) => getProvince(group.info) === selectedProvince);
    if (selectedDistrict) {
      result = result.filter((group) => group.info.district === selectedDistrict);
    }
    return result;
  }, [groupedPharmacies, selectedProvince, selectedDistrict]);

  // --- Cho phần giao hàng tận nơi ---
  const { provinces, loading: locationsLoading, error: locationsError } = useVietnamLocations();
  const [deliveryProvince, setDeliveryProvince] = useState('');
  const [deliveryDistrict, setDeliveryDistrict] = useState('');
  const [deliveryWard, setDeliveryWard] = useState('');
  const [deliverySpecificAddress, setDeliverySpecificAddress] = useState('');

  // Thông tin người đặt (orderer)
  const [deliveryReceiverName, setDeliveryReceiverName] = useState('');
  const [deliveryReceiverPhone, setDeliveryReceiverPhone] = useState('');
  const [deliveryUserEmail, setDeliveryUserEmail] = useState('');
  // Thông tin người nhận (recipient)
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  // Thêm state cho địa chỉ (ID) và ghi chú
  const [deliveryAddressId, setDeliveryAddressId] = useState<number | null>(null);
  const [deliveryNote, setDeliveryNote] = useState('');

  // Các trạng thái cho modal quản lý địa chỉ
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [newAddressModalOpen, setNewAddressModalOpen] = useState(false);

  const handleSelectAddress = (address: any) => {
    // Cập nhật lại state của giao hàng với thông tin của địa chỉ được chọn
    setDeliveryProvince(address.city || '');
    setDeliveryDistrict(address.district || '');
    setDeliveryWard(address.ward || '');
    setDeliverySpecificAddress(address.address_street || '');
  };

  const [editAddressModalOpen, setEditAddressModalOpen] = useState(false);
  const [selectedAddressForEdit, setSelectedAddressForEdit] = useState<any>(null);

  // Khi người dùng bấm "Sửa" từ AddressModal:

  // Báo lỗi
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [recipientNameError, setRecipientNameError] = useState('');
  const [recipientPhoneError, setRecipientPhoneError] = useState('');

  // --- Lấy thông tin user (bao gồm địa chỉ) qua getUserById ---
  useEffect(() => {
    if (user && user.id) {
      console.log('Gọi API getUserById cho user id:', user.id);
      userApi
        .getUserById(user.id)
        .then((response) => {
          console.log('Response từ getUserById:', response);
          if (response.data && response.data.addresses && response.data.addresses.length > 0) {
            const address = response.data.addresses[0];
            setDeliveryProvince(address.city || '');
            setDeliveryDistrict(address.district || '');
            setDeliveryWard(address.ward || '');
            setDeliverySpecificAddress(address.address_street || '');
            setDeliveryAddressId(address.id);
          } else {
            console.warn('Không tìm thấy địa chỉ trong response');
          }
          if (response.data.fullName) {
            setDeliveryReceiverName(response.data.fullName);
            setRecipientName((prev) => prev || response.data.fullName);
          }
          if (response.data.phone) {
            setDeliveryReceiverPhone(response.data.phone);
            setRecipientPhone((prev) => prev || response.data.phone);
          }
          if (response.data.email) {
            setDeliveryUserEmail(response.data.email);
          }
        })
        .catch((err) => console.error('Error fetching user by id:', err));
    }
  }, [user]);

  // --- Hàm cập nhật địa chỉ qua API khi bấm "Lưu địa chỉ" ---
  const handleUpdateAddress = async () => {
    if (!deliveryAddressId) {
      toast.error('Không có địa chỉ để cập nhật');
      return;
    }
    const payload = {
      city: deliveryProvince,
      district: deliveryDistrict,
      ward: deliveryWard,
      address_street: deliverySpecificAddress,
    };
    try {
      const updatedResp = await userApi.updateAddress(deliveryAddressId, payload);
      console.log('Địa chỉ đã được cập nhật:', updatedResp);
      toast.success('Địa chỉ đã được cập nhật');
      setEditAddress(false);
    } catch (error) {
      console.error('Error updating address:', error);
      alert('Có lỗi khi cập nhật địa chỉ');
    }
  };

  // Hàm validateForm: kiểm tra các trường bắt buộc
  const validateForm = () => {
    let valid = true;

    // Nếu giao hàng tận nơi, bắt buộc kiểm tra thông tin người nhận và địa chỉ
    if (deliveryMethod === 'delivery') {
      if (!deliveryReceiverName.trim()) {
        setNameError('Họ và tên không được để trống');
        valid = false;
      }
      // Regex cho số điện thoại Việt Nam: bắt đầu bằng 0 hoặc +84 và 9 chữ số sau đó
      const phoneRegex = /^(0|\+84)[0-9]{9}$/;
      if (!phoneRegex.test(deliveryReceiverPhone)) {
        setPhoneError('Số điện thoại không hợp lệ');
        valid = false;
      }
      if (!deliverySpecificAddress.trim()) {
        setAddressError('Thông tin bắt buộc. Vui lòng nhập đầy đủ.');
        valid = false;
      }
      if (!recipientName.trim()) {
        setRecipientNameError('Họ và tên không được để trống');
        valid = false;
      }
      if (!recipientPhone.trim()) {
        setRecipientPhoneError('Số điện thoại không hợp lệ');
        valid = false;
      }
    } else if (deliveryMethod === 'pickup') {
      // Kiểm tra thông tin người nhận khi pickup
      if (!recipientName.trim()) {
        setRecipientNameError('Họ và tên không được để trống');
        valid = false;
      }
      // Regex cho số điện thoại Việt Nam: bắt đầu bằng 0 hoặc +84 và 9 chữ số sau đó
      const phoneRegex = /^(0|\+84)[0-9]{9}$/;
      if (!phoneRegex.test(recipientPhone)) {
        setRecipientPhoneError('Số điện thoại không hợp lệ');
        valid = false;
      }
    }

    return valid;
  };

  // --- Hàm tạo đơn hàng ---
  const handleCreateOrder = async () => {
    // Kiểm tra giỏ hàng: nếu không có sản phẩm nào, dừng lại.
    if (cartItems.length === 0) {
      toast.error('Giỏ hàng trống');
      return;
    }

    // Kiểm tra các trường dùng validateForm()
    if (!validateForm()) {
      toast.error('Vui lòng kiểm tra lại thông tin bắt buộc');
      return;
    }

    // Nếu hình thức pickup mà chưa chọn nhà thuốc, toast lỗi và dừng lại.
    if (deliveryMethod === 'pickup' && !selectedPharmacy) {
      toast.error('Bạn chưa chọn nhà thuốc');
      return;
    }

    // Xây dựng payload đơn hàng.
    const orderData: OrderData & { promotion?: CreateOrderPromotionRequest } = {
      user_id: user?.id || null,
      total_price: totalOriginal,
      discount: directDiscount + voucherDiscount, // tích hợp voucher discount vào trường discount
      final_price: totalFinal - voucherDiscount,
      ship_method: deliveryMethod === 'delivery' ? 'HOME_DELIVERY' : 'PICK_UP',
      order_status: paymentMethod === 'cod' ? 'PENDING_NOTPAYMENT' : 'PENDING',
      // Thiết lập shippingAddress tùy theo hình thức giao hàng.
      shippingAddress:
        deliveryMethod === 'delivery'
          ? {
              recipientName: recipientName,
              phoneNumber: recipientPhone,
              city: deliveryProvince,
              district: deliveryDistrict,
              ward: deliveryWard,
              address: deliverySpecificAddress,
              pharmacy_id: null,
              customerName: deliveryReceiverName,
              customerPhone: deliveryReceiverPhone,
              customerEmail: deliveryUserEmail,
              note: deliveryNote,
            }
          : deliveryMethod === 'pickup'
          ? {
              // Với pickup, chỉ cần truyền phát thông tin qua pharmacy_id.
              recipientName: recipientName,
              phoneNumber: recipientPhone,
              city: '',
              district: '',
              ward: '',
              address: '',
              pharmacy_id: selectedPharmacy!,
              customerName: recipientName,
              customerPhone: recipientPhone,
              customerEmail: deliveryUserEmail,
              note: deliveryNote,
            }
          : undefined,
      items: cartItems.map((item) => ({
        order_id: 0,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.sale_price < item.price ? item.sale_price : item.price,
      })),
      // Nếu voucher được chọn, thêm thông tin promotion
      promotion: selectedVoucher
        ? {
            order_id: 0, // Placeholder
            discountCodeId: selectedVoucher.id,
          }
        : undefined,
    };

    // sessionStorage.setItem('order_data', JSON.stringify(orderData));
    try {
      const orderResponse = await orderApi.createOrderAndShippingAddress(orderData);
      console.log('Order created:', orderResponse);
      sessionStorage.setItem('order_data', JSON.stringify(orderResponse));

      // Nếu đặt hàng theo hình thức pickup, cập nhật tồn kho cho các sản phẩm.
      if (deliveryMethod === 'pickup' && selectedPharmacy) {
        await Promise.all(
          cartItems.map(async (item) => {
            // Tìm bản ghi tồn kho của sản phẩm tại nhà thuốc đã chọn.
            const stockRecord = pharmacyProducts.find(
              (p) => p.pharmacy_id === selectedPharmacy && p.product_id === item.product_id,
            );
            if (!stockRecord || stockRecord.quantity === undefined) {
              console.warn(`Không tìm thấy tồn kho cho sản phẩm ${item.product_id}`);
              return;
            }
            // Tính số lượng mới sau khi trừ số lượng đặt.
            const newQuantity = stockRecord.quantity - item.quantity;
            try {
              await productApi.updatePharmacyProduct(selectedPharmacy, item.product_id, {
                quantity: newQuantity,
              });
            } catch (err) {
              console.warn(`Cập nhật tồn kho thất bại cho sản phẩm ${item.product_id}`, err);
            }
          }),
        );
      }

      toast.success('Đặt hàng thành công!');
      localStorage.removeItem('cart');
      await clearCart();
      setCartItems([]);
      if (paymentMethod === 'qr') {
        const vnpayResponse = await paymentApi.createPayment(
          totalFinal - voucherDiscount,
          orderResponse.id,
        );

        if (vnpayResponse?.data.paymentUrl) {
          window.location.href = vnpayResponse.data.paymentUrl;
        } else {
          toast.error('Không tạo được liên kết thanh toán VNPAY');
        }
      } else {
        // 👉 Nếu là COD hoặc các phương thức khác
        router.push(`/payment-status?orderId=${orderResponse.id}&status=success&cod=true`);
      }
    } catch {
      toast.error('Lỗi tạo đơn hàng!');
    }
  };

  const renderProvinceSelect = () => {
    if (locationsLoading) return <p>Loading...</p>;
    if (locationsError) return <p>Error: {locationsError}</p>;
    return (
      <select
        className="w-full border rounded p-2 text-sm"
        value={deliveryProvince}
        onChange={(e) => {
          const newProvince = e.target.value;
          setDeliveryProvince(newProvince);
          setDeliveryDistrict('');
          setDeliveryWard('');
        }}
      >
        <option value="">Chọn tỉnh/thành phố</option>
        {provinces.map((p) => (
          <option key={p.code} value={p.name}>
            {p.name}
          </option>
        ))}
      </select>
    );
  };

  const renderDistrictSelect = () => {
    return (
      <select
        className="w-full border rounded p-2 text-sm"
        value={deliveryDistrict}
        onChange={(e) => {
          const newDistrict = e.target.value;
          setDeliveryDistrict(newDistrict);
          setDeliveryWard('');
        }}
        disabled={!deliveryProvince}
      >
        <option value="">Chọn quận/huyện</option>
        {provinces
          .find((p) => p.name === deliveryProvince)
          ?.districts.map((d) => (
            <option key={d.code} value={d.name}>
              {d.name}
            </option>
          )) || []}
      </select>
    );
  };

  // Phần chọn Phường/Xã:
  const renderWardSelect = () => {
    return (
      <select
        className="w-full border rounded p-2 text-sm"
        value={deliveryWard}
        onChange={(e) => setDeliveryWard(e.target.value)}
        disabled={!deliveryDistrict}
      >
        <option value="">Chọn phường/xã</option>
        {provinces
          .find((p) => p.name === deliveryProvince)
          ?.districts.find((d) => d.name === deliveryDistrict)
          ?.wards.map((w) => (
            <option key={w.code} value={w.name}>
              {w.name}
            </option>
          )) || []}
      </select>
    );
  };

  const [selectedPharmacy, setSelectedPharmacy] = useState<number | null>(null);

  return (
    <div className="bg-gray-50 min-h-screen py-6 px-4 md:px-12 text-sm relative">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <div
          className="mb-6 text-blue-600 cursor-pointer inline-flex items-center gap-2"
          onClick={() => router.back()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Quay lại giỏ hàng</span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* LEFT COLUMN: Danh sách sản phẩm và thông tin đặt hàng */}
          <div className="md:col-span-2 space-y-6">
            <div className="font-bold text-xl">Danh sách sản phẩm</div>
            {cartItems.length === 0 ? (
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <p>Giỏ hàng trống</p>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="py-2 px-4 grid grid-cols-8 text-sm font-medium border-b">
                  <div className="col-span-4">Sản phẩm</div>
                  <div className="hidden sm:block text-center">Giá</div>
                  <div className="hidden sm:block text-center">Số lượng</div>
                  <div className="hidden sm:block text-center">Đơn vị</div>
                  <div className="hidden sm:block text-center"></div>
                </div>
                {cartItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 border-b flex flex-col md:grid md:grid-cols-8 md:items-center gap-3"
                  >
                    <div className="md:col-span-4 flex gap-3 items-center">
                      <div className="p-2 border rounded-lg">
                        <Image
                          src={item.image}
                          width={48}
                          height={48}
                          alt={item.name}
                          className="object-contain"
                        />
                      </div>
                      <p className="font-medium text-sm line-clamp-2">{item.name}</p>
                    </div>
                    {/* Mobile view */}
                    <div className="flex flex-col sm:hidden gap-2">
                      <div className="text-center text-sm">
                        {item.sale_price && item.sale_price < item.price ? (
                          <div className="flex flex-row gap-1 sm:gap-0 sm:flex-col items-center">
                            <span className="text-blue-600 font-semibold">
                              {(item.sale_price * item.quantity).toLocaleString('vi-VN')}đ
                            </span>
                            <span className="text-xs line-through text-gray-400">
                              {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                            </span>
                          </div>
                        ) : (
                          <span className="text-blue-600 font-semibold">
                            {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                          </span>
                        )}
                      </div>
                      <div className="flex flex-row justify-between">
                        <div className="flex justify-center">
                          <div className="flex items-center border rounded-full px-2">
                            <button
                              className="px-2 text-gray-700 hover:text-black"
                              onClick={() =>
                                handleQuantityChange(
                                  item.product_id,
                                  item.variant_unit,
                                  item.quantity - 1,
                                )
                              }
                              disabled={item.quantity === 1}
                            >
                              <Minus size={12} className="hover:text-blue-600" />
                            </button>
                            <input
                              type="text"
                              value={item.quantity}
                              readOnly
                              className="w-10 text-center bg-transparent border-x border-gray-200"
                            />
                            <button
                              className="px-2 text-gray-700 hover:text-black"
                              onClick={() =>
                                handleQuantityChange(
                                  item.product_id,
                                  item.variant_unit,
                                  item.quantity + 1,
                                )
                              }
                            >
                              <Plus size={12} className="hover:text-blue-600" />
                            </button>
                          </div>
                        </div>
                        <div className="text-center text-sm">{item.variant_unit}</div>
                        <div className="text-center flex items-center justify-center">
                          <button
                            className="text-gray-500"
                            onClick={() => handleRemove(item.product_id, item.variant_unit)}
                          >
                            <Trash2 size={20} className="hover:text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Desktop view */}
                    <div className="hidden sm:flex text-center text-sm">
                      {item.sale_price && item.sale_price < item.price ? (
                        <div className="flex flex-row gap-1 sm:gap-0 sm:flex-col items-center">
                          <span className="text-blue-600 font-semibold">
                            {(item.sale_price * item.quantity).toLocaleString('vi-VN')}đ
                          </span>
                          <span className="text-xs line-through text-gray-400">
                            {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                      ) : (
                        <span className="text-blue-600 font-semibold">
                          {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                        </span>
                      )}
                    </div>
                    <div className="hidden sm:flex justify-center">
                      <div className="flex items-center border rounded-full px-2">
                        <button
                          className="px-2 text-gray-700 hover:text-black"
                          onClick={() =>
                            handleQuantityChange(
                              item.product_id,
                              item.variant_unit,
                              item.quantity - 1,
                            )
                          }
                          disabled={item.quantity === 1}
                        >
                          <Minus size={12} className="hover:text-blue-600" />
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          readOnly
                          className="w-10 text-center bg-transparent border-x border-gray-200"
                        />
                        <button
                          className="px-2 text-gray-700 hover:text-black"
                          onClick={() =>
                            handleQuantityChange(
                              item.product_id,
                              item.variant_unit,
                              item.quantity + 1,
                            )
                          }
                        >
                          <Plus size={12} className="hover:text-blue-600" />
                        </button>
                      </div>
                    </div>
                    <div className="hidden sm:flex text-center text-sm">{item.variant_unit}</div>
                    <div className="hidden sm:flex text-center items-center justify-center">
                      <button
                        className="text-gray-500"
                        onClick={() => handleRemove(item.product_id, item.variant_unit)}
                      >
                        <Trash2 size={20} className="hover:text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Phần chọn hình thức nhận hàng */}
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-800">Chọn hình thức nhận hàng:</span>
              <div className="flex border border-blue-600 rounded-xl overflow-hidden">
                <button
                  onClick={() => {
                    setDeliveryMethod('delivery');
                    setEditAddress(false);
                  }}
                  className={`px-6 py-2 transition-colors duration-200 focus:outline-none rounded ${
                    deliveryMethod === 'delivery'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-blue-600'
                  }`}
                >
                  Giao hàng tận nơi
                </button>
                <button
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`px-6 py-2 transition-colors duration-200 focus:outline-none rounded ${
                    deliveryMethod === 'pickup'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-blue-600'
                  }`}
                >
                  Nhận tại nhà thuốc
                </button>
              </div>
            </div>

            {/* Phần thông tin đặt hàng dựa theo hình thức */}
            {deliveryMethod === 'delivery' ? (
              // Phần giao hàng tận nơi
              <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
                {/* Phần giao hàng tận nơi*/}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        d="M12 12C14.7614 12 17 9.76141 17 7C17 4.23856 14.7614 1.99998 12 1.99998C9.23858 1.99998 7 4.23856 7 7C7 9.76141 9.23858 12 12 12Z"
                        fill="#ACC0F3"
                      />
                      <path
                        d="M12 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12 14.5Z"
                        fill="url(#paint0_linear_3708_96166)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_3708_96166"
                          x1="21.0902"
                          y1="22.5"
                          x2="15.1916"
                          y2="9.09562"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#1250DC" />
                          <stop offset="1" stopColor="#306DE4" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <h2 className="font-medium">Thông tin người đặt</h2>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="block text-gray-600">Họ và tên người đặt</label>
                      {user ? (
                        <p className="border rounded p-2 mt-1">{user.fullName}</p>
                      ) : (
                        <input
                          type="text"
                          placeholder="Họ và tên người đặt"
                          className={`w-full border rounded p-2 mt-1 ${
                            nameError ? 'border-red-600' : ''
                          }`}
                          value={deliveryReceiverName}
                          onChange={(e) => {
                            const value = e.target.value;
                            setDeliveryReceiverName(value);
                            if (value.trim() === '') {
                              setNameError('Họ và tên không được để trống');
                            } else {
                              setNameError('');
                            }
                          }}
                        />
                      )}
                      {nameError && (
                        <p className="flex items-center text-red-600 text-xs mt-1">
                          <ErrorIcon />
                          {nameError}
                        </p>
                      )}
                    </div>
                    <div className="w-1/2">
                      <label className="block text-gray-600">Số điện thoại</label>
                      {user ? (
                        <p className="border rounded p-2 mt-1">{user.phone}</p>
                      ) : (
                        <input
                          type="text"
                          placeholder="Số điện thoại"
                          className={`w-full border rounded p-2 mt-1 ${
                            phoneError ? 'border-red-600' : ''
                          }`}
                          value={deliveryReceiverPhone}
                          onChange={(e) => {
                            const value = e.target.value;
                            setDeliveryReceiverPhone(value);
                            const phoneRegex = /^(0|\+84)[0-9]{9}$/;
                            if (!phoneRegex.test(value)) {
                              setPhoneError('Số điện thoại không hợp lệ');
                            } else {
                              setPhoneError('');
                            }
                          }}
                        />
                      )}
                      {phoneError && (
                        <p className="flex items-center text-red-600 text-xs mt-1">
                          <ErrorIcon />
                          {phoneError}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="block text-gray-600">Email (không bắt buộc)</label>
                    {user ? (
                      <p className="border rounded p-2 mt-1">{user.email || ''}</p>
                    ) : (
                      <input
                        type="email"
                        placeholder="Nhập email"
                        className={`w-full border rounded p-2 mt-1 ${
                          emailError ? 'border-red-600' : ''
                        }`}
                        value={deliveryUserEmail}
                        onChange={(e) => {
                          const value = e.target.value;
                          setDeliveryUserEmail(value);
                          // Nếu nhập không rỗng, kiểm tra cấu trúc theo @gmail.com
                          if (value && !/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value)) {
                            setEmailError('Email không hợp lệ');
                          } else {
                            setEmailError('');
                          }
                        }}
                      />
                    )}
                    {emailError && (
                      <p className="flex items-center text-red-600 text-xs mt-1">
                        <ErrorIcon />
                        {emailError}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6">
                        <svg
                          className="w-full h-full"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.52714 19.642C9.18736 19.5903 9.82806 19.8874 10.2011 20.4346C10.4905 20.8591 10.7647 21.2937 11.0235 21.7371C11.0931 21.8568 11.1932 21.9561 11.3172 22.0257C11.3732 22.0576 11.4326 22.0826 11.4954 22.1C11.5701 22.1208 11.6465 22.1314 11.7246 22.131C11.8672 22.131 12.0081 22.0941 12.1321 22.0245C12.2543 21.9549 12.3545 21.8551 12.4224 21.7359L12.4886 21.62C12.7276 21.2183 12.9792 20.8241 13.2432 20.4381C13.6173 19.891 14.259 19.5943 14.9197 19.6472C18.1232 19.9034 20.3847 20.5297 20.3847 21.2618C20.3847 22.2218 16.4935 23.0002 11.6924 23.0002C6.89119 23.0002 3 22.2218 3 21.2618C3 20.5252 5.29111 19.8951 8.52714 19.642Z"
                            fill="#ACC0F3"
                          ></path>
                          <path
                            d="M16.9616 3.04077C16.1919 2.33939 15.29 1.79873 14.3086 1.45047C13.3273 1.10222 12.2863 0.953388 11.2467 1.0127C10.207 1.07202 9.18972 1.33828 8.25435 1.79589C7.31898 2.2535 6.48438 2.89324 5.79948 3.67761C5.11458 4.46198 4.59316 5.37519 4.26579 6.3637C3.93843 7.35222 3.8117 8.39614 3.89305 9.43426C3.97439 10.4724 4.26217 11.4838 4.73951 12.4093C5.21686 13.3347 5.87415 14.1556 6.67287 14.8237C8.4989 16.3418 10.0246 18.1884 11.1712 20.268C11.2272 20.3715 11.3103 20.458 11.4115 20.5181C11.5128 20.5783 11.6284 20.6099 11.7462 20.6096C11.8638 20.6095 11.9793 20.5776 12.0803 20.5172C12.1813 20.4568 12.2641 20.3703 12.3199 20.2666L12.3733 20.1662C13.5281 18.1119 15.0507 16.2872 16.8651 14.7833C17.7059 14.0566 18.3821 13.159 18.8486 12.1504C19.3151 11.1417 19.5611 10.0451 19.5702 8.93386C19.5793 7.82258 19.3514 6.72214 18.9016 5.70593C18.4517 4.68973 17.7904 3.78114 16.9616 3.04077ZM11.7462 12.1345C11.1015 12.1345 10.4713 11.9433 9.93521 11.5852C9.39916 11.227 8.98137 10.7179 8.73465 10.1223C8.48794 9.52666 8.42339 8.87125 8.54916 8.23895C8.67493 7.60664 8.98539 7.02583 9.44125 6.56996C9.89712 6.11409 10.4779 5.80364 11.1102 5.67787C11.7425 5.55209 12.398 5.61664 12.9936 5.86336C13.5892 6.11007 14.0983 6.52787 14.4565 7.06391C14.8146 7.59996 15.0058 8.23017 15.0058 8.87487C15.0048 9.73906 14.661 10.5676 14.0499 11.1786C13.4389 11.7897 12.6104 12.1335 11.7462 12.1345Z"
                            fill="url(#paint0_linear_3708_961710.09773109890958509)"
                          ></path>
                          <defs>
                            <linearGradient
                              id="paint0_linear_3708_961710.09773109890958509"
                              x1="19.5705"
                              y1="20.6096"
                              x2="0.435545"
                              y2="5.28825"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#1250DC"></stop>
                              <stop offset="1" stopColor="#306DE4"></stop>
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      <h2 className="font-medium">Địa chỉ nhận hàng</h2>
                    </div>
                    {user ? (
                      <button
                        onClick={() => setAddressModalOpen(true)}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
                      >
                        Thay đổi
                      </button>
                    ) : null}
                  </div>
                  {user ? (
                    !editAddress ? (
                      <div className="border p-4 rounded">
                        <p>
                          {deliverySpecificAddress}, {deliveryWard}, {deliveryDistrict},{' '}
                          {deliveryProvince}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex gap-4 mb-4">
                          <div className="w-1/2">
                            <label className="block text-gray-600">Tỉnh/Thành phố</label>
                            {renderProvinceSelect()}
                          </div>
                          <div className="w-1/2">
                            <label className="block text-gray-600">Quận/Huyện</label>
                            {renderDistrictSelect()}
                          </div>
                        </div>
                        <div className="mt-2">
                          <label className="block text-gray-600">Phường/Xã</label>
                          {renderWardSelect()}
                        </div>
                        <div className="mt-2">
                          <label className="block text-gray-600">Địa chỉ cụ thể</label>
                          <input
                            type="text"
                            placeholder="Nhập địa chỉ cụ thể"
                            value={deliverySpecificAddress}
                            onChange={(e) => {
                              const value = e.target.value;
                              setDeliverySpecificAddress(value);
                              if (value.trim() === '') {
                                setAddressError('Thông tin bắt buộc. Vui lòng nhập đầy đủ.');
                              } else {
                                setAddressError('');
                              }
                            }}
                            className={`w-full border rounded p-2 mt-1 ${
                              addressError ? 'border-red-600' : ''
                            }`}
                          />
                          {addressError && (
                            <p className="flex items-center text-red-600 text-xs mt-1">
                              <ErrorIcon />
                              {addressError}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-4">
                          <div className="w-1/2">
                            <label className="block text-gray-600">Họ và tên người nhận</label>
                            <input
                              type="text"
                              placeholder="Nhập họ và tên người nhận"
                              value={recipientName}
                              onChange={(e) => {
                                const value = e.target.value;
                                setRecipientName(value);
                                if (value.trim() === '') {
                                  setRecipientNameError('Họ và tên không được để trống');
                                } else {
                                  setRecipientNameError('');
                                }
                              }}
                              className={`w-full border rounded p-2 ${
                                recipientNameError ? 'border-red-600' : ''
                              }`}
                            />
                            {recipientNameError && (
                              <p className="flex items-center text-red-600 text-xs mt-1">
                                <ErrorIcon />
                                {recipientNameError}
                              </p>
                            )}
                          </div>
                          <div className="w-1/2">
                            <label className="block text-gray-600">Số điện thoại người nhận</label>
                            <input
                              type="text"
                              placeholder="Nhập số điện thoại người nhận"
                              value={recipientPhone}
                              onChange={(e) => {
                                const value = e.target.value;
                                setRecipientPhone(value);
                                const phoneRegex = /^(0|\+84)[0-9]{9}$/; // Định dạng số điện thoại Việt Nam
                                if (value.trim() === '') {
                                  setRecipientPhoneError('Số điện thoại không được để trống');
                                } else if (!phoneRegex.test(value)) {
                                  setRecipientPhoneError('Số điện thoại không hợp lệ');
                                } else {
                                  setRecipientPhoneError('');
                                }
                              }}
                              className={`w-full border rounded p-2 mt-1 ${
                                recipientPhoneError ? 'border-red-600' : ''
                              }`}
                            />
                            {recipientPhoneError && (
                              <p className="flex items-center text-red-600 text-xs mt-1">
                                <ErrorIcon />
                                {recipientPhoneError}
                              </p>
                            )}
                          </div>
                        </div>
                        {user && (
                          <div className="mt-2 flex gap-2">
                            <button
                              onClick={handleUpdateAddress}
                              className="px-4 py-2 bg-blue-600 text-white rounded"
                            >
                              Lưu địa chỉ
                            </button>
                            <button
                              onClick={() => setEditAddress(false)}
                              className="px-4 py-2 bg-gray-300 text-black rounded"
                            >
                              Hủy
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  ) : (
                    <div className="space-y-4">
                      <div className="flex gap-4 mb-4">
                        <div className="w-1/2">
                          <label className="block text-gray-600">Tỉnh/Thành phố</label>
                          {renderProvinceSelect()}
                        </div>
                        <div className="w-1/2">
                          <label className="block text-gray-600">Quận/Huyện</label>
                          {renderDistrictSelect()}
                        </div>
                      </div>
                      <div className="mt-2">
                        <label className="block text-gray-600">Phường/Xã</label>
                        {renderWardSelect()}
                      </div>
                      <div className="mt-2">
                        <label className="block text-gray-600">Địa chỉ cụ thể</label>
                        <input
                          type="text"
                          placeholder="Nhập địa chỉ cụ thể"
                          value={deliverySpecificAddress}
                          onChange={(e) => {
                            const value = e.target.value;
                            setDeliverySpecificAddress(value);
                            if (value.trim() === '') {
                              setAddressError('Thông tin bắt buộc. Vui lòng nhập đầy đủ.');
                            } else {
                              setAddressError('');
                            }
                          }}
                          className={`w-full border rounded p-2 mt-1 ${
                            addressError ? 'border-red-600' : ''
                          }`}
                        />
                        {addressError && (
                          <p className="flex items-center text-red-600 text-xs mt-1">
                            <ErrorIcon />
                            {addressError}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-4">
                        <div className="w-1/2">
                          <label className="block text-gray-600">Họ và tên người nhận</label>
                          <input
                            type="text"
                            placeholder="Nhập họ và tên người nhận"
                            value={recipientName}
                            onChange={(e) => {
                              const value = e.target.value;
                              setRecipientName(value);
                              if (value.trim() === '') {
                                setRecipientNameError('Họ và tên không được để trống');
                              } else {
                                setRecipientNameError('');
                              }
                            }}
                            className={`w-full border rounded p-2 ${
                              recipientNameError ? 'border-red-600' : ''
                            }`}
                          />
                          {recipientNameError && (
                            <p className="flex items-center text-red-600 text-xs mt-1">
                              <ErrorIcon />
                              {recipientNameError}
                            </p>
                          )}
                        </div>
                        <div className="w-1/2">
                          <label className="block text-gray-600">Số điện thoại người nhận</label>
                          <input
                            type="text"
                            placeholder="Nhập số điện thoại người nhận"
                            value={recipientPhone}
                            onChange={(e) => {
                              const value = e.target.value;
                              setRecipientPhone(value);
                              const phoneRegex = /^(0|\+84)[0-9]{9}$/; // Định dạng số điện thoại Việt Nam
                              if (value.trim() === '') {
                                setRecipientPhoneError('Số điện thoại không được để trống');
                              } else if (!phoneRegex.test(value)) {
                                setRecipientPhoneError('Số điện thoại không hợp lệ');
                              } else {
                                setRecipientPhoneError('');
                              }
                            }}
                            className={`w-full border rounded p-2 mt-1 ${
                              recipientPhoneError ? 'border-red-600' : ''
                            }`}
                          />
                          {recipientPhoneError && (
                            <p className="flex items-center text-red-600 text-xs mt-1">
                              <ErrorIcon />
                              {recipientPhoneError}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="mt-4">
                    <textarea
                      placeholder="15 phút nữa hãy gọi cho tôi!"
                      className="w-full border rounded p-2 text-sm"
                      value={deliveryNote}
                      onChange={(e) => setDeliveryNote(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ) : (
              // --- Phần pickup được sửa đổi ---
              <div className="bg-white p-6 rounded-xl shadow-sm">
                {/* Thông tin người đặt */}
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="M12 12C14.7614 12 17 9.76141 17 7C17 4.23856 14.7614 1.99998 12 1.99998C9.23858 1.99998 7 4.23856 7 7C7 9.76141 9.23858 12 12 12Z"
                      fill="#ACC0F3"
                    />
                    <path
                      d="M12 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12 14.5Z"
                      fill="url(#paint0_linear_3708_96166)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_3708_96166"
                        x1="21.0902"
                        y1="22.5"
                        x2="15.1916"
                        y2="9.09562"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#1250DC" />
                        <stop offset="1" stopColor="#306DE4" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <h2 className="font-medium">Thông tin người đặt</h2>
                </div>
                <div className="mt-1 space-y-2">
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="block text-gray-600">Họ và tên người đặt</label>
                      <input
                        type="text"
                        placeholder="Nhập họ và tên người nhận"
                        value={recipientName}
                        onChange={(e) => {
                          const value = e.target.value;
                          setRecipientName(value);
                          if (value.trim() === '') {
                            setRecipientNameError('Họ và tên không được để trống');
                          } else {
                            setRecipientNameError('');
                          }
                        }}
                        className={`w-full border rounded p-2 ${
                          recipientNameError ? 'border-red-600' : ''
                        }`}
                      />
                      {recipientNameError && (
                        <p className="flex items-center text-red-600 text-xs mt-1">
                          <ErrorIcon />
                          {recipientNameError}
                        </p>
                      )}
                    </div>
                    <div className="w-1/2">
                      <label className="block text-gray-600">Số điện thoại người đặt</label>
                      <input
                        type="text"
                        placeholder="Nhập số điện thoại người nhận"
                        value={recipientPhone}
                        onChange={(e) => {
                          const value = e.target.value;
                          setRecipientPhone(value);
                          const phoneRegex = /^(0|\+84)[0-9]{9}$/; // Định dạng số điện thoại Việt Nam
                          if (value.trim() === '') {
                            setRecipientPhoneError('Số điện thoại không được để trống');
                          } else if (!phoneRegex.test(value)) {
                            setRecipientPhoneError('Số điện thoại không hợp lệ');
                          } else {
                            setRecipientPhoneError('');
                          }
                        }}
                        className={`w-full border rounded p-2 mt-1 ${
                          recipientPhoneError ? 'border-red-600' : ''
                        }`}
                      />
                      {recipientPhoneError && (
                        <p className="flex items-center text-red-600 text-xs mt-1">
                          <ErrorIcon />
                          {recipientPhoneError}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="block text-gray-600">Email (không bắt buộc)</label>
                    {user ? (
                      <p className="border rounded p-2 mt-1">{user.email || ''}</p>
                    ) : (
                      <input
                        type="email"
                        placeholder="Nhập email"
                        className={`w-full border rounded p-2 mt-1 ${
                          emailError ? 'border-red-600' : ''
                        }`}
                        value={deliveryUserEmail}
                        onChange={(e) => {
                          const value = e.target.value;
                          setDeliveryUserEmail(value);
                          // Nếu nhập không rỗng, kiểm tra cấu trúc @gmail.com
                          if (value && !/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value)) {
                            setEmailError('Email không hợp lệ, phải theo cấu trúc @gmail.com');
                          } else {
                            setEmailError('');
                          }
                        }}
                      />
                    )}
                    {emailError && (
                      <p className="flex items-center text-red-600 text-xs mt-1">
                        <ErrorIcon />
                        {emailError}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phần chọn nhà thuốc */}
                <div className="flex items-center mb-2 mt-4">
                  <div className="w-6 h-6 mr-2 mt-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M21.9813 8.47375L20.85 3.94625C20.7113 3.39 20.2113 3 19.6375 3H4.36375C3.79 3 3.29 3.39 3.15 3.94625L2.01875 8.47375C2.00625 8.5225 2 8.57375 2 8.625C2 10.3475 3.33125 11.75 4.96875 11.75C5.92 11.75 6.76875 11.2762 7.3125 10.5413C7.85625 11.2762 8.705 11.75 9.65625 11.75C10.6075 11.75 11.4563 11.2762 12 10.5413C12.5438 11.2762 13.3913 11.75 14.3438 11.75C15.2963 11.75 16.1438 11.2762 16.6875 10.5413C17.2313 11.2762 18.0788 11.75 19.0313 11.75C20.6688 11.75 22 10.3475 22 8.625C22 8.57375 21.9938 8.5225 21.9813 8.47375Z"
                        fill="#ACC0F3"
                      />
                      <path
                        d="M19.0312 13.0453C18.18 13.0453 17.3713 12.7695 16.6875 12.2656C15.32 13.2746 13.3675 13.2746 12 12.2656C10.6325 13.2746 8.68 13.2746 7.3125 12.2656C6.62875 12.7695 5.82 13.0453 4.96875 13.0453C4.355 13.0453 3.77625 12.8928 3.25 12.6329V19.6747C3.25 20.4066 3.81 21.0006 4.5 21.0006H9.5V15.697H14.5V21.0006H19.5C20.19 21.0006 20.75 20.4066 20.75 19.6747V12.6329C20.2237 12.8928 19.645 13.0453 19.0312 13.0453Z"
                        fill="url(#paint0_linear_3708_961710)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_3708_961710"
                          x1="19.5705"
                          y1="20.6096"
                          x2="3"
                          y2="5.28825"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#1250DC" />
                          <stop offset="1" stopColor="#306DE4" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <h2 className="font-medium mt-3 ml-2">Chọn nhà thuốc lấy hàng</h2>
                </div>
                <div className="mt-4 space-y-4">
                  <div className="flex gap-4">
                    {provincesPickup.length > 0 ? (
                      <select
                        className="w-1/2 border rounded p-2 text-sm"
                        value={selectedProvince}
                        onChange={(e) => setSelectedProvince(e.target.value)}
                      >
                        <option value="">Chọn tỉnh/thành phố</option>
                        {provincesPickup.map((province) => (
                          <option key={province} value={province}>
                            {province}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <select className="w-1/2 border rounded p-2 text-sm">
                        <option>Loading...</option>
                      </select>
                    )}
                    {selectedProvince ? (
                      districts.length > 0 ? (
                        <select
                          className="w-1/2 border rounded p-2 text-sm"
                          value={selectedDistrict}
                          onChange={(e) => setSelectedDistrict(e.target.value)}
                        >
                          <option value="">Chọn quận/huyện</option>
                          {districts.map((district) => (
                            <option key={district} value={district}>
                              {district}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <select className="w-1/2 border rounded p-2 text-sm">
                          <option>No district found</option>
                        </select>
                      )
                    ) : (
                      <select className="w-1/2 border rounded p-2 text-sm">
                        <option value="">Chọn quận/huyện</option>
                      </select>
                    )}
                  </div>
                  <textarea
                    placeholder="Gọi cho tôi khi chuẩn bị hàng xong."
                    className="w-full mt-2 border rounded p-2 text-sm"
                    value={deliveryNote}
                    onChange={(e) => setDeliveryNote(e.target.value)}
                  />
                  <div className="mt-4">
                    <h2 className="font-medium mb-2">Danh sách nhà thuốc</h2>
                    {filteredPharmacies.length > 0 ? (
                      <div className="space-y-3 max-h-[300px] overflow-y-auto">
                        {filteredPharmacies.map((group) => {
                          // Kiểm tra xem tất cả sản phẩm trong giỏ hàng có đủ tồn kho tại nhà thuốc này hay không
                          const isPharmacyAvailable = cartItems.every((cartItem) => {
                            const record = group.stocks.find(
                              (s) => s.product_id === cartItem.product_id,
                            );
                            return (
                              record &&
                              record.quantity !== undefined &&
                              record.quantity >= cartItem.quantity
                            );
                          });
                          return (
                            <button
                              key={group.info.pharmacy_id}
                              onClick={() =>
                                isPharmacyAvailable && setSelectedPharmacy(group.info.pharmacy_id)
                              }
                              disabled={!isPharmacyAvailable}
                              className={`w-full text-left p-4 border rounded flex flex-col transition-colors ${
                                selectedPharmacy === group.info.pharmacy_id
                                  ? 'bg-blue-100 border-blue-600'
                                  : 'border-gray-300'
                              } ${
                                !isPharmacyAvailable
                                  ? 'opacity-50 cursor-not-allowed'
                                  : 'hover:bg-blue-50'
                              }`}
                            >
                              <h3 className="font-semibold">{group.info.name}</h3>
                              <p className="text-sm text-gray-600">
                                {group.info.address_street}, {group.info.ward},{' '}
                                {group.info.district}
                              </p>
                              <div className="mt-2 space-y-1">
                                {cartItems.map((item) => {
                                  const stockRecord = group.stocks.find(
                                    (s) => s.product_id === item.product_id,
                                  );
                                  const available =
                                    stockRecord &&
                                    stockRecord.quantity !== undefined &&
                                    stockRecord.quantity >= item.quantity;
                                  return (
                                    <div
                                      key={item.product_id}
                                      className="flex items-center justify-between text-sm"
                                    >
                                      <span className="flex-1 mr-2 break-words">{item.name}</span>
                                      <span
                                        className={`font-semibold whitespace-nowrap ${
                                          available ? 'text-green-600' : 'text-red-500'
                                        }`}
                                      >
                                        {available ? 'Có sẵn' : 'Hết hàng'}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">Không có nhà thuốc nào ở khu vực này.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Yêu cầu xuất hóa đơn điện tử */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-gray-800">Yêu cầu xuất hóa đơn điện tử</div>
                <label className="inline-flex relative items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:left-[2px] after:top-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </div>
            </div>

            {/* Phương thức thanh toán */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="font-medium mb-2">Chọn phương thức thanh toán</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment_method"
                    className="accent-blue-600"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <Image
                    src="/images/thanh-toan/cod.png"
                    alt="Cash on Delivery Icon"
                    className="w-8 h-8"
                    width={240}
                    height={240}
                  />
                  <span>Thanh toán tiền mặt khi nhận hàng</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment_method"
                    className="accent-blue-600"
                    value="qr"
                    checked={paymentMethod === 'qr'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <Image
                    src="/images/thanh-toan/qr.png"
                    alt="QR Code Transfer Icon"
                    className="w-8 h-8"
                    width={240}
                    height={240}
                  />
                  <span>Thanh toán bằng chuyển khoản (QR Code)</span>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Bảng tóm tắt thanh toán */}
          <div className="sticky bottom-0 md:static w-full max-w-sm">
            <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
              {/* Nút mở Modal ưu đãi */}
              <button
                className="w-full py-2.5 px-3 rounded-[8px] bg-[#eaeffa] text-sm font-medium flex justify-between items-center"
                onClick={() => setShowDiscountModal(true)}
              >
                <span className="text-[#1250dc] flex items-center justify-center text-[14px] font-medium">
                  Áp dụng ưu đãi để được giảm giá
                </span>
                <ChevronRight color="#1250dc" />
              </button>
              {/* Thông tin thanh toán hiện tại */}
              <div className="space-y-2 text-sm hidden sm:block">
                <div className="flex justify-between">
                  <span className="text-[#4a4f63]">Tổng tiền</span>
                  <span className="font-semibold text-[#020b27]">
                    {totalOriginal.toLocaleString('vi-VN')}đ
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4a4f63]">Giảm giá trực tiếp</span>
                  <span className="text-orange-500 font-semibold">
                    {directDiscount > 0 ? `-${directDiscount.toLocaleString('vi-VN')}đ` : '0đ'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4a4f63]">Giảm giá voucher</span>
                  <span className="text-orange-500 font-semibold">
                    {voucherDiscount > 0 ? `-${voucherDiscount.toLocaleString('vi-VN')}đ` : '0đ'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4a4f63]">Tiết kiệm được</span>
                  <span className="text-orange-500 font-semibold">
                    {totalSavings.toLocaleString('vi-VN')}đ
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4a4f63]">Phí vận chuyển</span>
                  <span className="text-green-600">Miễn phí</span>
                </div>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between items-baseline">
                  <div className="font-semibold text-base">Thành tiền</div>
                  <div className="flex items-baseline gap-2">
                    <span className="line-through text-sm text-gray-400">
                      {totalOriginal.toLocaleString('vi-VN')}đ
                    </span>
                    <span className="text-blue-600 text-lg font-bold">
                      {(totalFinal - voucherDiscount).toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                </div>
              </div>
              <div className="block sm:hidden space-y-2">
                <div className="flex justify-between gap-2 items-baseline">
                  <div className="text-text-secondary whitespace-nowrap text-sm">
                    Tiết kiệm được
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-[#f79009]">
                      {directDiscount > 0 ? `${directDiscount.toLocaleString('vi-VN')}đ` : '0đ'}
                    </span>
                  </div>
                </div>
              </div>
              <button
                className="w-full bg-blue-600 text-white py-3 rounded-full font-medium text-sm"
                onClick={handleCreateOrder}
              >
                Hoàn tất
              </button>
              <div className="text-[13px] text-center text-[#020b27]">
                Bằng việc tiến hành đặt mua hàng, bạn đồng ý với Điều khoản dịch vụ và Chính sách xử
                lý dữ liệu cá nhân của Nhà thuốc FPT Long Châu
              </div>
            </div>

            {/* Modal Ưu Đãi */}
            {showDiscountModal && (
              <DiscountModal
                onClose={() => setShowDiscountModal(false)}
                onSelectVoucher={(voucher) => {
                  setSelectedVoucher(voucher);
                  toast.success(`Voucher ${voucher.code} đã được chọn`);
                }}
              />
            )}

            {addressModalOpen && user && (
              <AddressModal
                userId={user.id}
                onClose={() => setAddressModalOpen(false)}
                onSelectAddress={(address) => handleSelectAddress(address)}
                onAddNew={() => {
                  setAddressModalOpen(false);
                  setNewAddressModalOpen(true);
                }}
                onEditAddress={(address) => {
                  // Khi nhấn "Sửa", cập nhật state và mở modal chỉnh sửa địa chỉ
                  setSelectedAddressForEdit(address);
                  setAddressModalOpen(false);
                  setEditAddressModalOpen(true);
                }}
              />
            )}

            {newAddressModalOpen && (
              <NewAddressModal
                onClose={() => setNewAddressModalOpen(false)}
                onSave={(newAddress) => {
                  handleSelectAddress(newAddress);
                }}
                onBack={() => {
                  setNewAddressModalOpen(false);
                  setAddressModalOpen(true);
                }}
              />
            )}

            {editAddressModalOpen && (
              <EditAddressModal
                address={selectedAddressForEdit}
                onClose={() => setEditAddressModalOpen(false)}
                onBack={() => {
                  setEditAddressModalOpen(false);
                  setAddressModalOpen(true);
                }}
                onUpdate={() => {}}
                onDelete={() => {}}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
