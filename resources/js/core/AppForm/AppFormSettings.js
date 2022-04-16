export class AppFormSettings {
    /**
     *
     * @param {?HTMLFormElement} form
     * @param {?AppFormMessageSettings} message
     * @param {?AppRequestSettings} request
     * @param {?AppModalSettings} modal
     */
    constructor(
        form = null,
        message = null,
        request = null,
        modal = null
    ) {
        this.form = form;
        this.message = message;
        this.request = request;
        this.modal = modal;
    }
}
