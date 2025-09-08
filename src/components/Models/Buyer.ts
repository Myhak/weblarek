import { IBuyer, TPayment } from '../../types';
import { EventEmitter } from '../base/Events';

export class Buyer extends EventEmitter {
  private payment: TPayment | null = null;
  private address: string = '';
  private email: string = '';
  private phone: string = '';

  setPayment(payment: TPayment): void {
    this.payment = payment;
    this.emit('buyer:changed', this.getDataPartial());
  }

  setAddress(address: string): void {
    this.address = address;
    this.emit('buyer:changed', this.getDataPartial());
  }

  setEmail(email: string): void {
    this.email = email;
    this.emit('buyer:changed', this.getDataPartial());
  }

  setPhone(phone: string): void {
    this.phone = phone;
    this.emit('buyer:changed', this.getDataPartial());
  }

  getData(): IBuyer {
    if (!this.payment || !this.address || !this.email || !this.phone) {
      throw new Error('Buyer data is incomplete');
    }
    return {
      payment: this.payment,
      address: this.address,
      email: this.email,
      phone: this.phone,
    };
  }

  getDataPartial() {
    return {
      payment: this.payment,
      address: this.address,
      email: this.email,
      phone: this.phone,
    };
  }

  clear(): void {
    this.payment = null;
    this.address = '';
    this.email = '';
    this.phone = '';
    this.emit('buyer:changed', this.getDataPartial());
  }

  validate(): string[] {
    const errors: string[] = [];
    if (!this.payment) errors.push('payment');
    if (!this.address) errors.push('address');
    if (!this.email) errors.push('email');
    if (!this.phone) errors.push('phone');
    return errors;
  }
}