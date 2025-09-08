import { Card } from './Card';

export class BasketItem extends Card {
  protected _index: HTMLElement;
  protected _deleteButton: HTMLButtonElement;

  constructor(container: HTMLElement, onDelete: () => void) {
    super(container);

    this._index = this.container.querySelector('.basket__item-index')!;
    this._deleteButton = this.container.querySelector('.basket__item-delete')!;

    if (onDelete) {
      this._deleteButton.addEventListener('click', onDelete);
    }
  }

  set index(value: number) {
    this.setText(this._index, String(value));
  }
}