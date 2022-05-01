import {isNullOrWhiteSpace} from "../helpers";

export class AppRequestRoute {
    /**
     *
     * @type {string}
     */
    #origin;

    /**
     *
     * @type {string}
     */
    #path;

    /**
     *
     * @type {string[]}
     */
    #pathComposition = [];

    constructor() {
        this.fill();
    }

    /**
     *
     * @returns {string}
     */
    get path() {
        return this.#path;
    }

    /**
     *
     * @returns {string[]}
     */
    get pathComposition() {
        return this.#pathComposition;
    }

    fill() {
        this.#origin = window.location.origin;
        this.#path = window.location.pathname;
        this.#pathComposition = this.#path.split('/').filter(item => !isNullOrWhiteSpace(item));
    }
}
