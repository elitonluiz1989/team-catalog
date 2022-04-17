import axios, { AxiosRequestConfig } from "axios";

import {AppResponse} from "./AppResponse";
import {isNullOrUndefined} from "../Helpers";

export class AppRequest {
    /**
     *
     * @type {AxiosRequestConfig}
     */
    #requestConfig;

    /**
     *
     * @param {AppRequestSettings} settings
     */
    constructor(settings) {
        // noinspection JSValidateTypes
        this.#requestConfig = {
            url: settings.url,
            method: settings.method,
            data: settings.data,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }
    }

    /**
     *
     * @returns {Promise<AppResponse>}
     */
    async execute() {
        const response = new AppResponse();

        try {
            const result = await axios(this.#requestConfig);

            response.setData(result);
        }
        catch(error) {
            response.setData(error);
        }

        return response;
    }

    /**
     * @param {any} data
     */
    setData(data) {
        this.#requestConfig.data = data;
    }

    /**
     *
     * @returns {any}
     */
    get data() {
        return this.#requestConfig.data;
    }

    /**
     *
     * @returns {boolean}
     */
    get hasData() {
        return !isNullOrUndefined(this.#requestConfig.data);
    }
}
