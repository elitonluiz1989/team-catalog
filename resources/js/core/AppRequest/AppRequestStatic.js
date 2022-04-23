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

    static async delete(url) {
        return this.#request.url(url).method(HttpVerbsEnum.DELETE).execute();
    }
}
