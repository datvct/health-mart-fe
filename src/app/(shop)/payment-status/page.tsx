'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { orderApi } from '../../../lib/apis/order';

const PaymentStatusPage = () => {
  const searchParams = useSearchParams();
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const vnp_ResponseCode = searchParams.get('vnp_ResponseCode');
    const status = searchParams.get('status');
    const orderIdParam = searchParams.get('orderId');
    const codParam = searchParams.get('cod');

    setOrderId(orderIdParam);

    if (vnp_ResponseCode) {
      setIsSuccess(vnp_ResponseCode === '00');
    } else if (status) {
      setIsSuccess(status === 'success');
    } else {
      setIsSuccess(null); // Không xác định
    }

    if (orderIdParam) {
      const isCod = codParam === 'true';
      const orderIdNumber = Number(orderIdParam);
      if (!isNaN(orderIdNumber)) {
        orderApi.updateOrder(orderIdNumber, {
          order_status: isCod ? 'PENDING' : 'PENDING_NOTPAYMENT',
        });
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full text-center">
        {isSuccess === null ? (
          <p>Đang xử lý kết quả thanh toán...</p>
        ) : isSuccess ? (
          <>
            <h1 className="text-2xl font-bold text-green-600 mb-4">🎉 Đặt hàng thành công!</h1>
            <p className="mb-2">Cảm ơn bạn đã đặt hàng.</p>
            <p className="mb-4">
              Mã đơn hàng: <strong>{orderId}</strong>
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-red-600 mb-4">❌ Thanh toán thất bại</h1>
            <p className="mb-4">Đã có lỗi xảy ra trong quá trình thanh toán.</p>
          </>
        )}

        <Link href="/" className="text-blue-600 hover:underline">
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
};

export default PaymentStatusPage;
