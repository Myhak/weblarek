import { IProduct } from '../../types';
import { EventEmitter } from '../base/Events';

export class Products extends EventEmitter {
  private items: IProduct[] = [];
  private selectedItem: IProduct | null = null;

  setItems(items: IProduct[]): void {
    this.items = [...items];
    this.emit('products:changed', { items: this.items });
  }

  getItems(): IProduct[] {
    return [...this.items];
  }

  getItemById(id: string): IProduct | undefined {
    return this.items.find(item => item.id === id);
  }

  setSelectedItem(item: IProduct): void {
    this.selectedItem = item;
    this.emit('product:selected', { item });
  }

  getSelectedItem(): IProduct | null {
    return this.selectedItem;
  }
}