export class AppModal {
    /**
     *
     * @type {HTMLElement}
     */
    #modal;

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
        this.#modal = document.querySelector(settings.modalSelector);
        this.#openerButton = document.querySelector(settings.openerButtonSelector);
        this.#dismissButton = document.querySelector(settings.dismissButtonSelector);
    }

    open() {
        this.#openerButton?.click();
    }

    async close() {
        this.#dismissButton?.click();
    }

    afterClose(callback) {
        this.#modal?.addEventListener('hidden.bs.modal', callback);
    }
}
