import { IApi } from '../../types';
import { IProduct, IOrder } from '../../types';

export class LarekAPI {
  constructor(private api: IApi) {}

  async getProducts(): Promise<IProduct[]> {
    const response = await this.api.get('/product');
    return (response as { items: IProduct[] }).items;
  }

  async postOrder(order: IOrder): Promise<{ id: string; total: number }> {
    const response = await this.api.post('/order', order);
    return response as { id: string; total: number };
  }
}