export class AppRequestDto {
    /**
     *
     * @param {?string} url
     * @param {?string} method
     * @param {any} data
     */
    constructor(
        url = null,
        method = null,
        data = null
    ) {
        this.url = url;
        this.method = method;
        this.data = data;
    }
}
