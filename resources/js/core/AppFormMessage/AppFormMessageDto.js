export class AppFormMessageDto {
    /**
     *
     * @param {?HTMLFormElement} form
     * @param {?string} container
     */
    constructor(
        form = null,
        container = null
    ) {
        this.form = form;
        this.container = container
    }
}
