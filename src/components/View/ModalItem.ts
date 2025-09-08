import { Card } from './Card';

export class ModalItem extends Card {
  constructor(container: HTMLElement, onClick: () => void) {
    super(container, { onClick });
  }
}