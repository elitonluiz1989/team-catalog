import {Selector} from "./Selector";

/**
 *
 * @param {number} milliseconds
 * @returns {Promise<unknown>}
 */
export function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

/**
 *
 * @param {any} value
 * @returns {boolean}
 */
export function isNullOrUndefined(value) {
    return value === undefined || value === null;
}

/**
 *
 * @param {object} object
 * @returns {Object}
 */
export function createEnum(object) {
    return Object.freeze(object);
}

/**
 *
 * @returns {string}
 */
export function randId() {
    const firstPart = (Math.random() * 10).toString().replace('.', '');
    const secondPart = performance.now().toString().replace('.', '');

    return `${firstPart}${secondPart}`;
}

/**
 *
 * @param {string} selector
 * @returns {Selector}
 */
export function selector(selector) {
    return new Selector(selector);
}
