import {AdminEventDto} from "./AdminEventDto";

export class AdminEditEventDto extends AdminEventDto {
    /**
     *
     * @param {?string} selector
     * @param {?string} findRouteKey
     * @param {?string} actionRouteKey
     * @param {?Function} callback
     * @param {?Function} onFormClose
     */
    constructor(
        selector = null,
        findRouteKey = null,
        actionRouteKey = null,
        callback = null,
        onFormClose = null
    )
    {
        super(selector, actionRouteKey, callback);

        this.findRouteKey = findRouteKey ?? '';
        this.onFormClose = onFormClose;
    }
}
