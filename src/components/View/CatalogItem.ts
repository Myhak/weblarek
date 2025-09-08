import { Card } from './Card';

export class CatalogItem extends Card {
  constructor(container: HTMLElement, onClick: () => void) {
    super(container, { onClick });
  }
}