'use client';

import React from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { InvoiceDocument } from './InvoiceDocument';

export const PDFInvoiceViewer = ({ order }: { order: any }) => (
  <div style={{ height: '600px' }}>
    <PDFViewer width="100%" height="100%">
      <InvoiceDocument order={order} />
    </PDFViewer>
  </div>
);

export const DownloadInvoicePDF = ({ order }: { order: any }) => (
  <PDFDownloadLink
    document={<InvoiceDocument order={order} />}
    fileName={`invoice_${order.id}.pdf`}
  >
    {({ loading }) => (loading ? 'Đang tạo file...' : 'Tải Hóa Đơn PDF')}
  </PDFDownloadLink>
);
