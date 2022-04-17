export class AppResponseData {
    /**
     *
     * @param {?string} target
     * @param {*} content
     */
    constructor(
        target = null,
        content = null
    ) {
        this.target = target ?? 'application';
        this.content = content;
    }
}
