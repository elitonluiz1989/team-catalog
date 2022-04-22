export class Selector {
    /**
     *
     * @type {NodeList}
     */
    #selectors;

    constructor(selector) {
        this.#selectors = document.querySelectorAll(selector);
    }

    /**
     *
     * @returns {NodeList}
     */
    get() {
        return this.#selectors;
    }

    /**
     *
     * @param {string} eventName
     * @param {Function} callback
     * @returns {Selector}
     */
    on(eventName, callback) {
        this.#selectors.forEach(selector => {
            selector.addEventListener(eventName, callback, false);
        })

        return this;
    }
}
