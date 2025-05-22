'use server';

import { Resend } from 'resend';
import { renderToBuffer } from '@react-pdf/renderer';
import { InvoiceDocument } from '../../../components/Invoice/InvoiceDocument';

const resend = new Resend(process.env.NEXT_PUBLIC_API_KEY_RESEND!);

export async function sendInvoiceEmail(order: any) {
  const pdfBuffer = await renderToBuffer(<InvoiceDocument order={order} />);
  console.log('abc')

  await resend.emails.send({
    from: 'Healthmart <healthmart@resend.dev>',
    to: order.shippingAddress?.customerEmail,
    subject: `Hóa đơn đơn hàng #${order.id}`,
    text: 'Cảm ơn bạn đã mua hàng! Vui lòng xem hóa đơn đính kèm.',
    attachments: [
      {
        filename: `invoice_${order.id}.pdf`,
        content: pdfBuffer.toString('base64'),
        type: 'application/pdf',
        disposition: 'attachment',
      },
    ],
  });
}
