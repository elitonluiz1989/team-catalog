import {AppResponse} from "./AppResponse";

export class AppRequest {
    /**
     *
     * @param {AppRequestSettings} settings
     */
    constructor(settings) {
        this.url = settings.url;
        this.method = settings.method;
        this.data = settings.data;
    }

    /**
     *
     * @returns {Promise<AppResponse>}
     */
    async execute() {
        const response = new AppResponse();

        try {
            const result = await axios({
                url: this.url,
                method: this.method,
                data: this.data
            });

            response.setData(result.data);
        } catch(error) {
            response.setErrors(error);
        }

        return response;
    }
}
