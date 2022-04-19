export class AppModalSettings {
    /**
     *
     * @param {?string} modalSelector
     * @param {?string} openerButtonSelector
     * @param {?string} dismissButtonSelector
     */
    constructor(
        modalSelector = null,
        openerButtonSelector = null,
        dismissButtonSelector = null
    ) {
        this.modalSelector = modalSelector;
        this.openerButtonSelector = openerButtonSelector;
        this.dismissButtonSelector = dismissButtonSelector;
    }
}
