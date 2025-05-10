import api from '../axios';

const endpoint = '/auth';

class AuthClient {
  constructor(private readonly client = api) {}

  async login(data: { email: string; password: string; remember?: boolean }) {
    const res = await this.client.post(`${endpoint}/login`, data);
    return res.data;
  }

  logout(payload: { userId: string }) {
    return this.client.post('/auth/logout', payload);
  }

  async getProfile() {
    const res = await this.client.get(`${endpoint}/me`);
    return res.data;
  }
}

export const authApi = new AuthClient();
