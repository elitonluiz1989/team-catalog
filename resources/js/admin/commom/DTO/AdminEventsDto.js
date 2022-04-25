export class AdminRecordEventDto {
    /**
     *
     * @param {?string} selector
     * @param {?string} actionRouteKey
     */
    constructor(
        selector = null,
        actionRouteKey = null
    )
    {
        this.selector = selector ?? '';
        this.actionRouteKey = actionRouteKey ?? '';
    }
}

export class AdminRecordEditEventDto extends AdminRecordEventDto{
    /**
     *
     * @param {?string} selector
     * @param {?string} findRouteKey
     * @param {?string} actionRouteKey
     * @param {?Function} fillForm
     */
    constructor(
        selector = null,
        findRouteKey = null,
        actionRouteKey = null,
        fillForm = null
    )
    {
        super(selector, actionRouteKey);

        this.findRouteKey = findRouteKey ?? '';
        this.fillForm = fillForm;
    }
}

export class AdminRecordRemoveEventDto extends AdminRecordEventDto{
    /**
     *
     * @param {?string} selector
     * @param {?string} confirmMessage
     * @param {?string} actionRouteKey
     */
    constructor(
        selector = null,
        confirmMessage = null,
        actionRouteKey = null
    )
    {
        super(selector, actionRouteKey);

        this.confirmMessage = confirmMessage ?? 'Are you sure to remove this record?';
    }
}

export class AdminEventsDto {
    /**
     *
     * @param {?AppForm} form
     * @param {?AdminRecordEditEventDto} editEvent
     * @param {?AdminRecordRemoveEventDto} removeEvent
     */
    constructor(
        form = null,
        editEvent = null,
        removeEvent = null
    ) {
        this.form = form;
        this.editEvent = editEvent;
        this.removeEvent = removeEvent;
    }
}
