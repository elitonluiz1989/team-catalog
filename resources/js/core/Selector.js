export class Selector {
    /**
     *
     * @type {HTMLElement[]}
     */
    #selectors = [];

    /**
     *
     * @param {string|HTMLElement}selector
     */
    constructor(selector) {
        if (selector instanceof  HTMLElement) {
            this.#selectors = [selector];
        } else if (typeof selector === 'string') {
            const selectors = document.querySelectorAll(selector);

            if (selectors && selectors.length > 0) {
                selectors.forEach(selector => this.#selectors.push(selector));
            }
        }
    }

    /**
     *
     * @param index
     * @returns {HTMLElement}
     */
    get(index) {
        return this.#selectors[index];
    }

    /**
     *
     * @param {string} eventName
     * @param {Function} callback
     * @param {boolean|AddEventListenerOptions} options
     * @returns {Selector}
     */
    on(eventName, callback, options = false) {
        this.#selectors.forEach(selector => {
            selector.addEventListener(eventName, callback, options);
        })

        return this;
    }

    /**
     *
     * @param {string} key
     * @returns {string}
     */
    data(key) {
        let value = '';

        this.#selectors.forEach(selector => {
            if (selector.dataset.hasOwnProperty(key)) {
                value = selector.dataset[key];
            }
        });

        return value;
    }

    /**
     *
     * @param {Boolean} value
     */
    disable(value = true) {
        this.#selectors.forEach(selector => {

            if (value) {
                selector.setAttribute('disabled', value.toString());
            } else {
                selector.removeAttribute('disabled');
            }
        })
    }

    /**
     *
     * @param {Function} callback
     */
    iterateChildren(callback) {
        this.#selectors.forEach(selector => {
            selector.childNodes.forEach(child => {
                if (callback instanceof Function) {
                    callback(child);
                }
            })
        })
    }
}
