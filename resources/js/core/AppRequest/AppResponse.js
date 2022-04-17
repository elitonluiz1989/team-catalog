import { AxiosResponse, AxiosError } from "axios";

import {AppResponseData} from "./AppResponseData";

export class AppResponse {
    /**
     *
     * @type {AxiosResponse}
     */
    #response;

    /**
     *
     * @type {AppResponseData[]}
     */
    #data;

    /**
     *
     * @type {boolean}
     */
    #withErrors;

    /**
     *
     * @param {?AxiosResponse} response
     * @param {AppResponseData[]} data
     * @param {Boolean} withErrors
     */
    constructor(
        response = null,
        data = [],
        withErrors = false
    ) {
        this.#response = response;
        this.#data = data;
        this.#withErrors = withErrors;
    }

    /**
     *
     * @param {AxiosResponse|AxiosError} response
     */
    setData(response) {
        this.#withErrors = response instanceof Error;

        if (this.#withErrors) {
            this.#setErrors(response);
            return;
        }

        this.#response = response;

        this.#initializeData(new AppResponseData(null, response.data));
    }

    /**
     *
     * @returns {AppResponseData[]}
     */
    get data() {
        return this.#data;
    }

    /**
     *
     * @returns {boolean}
     */
    get hasErrors() {
        return this.#withErrors && this.#data.length > 0;
    }

    /**
     *
     * @param {?AppResponseData} defaultValue
     */
    #initializeData(defaultValue= null) {
        this.#data = [];

        if (defaultValue instanceof AppResponseData) {
            this.#data.push(defaultValue);
        }
    }

    /**
     *
     * @param {AxiosError} error
     */
    #setErrors(error) {
        this.#initializeData();
        this.#response = error.response;

        if (this.#response.data?.errors) {
            for (const key in this.#response.data.errors) {
                for (const message of error.response.data.errors[key]) {
                    this.#data.push(new AppResponseData(key, message));
                }
            }
        } else {
            const message = this.#response.data?.message ?? error.message;
            this.#data.push(new AppResponseData(null, message));
        }
    }
}
