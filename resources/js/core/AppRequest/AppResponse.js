import {AppResponseContent} from "./AppResponseContent";

export class AppResponse {
    /**
     *
     * @type {AppResponseContent}
     */
    #data = new AppResponseContent();

    /**
     *
     * @type {AppResponseContent[]}
     */
    #errors = [];

    /**
     *
     * @param {*} data
     */
    setData(data) {
        this.#data.data = data;
    }

    /**
     *
     * @returns {AppResponseContent}
     */
    getData() {
        return this.#data;
    }

    /**
     *
     * @param error
     */
    setErrors(error) {
        this.#errors = [];

        if (error.response?.data?.errors) {
            for (const key in error.response.data.errors) {
                for (const message of error.response.data.errors[key]) {
                    this.#errors.push(new AppResponseContent(key, message));
                }
            }
        } else {
            const message = error.response?.data?.message ?? error.message;
            this.#errors.push(new AppResponseContent('application', message));
        }
    }

    /**
     *
     * @returns {AppResponseContent[]}
     */
    getErrors() {
        return this.#errors || [];
    }

    /**
     *
     * @returns {boolean}
     */
    hasErrors() {
        return this.#errors.length > 0;
    }
}
