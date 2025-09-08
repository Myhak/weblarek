import { Component } from '../base/Component';

export class Gallery extends Component<unknown> {
  protected _container: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);
    this._container = container;
  }

  set items(cards: HTMLElement[]) {
    this._container.replaceChildren(...cards);
  }
}