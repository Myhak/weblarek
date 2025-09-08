import { Form } from './Form';
import { IContactsForm } from '../../types';

export class ContactsForm extends Form<IContactsForm> {
  protected _emailInput: HTMLInputElement;
  protected _phoneInput: HTMLInputElement;

  constructor(container: HTMLElement, onSubmit: ( arg0: IContactsForm) => void) {
    super(container, onSubmit);

    this._emailInput = this.container.querySelector('input[name="email"]')!;
    this._phoneInput = this.container.querySelector('input[name="phone"]')!;

    this._emailInput.addEventListener('input', () => this.validate());
    this._phoneInput.addEventListener('input', () => this.validate());
  }

  protected validate() {
    const errors: string[] = [];
    if (!this.email) errors.push('Email не указан');
    if (!this.phone) errors.push('Телефон не указан');

    this.errors = errors.join(', ');
    this.valid = errors.length === 0;
  }

  protected getValues(): IContactsForm {
    return {
      email: this.email,
      phone: this.phone,
    };
  }

  set email(value: string) {
    this._emailInput.value = value;
  }

  set phone(value: string) {
    this._phoneInput.value = value;
  }

  get email(): string {
    return this._emailInput.value.trim();
  }

  get phone(): string {
    return this._phoneInput.value.trim();
  }
}