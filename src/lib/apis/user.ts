import api from '../axios';

const endpoint = '/user';

class UserClient {
  constructor(private readonly client = api) {}

  async updateUser(id: number, formData: FormData) {
    const res = await this.client.put(`${endpoint}/${id}`, formData);
    return res.data;
  }

  async registerUser(formData: FormData) {
    const res = await this.client.post(`${endpoint}/register`, formData);
    return res.data;
  }
}

export const userApi = new UserClient();
