import api from '../axios';

const endpoint = '/user';

type UpdateUserPayload = {
  fullName?: string;
  phone?: string;
  avatar?: string;
  email?: string;
  password?: string;
  role?: string;
};

export type RegisterUserPayload = {
  avatar: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: string;
};

class UserClient {
  constructor(private readonly client = api) {}

  async updateUser(id: string, data: UpdateUserPayload) {
    const token = localStorage.getItem('accessToken');
    const res = await this.client.put(`${endpoint}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }

  async registerUser(data: RegisterUserPayload) {
    const res = await this.client.post(`${endpoint}/register`, data);
    return res.data;
  }
}

export const userApi = new UserClient();
