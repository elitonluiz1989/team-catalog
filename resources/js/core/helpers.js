import {AppCore} from "./AppCore";
import {EventTargetDto} from "./Dtos/EventTargetDto";
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
 * @param {any} value
 * @returns {boolean}
 */
export function isNullOrEmpty(value) {
    if (isNullOrUndefined(value)) {
        return true;
    }

    if (!value.length) {
        return true;
    }

    return value.length === 0;
}

/**
 *
 * @param {any} value
 * @returns {boolean}
 */
export function isNullOrWhiteSpace(value) {
    if (isNullOrEmpty(value)) {
        return true;
    }

    return value.toString().trim() === '';
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
 * @param {string} clue
 * @returns {string}
 */
export function objectArrayToString(arr, property, clue = '') {
    let str = '';

    if (isNullOrWhiteSpace(clue)) {
        str = arr.reduce((m, item) => {
            if (!item.hasOwnProperty(property)) {
                return m;
            }

            return m + item[property].toString();
        }, '');
    } else {
        const items = [];
        for (const item of arr) {
            if (item.hasOwnProperty(property)) {
                items.push(item[property]);
            }
        }

        str = items.join(clue);
    }

    return str.toString();
}

/**
 *
 * @param {any} func
 * @returns {boolean}
 */
export function isFunction(func) {
    return func instanceof Function ||
        typeof func === 'function' ||
        Object.prototype.toString.call(func) === '[object Function]';
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

export function createApp(components) {
    return new AppCore(components);
}
