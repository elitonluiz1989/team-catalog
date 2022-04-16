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
     * @param {AppResponseContent[]} errors
     */
    errors(errors) {
        this.#createContainer();
        this.#resetContainer('alert-danger');

        for (const error of errors) {
            const child = this.#createMessageContainer(error);

            this.#container.appendChild(child);

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
     * @param {AppResponseContent} data
     * @returns {Promise<void>}
     */
    async success(data) {
        this.#createContainer();
        this.#resetContainer('alert-success');

        const child = this.#createMessageContainer(data);

        this.#container.appendChild(child);
    }

    remove() {
        this.#container.classList.remove('show');
        this.#container.classList.add('d-none');
        this.#container.innerHTML = '';
    }

    async showLoading() {
        let mask = document.querySelector('.mask');
        let container = document.querySelector('.mask__content');
        const body = document.querySelector('body');

        if (!mask) {
            mask = this.#createLoadingMask(body);
        }

        if (!container) {
            container = this.#createLoadingContainer(body);
        }

        mask.classList.remove('d-none');
        mask.classList.add('show');
        container.classList.remove('d-none');
        container.classList.add('d-flex');
    }

    async hideLoading() {
        const mask = document.querySelector('.mask');
        const container = document.querySelector('.mask__content');

        if (mask) {
            mask.classList.remove('show');
            mask.classList.add('d-none');
        }

        if (container) {
            container.classList.remove('d-flex');
            container.classList.add('d-none');
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
     * @param {AppResponseContent} error
     * @returns {HTMLDivElement}
     */
    #createMessageContainer(error) {
        const messageIdentifier = error.target ?? this.#form.id ?? this.#form.getAttribute('name');
        const container = document.createElement('div');
        container.classList.add(`${messageIdentifier}-message`);
        container.textContent = error.data;

        return container;
    }

    /**
     *
     * @param {HTMLBodyElement} body
     * @returns {HTMLDivElement}
     */
    #createLoadingMask(body) {
        const mask = document.createElement('div');
        mask.classList.add(
            'mask',
            'fade',
            'h-100',
            'w-100',
            'position-fixed'
        );

        body.appendChild(mask);

        return mask;
    }

    /**
     *
     * @param {HTMLBodyElement} body
     * @returns {HTMLDivElement}
     */
    #createLoadingContainer(body) {
        const srOnly = document.createElement('span');
        srOnly.classList.add('sr-only');
        srOnly.textContent = 'Loading...';

        const spinner = document.createElement('div');
        spinner.classList.add('spinner-border');
        spinner.setAttribute('role', 'status');
        spinner.appendChild(srOnly);

        const container = document.createElement('div');
        container.classList.add(
            'mask__content',
            'd-none',
            'h-100',
            'w-100',
            'position-fixed',
            'align-items-center',
            'justify-content-center'
        );
        container.appendChild(spinner);

        body.appendChild(container);

        return container;
    }
}
