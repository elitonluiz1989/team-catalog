/**
 *
 * @param {Event} evt
 * @returns {HTMLButtonElement}
 */
export function getButtonEventTarget(evt) {
    return evt.target instanceof HTMLButtonElement ? evt.target : evt.currentTarget;
}
