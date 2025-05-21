// lib/api/productClient.ts
import api from '../axios';

const endpoint = '/product';

class ProductClient {
  constructor(private readonly client = api) {}

  async getList(params?: { name?: string }) {
    const res = await this.client.get(endpoint, { params });
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

  async getProductByCategoryId(id: number, filters: Record<string, any> = {}) {
    const params = new URLSearchParams();

    for (const key in filters) {
      const value = filters[key];
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else if (value !== undefined && value !== null) {
        params.append(key, value);
      }
    }

    const queryString = params.toString();
    const res = await this.client.get(`${endpoint}/category-lv3/${id}?${queryString}`);
    return res.data;
  }

  async getListBrands() {
    const res = await this.client.get(endpoint + '/list-brands');
    return res.data;
  }

  async updatePharmacyProduct(
    pharmacyId: number,
    productId: number,
    updateRequest: { quantity: number },
  ) {
    const res = await this.client.put(
      `${endpoint}/${productId}/pharmacy-product/${pharmacyId}`,
      updateRequest,
    );
    return res.data.data || res.data;
  }

  async getPharmacyProducts() {
    const res = await this.client.get(`${endpoint}/pharmacy-products`);
    return res.data;
  }
}

export const productApi = new ProductClient();
