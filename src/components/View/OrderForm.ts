import { Form } from './Form';
import { TPayment } from '../../types';

export interface IOrderForm {
  payment: TPayment;
  address: string;
}

export class OrderForm extends Form<IOrderForm> {
  protected _paymentButtons: NodeListOf<HTMLButtonElement>;
  protected _addressInput: HTMLInputElement;

  constructor(container: HTMLElement, onSubmit: (data: IOrderForm) => void) {
    super(container, onSubmit);

    this._paymentButtons = this.container.querySelectorAll('.button_alt');
    this._addressInput = this.container.querySelector('input[name="address"]')!;

    this._paymentButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.onPaymentChange(button.name as TPayment);
      });
    });

    this._addressInput.addEventListener('input', () => {
      this.validate();
    });
  }

  protected onPaymentChange(payment: TPayment) {
    this._paymentButtons.forEach(btn => {
      btn.classList.toggle('button_alt-active', btn.name === payment);
    });
    this.validate();
  }

  protected validate() {
    const errors: string[] = [];
    if (!this.payment) errors.push('Выберите способ оплаты');
    if (!this.address) errors.push('Укажите адрес');

    this.errors = errors.join(', ');
    this.valid = errors.length === 0;
  }

  protected getValues(): IOrderForm {
    return {
      payment: this.payment,
      address: this.address,
    };
  }

  set payment(value: TPayment) {
    this._paymentButtons.forEach(btn => {
      btn.classList.toggle('button_alt-active', btn.name === value);
    });
  }

  set address(value: string) {
    this._addressInput.value = value;
  }

   get payment(): TPayment {
    const active = this.container.querySelector('.button_alt-active') as HTMLButtonElement;
    return active.name as TPayment;
  }

  get address(): string {
    return this._addressInput.value.trim();
  }
}