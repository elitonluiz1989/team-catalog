import { isNullOrUndefined } from "../helpers";
import {AppRequest} from "./AppRequest";
import HttpVerbsEnum from "./Enums/HttpVerbsEnum";

export class AppRequestStatic {
    static #request = new AppRequest();

    /**
     *
     * @param {string} url
     * @returns {Promise<AppResponse>}
     */
    static async get(url) {
        return this.#request
            .url(url)
            .method(HttpVerbsEnum.GET)
            .execute();
    }

    /**
     *
     * @param {string} url
     * @param {any} data
     * @returns {Promise<AppResponse>}
     */
    static async post(url, data) {
        return this.#request
            .url(url)
            .method(HttpVerbsEnum.POST)
            .setData(data)
            .execute();
    }

    /**
     *
     * @param {string} url
     * @param {any} data
     * @returns {Promise<AppResponse>}
     */
    static async delete(url, data = null) {
        this.#request
            .url(url)
            .method(HttpVerbsEnum.DELETE)

        if (!isNullOrUndefined(data)) {
            this.#request.setData(data);
        }
            
        return await this.#request.execute();
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
