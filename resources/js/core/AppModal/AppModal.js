import {AppModalEventsDto} from "./Dtos/AppModalEventsDto";

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
     * @type {AppModalEventsDto}
     */
    #events;

    /**
     *
     * @param {AppModalDto} settings
     */
    constructor(settings) {
        this.#modal = document.querySelector(settings.modalSelector);
        this.#openerButton = document.querySelector(settings.openerButtonSelector);
        this.#dismissButton = document.querySelector(settings.dismissButtonSelector);
        this.#events = new AppModalEventsDto();

        if (settings.events instanceof AppModalEventsDto) {
            this.#events = settings.events;
        }
    }

    open() {
        this.#openerButton?.click();
    }

    async close() {
        this.#dismissButton?.click();
    }

    /**
     *
     * @param {Function} callback
     */
    addOnOpenEvent(callback) {
        this.#events.onOpen = callback;
        this.#modal?.addEventListener('show.bs.modal', this.#events.onOpen);
    }

    removeOnOpenEvent() {
        this.#modal?.removeEventListener('show.bs.modal', this.#events.onOpen);
        this.#events.onOpen = null;
    }

    /**
     *
     * @param {Function} callback
     */
    addAfterCloseEvent(callback) {
        this.#events.afterClose = callback;
        this.#modal?.addEventListener('hidden.bs.modal', this.#events.afterClose);
    }

    removeAfterCloseEvent() {
        this.#modal?.removeEventListener('hidden.bs.modal', this.#events.afterClose);
        this.#events.afterClose = null;
    }
}
