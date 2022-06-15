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
     * @param {?AxiosRequestConfig} settings
     */
    constructor(settings = null) {
        if (settings) {
            this.#requestConfig =  settings;
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
     * @param {Function} callback
     * @returns {AppRequest}
     */
    onUploadProgress(callback) {
        this.#requestConfig.onUploadProgress = callback;
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
     * @returns {AppRequest}
     */
    setData(data) {
        this.#requestConfig.data = data;
        return this;
    }

    clearData() {
        this.#requestConfig.data = null;
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
