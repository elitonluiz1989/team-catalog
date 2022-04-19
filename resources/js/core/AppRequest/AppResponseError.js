export class AppResponseError {
    /**
     *
     * @param {?string} target
     * @param {any} content
     */
    constructor(
        target = null,
        content = null
    ) {
        this.target = target ?? 'application';
        this.content = content;
    }
}
