import { AxiosResponse, AxiosError } from "axios";
import { objectArrayToString } from "../helpers";

import {AppResponseError} from "./AppResponseError";

export class AppResponse {
    /**
     *
     * @type {AxiosResponse}
     */
    #response;

    /**
     *
     * @type {any}
     */
    #data;

    /**
     *
     * @type {AppResponseError[]}
     */
    #errors = [];

    /**
     *
     * @param {?AxiosResponse} response
     * @param {any} data
     * @param {AppResponseError[]} errors
     */
    constructor(
        response = null,
        data = null,
        errors = []
    ) {
        this.#response = response;
        this.#data = data;
        this.#errors = errors;
    }

    /**
     *
     * @param {AxiosResponse} response
     */
    setData(response) {
        if (typeof response === 'object') {
            this.#response = response;
        }

        this.#data = response?.data ?? response.toString();
    }

    /**
     *
     * @param {AxiosError} error
     */
    setErrors(error) {
        this.#errors = [];
        this.#response = error.response;

        if (this.#response?.data?.errors) {
            for (const key in this.#response.data.errors) {
                for (const message of error.response.data.errors[key]) {
                    this.#errors.push(new AppResponseError(key, message));
                }
            }
        } else {
            const message = this.#response?.data?.message ?? error.message;
            this.#errors.push(new AppResponseError(null, message));
        }
    }

    /**
     *
     * @returns {any}
     */
    get data() {
        return this.#data;
    }

    /**
     *
     * @returns {AppResponseError[]}
     */
    get errors() {
        return this.#errors;
    }

    /**
     * 
     * @returns {string}
     */
    getErrorsString() {
        return objectArrayToString(this.#errors, 'content');
    }

    /**
     *
     * @returns {boolean}
     */
    get hasErrors() {
        return this.#errors.length > 0;
    }
}
