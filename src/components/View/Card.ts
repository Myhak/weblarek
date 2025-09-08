import { Component } from '../base/Component';
import { IProduct } from '../../types';
import { categoryMap } from '../../utils/constants';

interface ICardActions {
  onClick?: () => void;
}

export class Card extends Component<IProduct> {
  protected _title: HTMLElement;
  protected _image: HTMLImageElement;
  protected _price: HTMLElement;
  protected _category: HTMLElement;
  protected _description?: HTMLElement;
  protected _button?: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this._title = this.container.querySelector('.card__title')!;
    this._image = this.container.querySelector('.card__image')!;
    this._price = this.container.querySelector('.card__price')!;
    this._category = this.container.querySelector('.card__category')!;

    this._description = this.container.querySelector('.card__text')!;
    this._button = this.container.querySelector('.card__button')!;

    if (actions?.onClick) {
      if (this._button) {
        this._button.addEventListener('click', actions.onClick);
      } else {
        this.container.addEventListener('click', actions.onClick);
      }
    }
  }

  set id(value: string) {
    this.container.dataset.id = value;
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  set image(value: string) {
    this.setImage(this._image, value, this._title.textContent || '');
  }

  set price(value: number | null) {
    this.setText(this._price, value === null ? 'Бесценно' : `${value} синапсов`);
  }

  set category(value: string) {
    this.setText(this._category, value);
    const className = categoryMap[value] || 'card__category_other';
    this._category.className = 'card__category';
    this._category.classList.add(className);
  }

  set description(value: string) {
    if (this._description) {
      this.setText(this._description, value);
    }
  }

  set buttonLabel(value: string) {
    if (this._button) {
      this.setText(this._button, value);
    }
  }

  set buttonDisabled(state: boolean) {
    if (this._button) {
      this.setDisabled(this._button, state);
    }
  }
}