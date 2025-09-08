import { Component } from '../base/Component';

export class Success extends Component<unknown> {
  protected _description: HTMLElement;
  protected _closeButton: HTMLButtonElement;

  constructor(container: HTMLElement, onClose: () => void) {
    super(container);

    this._description = this.container.querySelector('.order-success__description')!;
    this._closeButton = this.container.querySelector('.order-success__close')!;

    this._closeButton.addEventListener('click', onClose);
  }

  set total(value: number) {
    this.setText(this._description, `Списано ${value} синапсов`);
  }
}