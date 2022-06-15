import {isNullOrUndefined} from "../helpers";

export class BaseDto {
    /**
     * 
     * @type {string[]}
     */
    #nullables;

    /**
     * 
     * @type {boolean}
     */
    noValidate = false;

    /**
     *
     * @param {string[]} nullables
     */
    constructor(nullables = []) {
        this.#nullables = nullables;
    }

    /**
     *
     * @returns {string[]}
     */
    validate() {
        const results = [];

        if (this.noValidate) {
            return results;
        }

        for (const property in this) {
            if (this.#nullables.find(n => n === property)) {
                continue;
            }

            if (isNullOrUndefined(this[property])) {
                results.push(`DTO.${property} must be defined.`);
            }
        }

        return results;
    }

    /**
     * 
     * @throws {Error}
     */
    validateAndThrow() {
        const result = this.validate();

        if (result.length > 0) {
            const messages = result.reduce((m, item) => m + '\n' + item, '');

            throw new Error(messages);
        }
    }
}
