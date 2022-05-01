import axios, { AxiosRequestConfig } from "axios";

import {isNullOrUndefined} from "../helpers";

import {AppResponse} from "./AppResponse";
import {AppRequestRoute} from "./AppRequestRoute";

export class AppRequest {
    /**
     *
     * @type {AxiosRequestConfig}
     */
    #requestConfig = {
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    };

    /**
     *
     * @type {AppRequestRoute}
     */
    #route;

    /**
     *
     * @param {?AppRequestDto} settings
     */
    constructor(settings = null) {
        if (settings) {
            this.#requestConfig.url =  settings.url;
            this.#requestConfig.method = settings.method;
            this.#requestConfig.data = settings.data;
        }

        this.#route = new AppRequestRoute();
    }

    /**
     *
     * @param {string} url
     * @returns {AppRequest}
     */
    url(url) {
        this.#requestConfig.url = url;
        return this;
    }

    /**
     *
     * @param {string} method
     * @returns {AppRequest}
     */
    method(method) {
        this.#requestConfig.method = method;
        return this;
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
            response.setErrors(error);
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

    updateRouteContent() {
        this.#route.fill();
    }

    /**
     *
     * @returns {AppRequestRoute}
     */
    get route() {
        return this.#route;
    }
}
