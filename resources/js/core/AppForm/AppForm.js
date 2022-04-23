import {AppModal} from "../AppModal/AppModal";
import {AppFormMessage} from "../AppFormMessage/AppFormMessage";
import {AppRequest} from "../AppRequest/AppRequest";
import {delay} from "../helpers";
import {AppRequestDto} from "../AppRequest/AppRequestDto";
import {AppMask} from "../AppMask/AppMask";
import {AppMaskDto} from "../AppMask/AppMaskDto";

export class AppForm {
    /**
     *
     * @type {HTMLFormElement}
     */
    #form

    /**
     *
     * @type {HTMLInputElement}
     */
    #recordIdentifier;

    /**
     *
     * @type {string[]}
     */
    #disabledFields = [];

    /**
     *
     * @type {boolean}
     */
    #removeDisabledFieldsOnSubmit = false;

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
     * @param {AppFormDto} settings
     */
    constructor(settings) {
        this.#form = settings.form;

        if (!settings.request) {
            settings.request = new AppRequestDto(
                this.#form.action,
                this.#form.method
            )
        }

        this.#request = new AppRequest(settings.request);

        settings.message.form = this.#form;
        this.#message = new AppFormMessage(settings.message);

        if (settings.modal) {
            this.#modal = new AppModal(settings.modal);
            this.onFormModalClose();
        }

        if (!settings.mask) {
            settings.mask = new AppMaskDto();
            settings.mask.withLoading = true;
        }

        this.#mask = new AppMask(settings.mask);
    }

    createRecordIdentifier(name, value) {
        const elementId = `record-${name}`;

        this.#recordIdentifier = document.getElementById(elementId);

        if (this.#recordIdentifier === null) {
            this.#recordIdentifier = document.createElement('input');
            this.#recordIdentifier.id = `record-${name}`;
            this.#recordIdentifier.setAttribute('type', 'hidden');
            this.#recordIdentifier.setAttribute('name', name);
        }

        this.#recordIdentifier.value = value;

        this.#form.appendChild(this.#recordIdentifier);
    }

    /**
     *
     * @param {string} url
     * @param {?string} method
     */
    setRoute(url, method = null) {
        this.#form.setAttribute('action', url);
        this.#request.url(url);

        if (method) {
            this.#form.setAttribute('method', method);
            this.#request.method(method);
        }
    }

    /**
     *
     * @param {any} data
     */
    fill(data) {
        for (const item in data) {
            if (this.#form.hasOwnProperty(item)) {
                this.#form[item].value = data[item];
            }
        }
    }

    /**
     *
     * @param {string} name
     */
    enableField(name) {
        if (this.#form.hasOwnProperty(name)) {
            this.#form[name].removeAttribute('disabled');
        }
    }

    /**
     *
     * @param {string} fields
     */
    disableFields(...fields) {
        if (fields && fields.length > 0) {
            for (const field of fields) {
                this.disableField(field);
            }
        }
    }

    /**
     *
     * @param {string} field
     */
    disableField(field) {
        if (this.#form.hasOwnProperty(field)) {
            this.#form[field].setAttribute('disabled', true);
            this.#disabledFields.push(field);
        }
    }

    removeDisabledFieldsOnSubmit() {
        this.#removeDisabledFieldsOnSubmit = true;
    }

    open() {
        if (this.#modal) {
            this.#modal.open();
        }
    }

    async submit() {
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
            await this.submit();
        });
    }

    /**
     *
     * @param {?Function} callback
     */
    onFormModalClose(callback= null) {
        if (this.#modal) {
            this.#modal.removeAfterCloseEvent();

            this.#modal.addAfterCloseEvent(() => {
                this.#form.reset();
                this.#recordIdentifier?.remove();

                for (const field of this.#disabledFields) {
                    this.enableField(field);
                }

                this.#message.remove();

                if (callback instanceof Function) {
                    callback(this);
                }
            });
        }
    }

    /**
     *
     * @returns {object}
     */
    #getFormData() {
        const formData = {};
        const elements = this.#form.querySelectorAll('input,select,textarea');

        for (const element of elements) {
            if (this.#removeDisabledFieldsOnSubmit && element.getAttribute('disabled')) {
                continue;
            }

            formData[element.getAttribute('name')] = element.value;
        }

        return formData;
    }
}
