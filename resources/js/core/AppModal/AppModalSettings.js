export class AppModalSettings {
    /**
     *
     * @param {?string} modalSelector
     * @param {?string} openerButtonSelector
     * @param {?string} dismissButtonSelector
     * @param {?AppModalEventsDto} events
     */
    constructor(
        modalSelector = null,
        openerButtonSelector = null,
        dismissButtonSelector = null,
        events = null
    ) {
        this.modalSelector = modalSelector;
        this.openerButtonSelector = openerButtonSelector;
        this.dismissButtonSelector = dismissButtonSelector;
        this.events = events;
    }
}
