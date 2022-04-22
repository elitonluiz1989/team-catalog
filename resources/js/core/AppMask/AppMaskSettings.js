export class AppMaskSettings {
    /**
     *
     * @param {?string} maskId
     * @param {?HTMLElement} container
     * @param {Boolean} withLoading
     */
    constructor(
        maskId = null,
        container = null,
        withLoading = false
    ) {
        this.maskId = maskId;
        this.container = container;
        this.withLoading = withLoading;
    }
}
