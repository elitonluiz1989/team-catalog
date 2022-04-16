export class AppModalSettings {
    /**
     *
     * @param {?string} openerButtonSelector
     * @param {?string} dismissButtonSelector
     */
    constructor(
        openerButtonSelector = null,
        dismissButtonSelector = null
    ) {
        this.openerButtonSelector = openerButtonSelector;
        this.dismissButtonSelector = dismissButtonSelector;
    }
}
