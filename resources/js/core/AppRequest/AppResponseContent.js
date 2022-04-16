export class AppResponseContent {
    /**
     * @param {?string} target
     * @param {*} data
     */
    constructor(
        target = null,
        data = null
    ) {
        this.target = target;
        this.data = data;
    }
}
