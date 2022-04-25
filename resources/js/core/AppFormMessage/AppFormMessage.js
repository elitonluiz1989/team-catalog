import {AppResponseError} from "../AppRequest/AppResponseError";
import {randId} from "../helpers";

export class AppFormMessage {
    /**
     * @type {HTMLFormElement}
     */
    #form;

    /**
     *
     * @type {HTMLDivElement}
     */
    #container;

    /**
     * @type {string}
     */
    #messageContainerSelector;

    /**
     *
     * @param {AppFormMessageDto} settings
     */
    constructor(settings) {
        this.#form = settings.form;
        this.#messageContainerSelector = settings.container;
    }

    /**
     *
     * @param {AppResponseError[]} errors
     */
    errors(errors) {
        this.#createContainer();
        this.#resetContainer(`alert-danger`);

        for (const error of errors) {
            this.#createMessage(error.content, error.target);

            if (error.target) {
                const formElement = this.#form.querySelector(`[name="${error.target}"]`);

                if (formElement) {
                    formElement.classList.add('is-invalid');
                }
            }
        }
    }

    /**
     *
     * @param {string} message
     * @returns {Promise<void>}
     */
    async success(message) {
        this.#createContainer();
        this.#resetContainer(`alert-success`);
        this.#createMessage(message);
    }

    remove() {
        if (this.#container) {
            this.#container.classList.remove('show');
            this.#container.classList.add('d-none');
            this.#container.innerHTML = '';
        }
    }

    #createContainer() {
        const selector = this.#messageContainerSelector || '.alert';
        this.#container = this.#form.querySelector(selector);

        if (!this.#container) {
            this.#container = document.createElement('div');
            this.#container.classList.add('alert', 'fade', 'd-none');

            this.#form.prepend(this.#container);
        }

        if (!this.#container.classList.contains('alert')) {
            this.#container.classList.add('alert')
        }

        if (this.#container.classList.contains('alert-success')) {
            this.#container.classList.remove('alert-success')
        }

        if (this.#container.classList.contains('alert-danger')) {
            this.#container.classList.remove('alert-danger')
        }

        this.#container.classList.remove('d-none');
        this.#container.classList.add('show');
    }

    /**
     *
     * @param {string} stateStyle
     */
    #resetContainer(stateStyle) {
        this.#container.replaceChildren();
        this.#container.classList.remove('alert-success', 'alert-danger');
        this.#container.classList.add(stateStyle);

        for (const element of this.#form.querySelectorAll('.is-invalid')) {
            element.classList.remove('is-invalid');
        }
    }

    /**
     *
     * @param {string} message
     * @param {?string} identifier
     */
    #createMessage(message, identifier = null) {
        identifier = identifier ?? randId();

        const messageContainer = document.createElement('div');
        messageContainer.classList.add(`${identifier}-message`);
        messageContainer.textContent = message;

        this.#container.appendChild(messageContainer);
    }
}
