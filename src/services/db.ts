import { ERROR } from '../utils/consts';

export class Store {
  constructor(public url: string) {}

  async request<T>(method: string, endpoint: string, data?: any): Promise<T> {
    const url = this.url + endpoint;
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    const config: RequestInit = { method, headers };
    if (data) config.body = JSON.stringify(data);
    try {
      const res = await fetch(url, config);
      if (res.ok) {
        const resData: T = await res.json();
        return resData;
      }
      throw new Error(ERROR.SERVER_NOT_FOUND);
    } catch (error) {
      throw new Error(ERROR.SERVER);
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    const res = this.request<T>('GET', endpoint);
    return res;
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const res = await this.request<T>('POST', endpoint, data);
    return res;
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    const res = await this.request<T>('PUT', endpoint, data);
    return res;
  }

  async delete<T>(endpoint: string): Promise<void> {
    await this.request<T>('DELETE', endpoint);
  }
}
