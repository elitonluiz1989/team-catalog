export class EventTargetDto {
    /**
     *
     * @param {?Selector} element
     * @param {?Selector} parent
     */
    constructor(
        element = null,
        parent = null
    ) {
        this.element = element;
        this.parent = parent;
    }
}
