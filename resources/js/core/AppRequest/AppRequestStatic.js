import {AppRequest} from "./AppRequest";

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
}
