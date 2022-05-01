export class AdminEventDto {
    /**
     *
     * @param {?string} selector
     * @param {?string} actionRouteKey
     * @param {?Function} callback
     */
    constructor(
        selector = null,
        actionRouteKey = null,
        callback = null
    )
    {
        this.selector = selector ?? '';
        this.actionRouteKey = actionRouteKey ?? '';
        this.callback = callback;
    }
}
