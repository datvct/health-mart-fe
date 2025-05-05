// lib/api/productClient.ts
import api from '../axios';

const endpoint = '/product';

class ProductClient {
  constructor(private readonly client = api) {}

  async getList() {
    const res = await this.client.get(endpoint);
    return res.data;
  }

  async getListPharmacyStocks() {
    const res = await this.client.get(endpoint + '/pharmacy-stocks');
    return res.data;
  }
}

export const productApi = new ProductClient();
