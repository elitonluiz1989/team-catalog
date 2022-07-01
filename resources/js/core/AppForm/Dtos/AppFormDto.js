export class AppFormDto {
    /**
     *
     * @param {?HTMLFormElement} form
     * @param {?AppFormMessageDto} message
     * @param {?AppRequestDto} request
     * @param {?AppModalDto} modal
     * @param {?AppMaskDto} mask
     * @param {?Function} beforeSubmitHandler
     */
    constructor(
        form = null,
        message = null,
        request = null,
        modal = null,
        mask = null,
        beforeSubmitHandler = null
    ) {
        this.form = form;
        this.message = message;
        this.request = request;
        this.modal = modal;
        this.mask = mask;
        this.beforeSubmitHandler = beforeSubmitHandler;
    }
}
