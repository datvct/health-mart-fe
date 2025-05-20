import api from '../axios';

const endpoint = '/review';

class ReviewClient {
  constructor(private readonly client = api) {}

  async getByProductId(productId: number) {
    const res = await this.client.get(`${endpoint}/product/${productId}`);
    return res.data;
  }

  async createReview(data: { userId: number; productId: number; rating: number; comment: string }) {
    const res = await this.client.post(endpoint, data);
    return res.data;
  }

  async createReviewImageFile(reviewId: number, file: File) {
    const formData = new FormData();
    formData.append('reviewId', String(reviewId));
    formData.append('image_url', file);

    const res = await this.client.post(`${endpoint}/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  }
}

export const reviewApi = new ReviewClient();
