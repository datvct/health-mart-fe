import api from '../axios';

const endpoint = '/vnpay';

class PaymentClient {
  constructor(private readonly client = api) {}

  async createPayment(amount: number, orderId: number) {
    const res = await this.client.post(`${endpoint}/create-payment`, { amount, orderId });
    return res.data;
  }
}

export const paymentApi = new PaymentClient();
