import { Component } from '../base/Component';

export class Modal extends Component<unknown> {
  protected _content: HTMLElement;
  protected _closeButton: HTMLButtonElement;

  constructor(container: HTMLElement) {
    super(container);

    this._content = this.container.querySelector('.modal__content')!;
    this._closeButton = this.container.querySelector('.modal__close')!;

    this._closeButton.addEventListener('click', () => {
      this.close();
    });

    this.container.addEventListener('click', (e) => {
      if (e.target === this.container) {
        this.close();
      }
    });
  }

  open() {
    this.container.classList.add('modal_active');
    document.body.classList.add('lock');
  }

  close() {
    this.container.classList.remove('modal_active');
    document.body.classList.remove('lock');
  }

  set content(element: HTMLElement) {
    this._content.replaceChildren(element);
  }

  isOpened(): boolean {
    return this.container.classList.contains('modal_active');
  }
}