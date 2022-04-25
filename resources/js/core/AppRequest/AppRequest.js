import axios, { AxiosRequestConfig } from "axios";

import {isNullOrUndefined, isNullOrWhiteSpace} from "../helpers";

import {AppResponse} from "./AppResponse";

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
    #route;

    /**
     *
     * @type {string[]}
     */
    #routeComposition = [];

    constructor() {
        this.fill();
    }

    /**
     *
     * @returns {string}
     */
    get route() {
        return this.#route;
    }

    /**
     *
     * @returns {string}
     */
    get fullRoute() {
        return `${this.#origin}/${this.#route}`;
    }

    /**
     *
     * @returns {string[]}
     */
    get routeComposition() {
        return this.#routeComposition;
    }

    /**
     *
     * @returns {string}
     */
    get routeIdentifier() {
        if (this.#routeComposition.length === 0) {
            return '';
        }

        return this.#routeComposition[0];
    }

    fill() {
        this.#origin = window.location.origin;
        this.#route = window.location.pathname;
        this.#routeComposition = this.#route.split('/').filter(item => !isNullOrWhiteSpace(item));
    }
}

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
