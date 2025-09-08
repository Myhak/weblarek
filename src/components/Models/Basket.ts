import { IProduct } from '../../types';
import { EventEmitter } from '../base/Events';

export class Basket extends EventEmitter {
  private items: IProduct[] = [];

  getItems(): IProduct[] {
    return [...this.items];
  }

  addItem(item: IProduct): void {
    if (!this.hasItem(item.id)) {
      this.items.push(item);
      this.emit('basket:changed', { items: this.items });
    }
  }

  removeItem(id: string): void {
    const beforeCount = this.items.length;
    this.items = this.items.filter(item => item.id !== id);
    if (beforeCount !== this.items.length) {
      this.emit('basket:changed', { items: this.items });
    }
  }

  clear(): void {
    this.items = [];
    this.emit('basket:changed', { items: this.items });
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + (item.price || 0), 0);
  }

  getCount(): number {
    return this.items.length;
  }

  hasItem(id: string): boolean {
    return this.items.some(item => item.id === id);
  }
}