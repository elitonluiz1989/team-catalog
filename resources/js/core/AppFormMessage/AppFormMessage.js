import StateEnum from "./AppFormMessageStateEnum";

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
     * @param {AppFormMessageSettings} settings
     */
    constructor(settings) {
        this.#form = settings.form;
        this.#messageContainerSelector = settings.container;
    }

    /**
     *
     * @param {AppResponseData[]} errors
     */
    errors(errors) {
        this.#createMessage(
            errors,
            StateEnum.ERROR,
            (error) => {
                if (error.target) {
                    const formElement = this.#form.querySelector(`[name="${error.target}"]`);

                    if (formElement) {
                        formElement.classList.add('is-invalid');
                    }
                }
        });
    }

    /**
     *
     * @param {AppResponseData[]} data
     * @returns {Promise<void>}
     */
    async success(data) {
        this.#createMessage(data, StateEnum.SUCCESS);
    }

    /**
     *
     * @param {AppResponseData[]} data
     * @param {string} stateStyle
     * @param {?Function} callback
     */
    #createMessage(data, stateStyle, callback = null) {
        this.#createContainer();
        this.#resetContainer(stateStyle);

        let child = null;

        for (const content of data) {
            child = this.#createMessageContainer(content);

            this.#container.appendChild(child);

            if (callback instanceof Function) {
                callback(content);
            }
        }
    }

    remove() {
        this.#container.classList.remove('show');
        this.#container.classList.add('d-none');
        this.#container.innerHTML = '';
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
     * @param {AppResponseData} data
     * @returns {HTMLDivElement}
     */
    #createMessageContainer(data) {
        const messageIdentifier = data.target ?? this.#form.id ?? this.#form.getAttribute('name');
        const container = document.createElement('div');
        container.classList.add(`${messageIdentifier}-message`);
        container.textContent = data.content;

        return container;
    }
}
