export class AdminFormDto {
    /**
     *
     * @param {?string} formId
     * @param {?string} formMessagesContainerId
     */
    constructor(
        formId = null,
        formMessagesContainerId = null
    ) {
        this.formId = formId;
        this.formMessagesContainerId = formMessagesContainerId;
    }
}
