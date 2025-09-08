/**
 * Базовый компонент
 */
export abstract class Component<T> {
    protected constructor(protected readonly container: HTMLElement) {
        // Учитывайте, что код в конструкторе исполняется ДО всех объявлений в дочернем классе
    }

    // === Инструментарий для работы с DOM ===

    // Установить текст в элемент
    protected setText(element: HTMLElement, text: string): void {
        if (element) {
            element.textContent = text;
        }
    }

    // Установить изображение с альтернативным текстом
    protected setImage(element: HTMLImageElement, src: string, alt?: string): void {
        if (element) {
            element.src = src;
            if (alt) {
                element.alt = alt;
            }
        }
    }

    // Установить состояние disabled для элемента
    protected setDisabled(element: HTMLElement, state: boolean): void {
        if (element instanceof HTMLButtonElement || element instanceof HTMLInputElement) {
            element.disabled = state;
        }
    }

    // Вернуть корневой DOM-элемент
    render(data?: Partial<T>): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.container;
    }
}
