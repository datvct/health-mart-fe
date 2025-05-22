import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Ubuntu',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf',
    },
    {
      src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf',
      fontWeight: 'bold',
    },
    {
      src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf',
      fontWeight: 'normal',
      fontStyle: 'italic',
    },
  ],
});

const styles = StyleSheet.create({
  page: { padding: 24, fontFamily: 'Ubuntu' },
  section: { marginBottom: 12 },
  title: { fontSize: 20, marginBottom: 10, fontWeight:700, textAlign:'center' },
  item: { marginBottom: 4 },
});



export const InvoiceDocument = ({ order }: { order: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Hóa đơn mua hàng</Text>
        <Text>Mã đơn hàng: {order.id}</Text>
        <Text>Khách hàng: {order.shippingAddress?.customerName}</Text>
        <Text>Email: {order.shippingAddress?.customerEmail}</Text>
        <Text>SĐT: {order.shippingAddress?.customerPhone}</Text>
        <Text>Địa chỉ: {order.shippingAddress?.address}, {order.shippingAddress?.ward}, {order.shippingAddress?.district}, {order.shippingAddress?.city}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Chi tiết đơn hàng:</Text>
        {order.itemsProduct.map((item: any, index: number) => (
          <Text style={styles.item} key={index}>
            - {item.name} | SL: {item.quantity} | Giá: {item.price}
          </Text>
        ))}
        <Text style={{ marginTop: 10 }}>
          Tổng tiền: {order.total_price}đ | Giảm giá: {order.discount}đ | Thanh toán:{' '}
          {order.final_price}đ
        </Text>
      </View>
    </Page>
  </Document>
);
