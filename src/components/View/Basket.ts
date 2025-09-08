import { Component } from '../base/Component';
import { IProduct } from '../../types';

export class BasketView extends Component<unknown> {
  protected _list: HTMLElement;
  protected _total: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, onOrderClick: () => void) {
    super(container);

    this._list = this.container.querySelector('.basket__list')!;
    this._total = this.container.querySelector('.basket__price')!;
    this._button = this.container.querySelector('.basket__button')!;

    this._button.addEventListener('click', onOrderClick);
  }

  set items(items: IProduct[]) {
    if (items.length === 0) {
      this._list.replaceChildren();
      this._list.innerHTML = '<p>Корзина пуста</p>';
      this.setDisabled(this._button, true);
    } else {
      this._list.replaceChildren();
      this.setDisabled(this._button, false);
    }
  }

  set total(value: number) {
    this.setText(this._total, `${value} синапсов`);
  }
}