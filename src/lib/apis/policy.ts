import api from '../axios';
import { Policy } from '../types/policies/type';

const endpoint = '/policies';

class PolicyClient {
  constructor(private readonly client = api) {}

  async getListPolicy() {
    const res = await this.client.get(endpoint);
    return res.data.data.sort((a: Policy, b: Policy) => a.id - b.id);
  }
}

export const policyApi = new PolicyClient();
