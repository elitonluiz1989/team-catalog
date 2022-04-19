import {AppModal} from "../AppModal/AppModal";
import {AppFormMessage} from "../AppFormMessage/AppFormMessage";
import {AppRequest} from "../AppRequest/AppRequest";
import {delay} from "../Helpers";
import {AppRequestSettings} from "../AppRequest/AppRequestSettings";
import {AppMask} from "../AppMask/AppMask";
import {AppMaskSettings} from "../AppMask/AppMaskSettings";

export class AppForm {
    /**
     *
     * @type {HTMLFormElement}
     */
    #form

    /**
     *
     * @type {AppRequest}
     */
    #request;

    /**
     *
     * @type {AppFormMessage}
     */
    #message;

    /**
     *
     * @type {AppModal}
     */
    #modal;

    /**
     *
     * @type {AppMask}
     */
    #mask;

    /**
     *
     * @param {AppFormSettings} settings
     */
    constructor(settings) {
        this.#form = settings.form;

        if (!settings.request) {
            settings.request = new AppRequestSettings(
                this.#form.action,
                this.#form.method
            )
        }

        this.#request = new AppRequest(settings.request);

        settings.message.form = this.#form;
        this.#message = new AppFormMessage(settings.message);

        if (settings.modal) {
            this.#modal = new AppModal(settings.modal);
            this.#onFormClose();
        }

        if (!settings.mask) {
            settings.mask = new AppMaskSettings();
            settings.mask.withLoading = true;
        }

        this.#mask = new AppMask(settings.mask);
    }

    async execute() {
        await this.#mask.show();

        if (!this.#request.hasData) {
            this.#request.setData(this.#getFormData());
        }

        const response = await this.#request.execute();

        await this.#mask.hide();

        if (response.hasErrors) {
            this.#message.errors(response.errors);
            return;
        }

        await this.#message.success(response.data);

        await delay(2000);

        this.#form.reset();
        this.#message.remove();

        await this.#modal.close();

        window.location.reload();
    }

    addInvalidFieldEventHandler() {
        this.#form.querySelectorAll('input').forEach(function(item) {
            item.addEventListener('keydown', function(evt) {
                const target = evt?.target;

                if (target && target.classList.contains('is-invalid')) {
                    target.classList.remove('is-invalid');
                }
            });
        });
    }

    addSubmitEventHandler() {
        this.#form.addEventListener('submit', async (evt) => {
            evt?.preventDefault();
            await this.execute();
        });
    }

    /**
     *
     * @returns {FormData}
     */
    #getFormData() {
        const formData = new FormData();
        const elements = this.#form.querySelectorAll('input,select,textarea');

        for (const element of elements) {
            formData.append(element.getAttribute('name'), element.value)
        }

        return formData;
    }

    #onFormClose() {
        this.#modal?.afterClose(() => {
            this.#form.reset();
            this.#message.remove();
        });
    }
}
