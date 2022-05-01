import {AdminEventDto} from "./AdminEventDto";

export class AdminRemoveEventDto extends AdminEventDto{
    /**
     *
     * @param {?string} selector
     * @param {?string} actionRouteKey
     * @param {?string} confirmMessage
     * @param {?Function} callback
     */
    constructor(
        selector = null,
        actionRouteKey = null,
        confirmMessage = null,
        callback = null
    )
    {
        super(selector, actionRouteKey, callback);

        this.confirmMessage = confirmMessage ?? 'Are you sure to remove this record?';
    }
}
