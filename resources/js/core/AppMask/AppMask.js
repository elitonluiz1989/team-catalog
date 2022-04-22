import {randId} from "../helpers";

export class AppMask {
    /**
     *
     * @type {string}
     */
    #maskId;

    /**
     *
     * @type {string}
     */
    #loadingContainerId;

    /**
     *
     * @type {HTMLElement}
     */
    #container;

    /**
     *
     * @type {Boolean}
     */
    #withLoading;

    /**
     *
     * @param {?AppMaskSettings} settings
     */
    constructor(settings = null) {
        this.#maskId = settings.maskId ?? this.#createRandomId('app-mask');
        this.#container = settings.container ?? document.querySelector('body');
        this.#withLoading = settings.withLoading ?? false;

        if (this.#withLoading) {
            this.#loadingContainerId = this.#createRandomId('app-mask-loading')
        }
    }

    async show() {
        const mask = this.#getMask();
        mask.classList.remove('d-none');
        mask.classList.add('show');

        if (this.#withLoading) {
            const container = this.#getLoadingContainer();
            container.classList.remove('d-none');
            container.classList.add('d-flex');
        }
    }

    async hide() {
        const mask = this.#getMask();

        if (mask) {
            mask.classList.remove('show');
            mask.classList.add('d-none');
        }

        if (this.#withLoading) {
            const container = this.#getLoadingContainer();

            if (container) {
                container.classList.remove('d-flex');
                container.classList.add('d-none');
            }
        }
    }

    // noinspection JSMethodCanBeStatic
    /**
     *
     * @param {string} prefix
     * @returns {string}
     */
    #createRandomId(prefix) {
        const randomNumber = randId();

        return `${prefix}-${randomNumber}`;
    }

    /**
     *
     * @returns {HTMLDivElement}
     */
    #createMask() {
        const mask = document.createElement('div');
        mask.id = this.#maskId;
        mask.classList.add(
            'mask',
            'fade',
            'h-100',
            'w-100',
            'position-fixed'
        );

        this.#container.appendChild(mask);

        return mask;
    }

    /**
     *
     * @returns {Element}
     */
    #getMask() {
        let mask = document.getElementById(this.#maskId);

        if (!mask) {
            mask = this.#createMask();
        }

        return mask;
    }

    /**
     *
     * @returns {HTMLDivElement}
     */
    #createLoadingContainer() {
        const srOnly = document.createElement('span');
        srOnly.classList.add('sr-only');
        srOnly.textContent = 'Loading...';

        const spinner = document.createElement('div');
        spinner.classList.add('spinner-border');
        spinner.setAttribute('role', 'status');
        spinner.appendChild(srOnly);

        const container = document.createElement('div');
        container.id = this.#loadingContainerId;
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

        this.#container.appendChild(container);

        return container;
    }

    /**
     *
     * @returns {Element}
     */
    #getLoadingContainer() {
        let container = document.getElementById(this.#loadingContainerId);

        if (!container) {
            container = this.#createLoadingContainer();
        }

        return container;
    }
}
