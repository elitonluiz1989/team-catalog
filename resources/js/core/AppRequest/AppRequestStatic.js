import {AppRequest} from "./AppRequest";
import HttpVerbsEnum from "./HttpVerbsEnum";

export class AppRequestStatic {
    static #request = new AppRequest();

    /**
     *
     * @param url
     * @returns {Promise<AppResponse>}
     */
    static async get(url) {
        return this.#request.url(url).execute();
    }

    /**
     *
     * @param {string} url
     * @returns {Promise<AppResponse>}
     */
    static async delete(url) {
        return this.#request.url(url).method(HttpVerbsEnum.DELETE).execute();
    }

    /**
     *
     * @returns {AppRequestRoute}
     */
    static get route() {
        this.#request.updateRouteContent();
        return this.#request.route;
    }
}
