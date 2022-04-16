export class AppModal {
    /**
     *
     * @type {HTMLElement}
     */
    #openerButton;

    /**
     *
     * @type {HTMLElement}
     */
    #dismissButton;

    /**
     *
     * @param {AppModalSettings} settings
     */
    constructor(settings) {
        this.#openerButton = document.querySelector(settings.openerButtonSelector);
        this.#dismissButton = document.querySelector(settings.dismissButtonSelector);
    }

    show() {
        this.#openerButton?.click();
    }

    async hide() {
        this.#dismissButton?.click();
    }
}
