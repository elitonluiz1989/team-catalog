import {isNullOrUndefined} from "../helpers";

export class AppElement {
    /**
     *
     * @type {HTMLElement}
     */
    #element;

    /**
     *
     * @param {?HTMLElement} element
     */
    constructor(element = null) {
        this.#element = element;
    }

    /**
     *
     * @param {string} tagName
     * @returns {AppElement}
     */
    createElement(tagName) {
        this.#element = document.createElement(tagName);

        return this;
    }

    get element() {
        return this.#element;
    }

    /**
     *
     * @param {AppElement} child
     * @returns {AppElement}
     */
    appendChild(child) {
        this.#element.appendChild(child.element);

        return this;
    }

    /**
     *
     * @param {Object|CSSStyleDeclaration} styles
     * @returns {AppElement}
     */
    setStyles(styles){
        if (!isNullOrUndefined(styles)) {
            for (const property in styles) {
                if (this.#element.style.hasOwnProperty(property)) {
                    this.#element.style[property] = styles[property];
                }
            }
        }

        return this;
    }

    /**
     *
     * @param {string} property
     * @param {any} value
     * @returns {AppElement}
     */
    setStyle(property, value) {
        if (this.#element.style.hasOwnProperty(property)) {
            this.#element.style[property] = value;
        }

        return this;
    }

    /**
     *
     * @param {string} property
     * @returns {AppElement}
     */
    removeStyle(property) {
        if (this.#element.style.hasOwnProperty(property)) {
            this.#element.style.removeProperty(property)
        }

        return this;
    }

    /**
     * 
     * @param {string} tag 
     * @returns {AppElement}
     */
    static create(tag) {
        const element = new AppElement();
        element.createElement(tag);

        return element;
    }
}
