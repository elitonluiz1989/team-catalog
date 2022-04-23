import {Selector} from "./Selector";
import {EventTargetDto} from "./DTO/EventTargetDto";

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
 * @param {string|Node|HTMLElement} selector
 * @returns {Selector}
 */
export function selector(selector) {
    return new Selector(selector);
}

/**
 *
 * @param {object[]} arr
 * @param {string} property
 * @returns {string}
 */
export function objectArrayToString(arr, property) {
    const str = arr.reduce((m, item) => {
        if (!item.hasOwnProperty(property)) {
            return m;
        }

        return m + item[property].toString();
    }, '');

    return str.toString();
}

/**
 *
 * @param {any} func
 * @returns {boolean}
 */
export function isFunction(func) {
    return func instanceof Function;
}

/**
 *
 * @param {Event} evt
 * @param {?Function} targetHandleCallback
 * @returns {EventTargetDto}
 */
export function getEventTargetHandled(evt, targetHandleCallback = null) {
    const result = new EventTargetDto();
    const target = isFunction(targetHandleCallback) ? targetHandleCallback(evt) : evt.target;

    result.element = selector(target);
    result.parent = selector(target.parentElement);

    return result;
}
