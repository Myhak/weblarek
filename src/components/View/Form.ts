import { Component } from '../base/Component';

export class Form<T> extends Component<T> {
  protected _submit: HTMLButtonElement;
  protected _errors: HTMLElement;

  constructor(container: HTMLElement, onSubmit?: (data: T) => void) {
    super(container);

    this._submit = this.container.querySelector('[type="submit"]')!;
    this._errors = this.container.querySelector('.form__errors')!;

    if (onSubmit) {
      this.container.addEventListener('submit', (e) => {
        e.preventDefault();
        onSubmit(this.getValues());
      });
    }
  }

  set valid(state: boolean) {
    this.setDisabled(this._submit, !state);
  }

  set errors(value: string) {
    this.setText(this._errors, value);
  }

  protected getValues(): T {
    throw new Error('getValues must be implemented');
  }
}