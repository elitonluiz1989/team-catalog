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
