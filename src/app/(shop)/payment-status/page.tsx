'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  PDFInvoiceViewer,
  DownloadInvoicePDF,
} from '../../../components/Invoice/InvoiceViewerClient';
import { sendInvoiceEmail } from '../actions/sendInvoice';
import Link from 'next/link';

const PaymentStatusPage = () => {
  const searchParams = useSearchParams();
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [order, setOrder] = useState<any | null>(null);

  useEffect(() => {
    const responseCode = searchParams.get('vnp_ResponseCode');
    const status = searchParams.get('status');
    const orderData = sessionStorage.getItem('order_data');
    const itemProduct = sessionStorage.getItem('checkoutItems')

    if (responseCode) {
      setIsSuccess(responseCode === '00');
    } else if (status) {
      setIsSuccess(status === 'success');
    }

    if (orderData && itemProduct) {
      const parsedOrder = JSON.parse(orderData);
      const checkoutItems = JSON.parse(itemProduct);
      parsedOrder.itemsProduct = checkoutItems;
      setOrder(parsedOrder);

      if ((responseCode === '00' || status === 'success') && parsedOrder) {
        sendInvoiceEmail(parsedOrder);
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md max-w-2xl w-full text-center">
        {isSuccess === null ? (
          <p>Đang xử lý kết quả thanh toán...</p>
        ) : isSuccess ? (
          <>
            <h1 className="text-2xl font-bold text-green-600 mb-4">🎉 Đặt hàng thành công!</h1>
            <p className="mb-2">Cảm ơn bạn đã đặt hàng.</p>
            {order && (
              <>
                <p className="mb-2">
                  Mã đơn hàng: <strong>{order.id}</strong>
                </p>
                <PDFInvoiceViewer order={order} />
                <div className="mt-4">
                  <DownloadInvoicePDF order={order} />
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-red-600 mb-4">❌ Thanh toán thất bại</h1>
            <p className="mb-4">Đã có lỗi xảy ra trong quá trình thanh toán.</p>
          </>
        )}

        <Link href="/" className="text-blue-600 hover:underline" onClick={()=>sessionStorage.clear()}>
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
};

export default PaymentStatusPage;
