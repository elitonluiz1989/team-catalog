export class AppModalEventsDto {
    /**
     *
     * @param {?Function} onOpen
     * @param {?Function} afterClose
     */
    constructor(
        onOpen =  null,
        afterClose = null
    ) {
        this.onOpen = onOpen;
        this.afterClose = afterClose;
    }
}
