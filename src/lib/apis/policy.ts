import api from '../axios';

const endpoint = '/policies';

class PolicyClient {
  constructor(private readonly client = api) {}

  async getListPolicy() {
    const res = await this.client.get(endpoint);
    return res.data.data.sort((a: any, b: any) => a.id - b.id);
  }
}

export const policyApi = new PolicyClient();
