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
    const res = await this.client.put(`${endpoint}/${id}`, data);
    return res.data;
  }

  async registerUser(formData: FormData) {
    const res = await this.client.post(`${endpoint}/register`, formData);
    return res.data;
  }
}

export const userApi = new UserClient();
