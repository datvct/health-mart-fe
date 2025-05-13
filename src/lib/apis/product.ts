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

  async getListCategoriesRoot() {
    const res = await this.client.get(endpoint + '/categories-root');
    return res.data;
  }

  async getListCategoriesChildrenById(id: number) {
    const res = await this.client.get(endpoint + `/${id}`);
    return res.data;
  }

  async getCategoryBySlug(slug: string) {
    const res = await this.client.get(endpoint + `/category/slug/${slug}`);
    return res.data;
  }

    async getProductBySlug(slug: string) {
    const res = await this.client.get(endpoint + `/slug/${slug}`);
    return res.data;
  }

  async getCategoryById(id: number) {
    const res = await this.client.get(endpoint + `/category/${id}`);
    return res.data;
  }

  async getCategoryRelated(id: number) {
    const res = await this.client.get(endpoint + `/category/relate/${id}`);
    return res.data;
  }
}

export const productApi = new ProductClient();
