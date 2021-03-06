import {AppFormMessage} from "../AppFormMessage/AppFormMessage";
import {AppFormMessageDto} from "../AppFormMessage/Dtos/AppFormMessageDto";
import {AppMask} from "../AppMask/AppMask";
import {AppModal} from "../AppModal/AppModal";
import {AppRequest} from "../AppRequest/AppRequest";
import {AppRequestDto} from "../AppRequest/Dtos/AppRequestDto";
import {delay, isFunction, isNullOrUndefined} from "../helpers";

export class AppForm {
    /**
     *
     * @type {AppMask}
     */
    mask;

    /**
     * 
     * @type {Function}
     */
    beforeSubmitHandler;

    /**
     * 
     * @type {object}
     */
    record;

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
     * @type {boolean}
     */
    #saved;

    /**
     *
     * @param {AppFormDto} settings
     */
    constructor(settings) {
        this.#form = settings.form;

        if (!this.#form) {
            throw new Error('Form not defined.');
        }

        if (!settings.request) {
            settings.request = new AppRequestDto(
                this.#form.action,
                this.#form.method
            )
        }

        this.#request = new AppRequest(settings.request);

        if (!settings.message) {
            settings.message = new AppFormMessageDto();
        }

        settings.message.form = this.#form;
        this.#message = new AppFormMessage(settings.message);

        if (settings.modal) {
            this.setModal(settings.modal);
        }

        if (!settings.mask) {
            this.mask = new AppMask(settings.mask);
        }

        this.#saved = false;
    }

    /**
     * 
     * @param {object} object 
     * @returns {boolean}
     */
    static isInstanceOf(object) {
        return object instanceof AppForm;
    }

    get isEdition() {
        return !isNullOrUndefined(this.#recordIdentifier);
    }

    /**
     *
     * @param {any} data
     */
    set requestData(data){
        this.#request.setData(data);
    }

    /**
     * 
     * @param {string} name 
     * @param {?any} value 
     */
    createRecordIdentifier(name, value = null) {
        const elementId = `record-${name}`;

        this.#recordIdentifier = document.getElementById(elementId);

        if (this.#recordIdentifier === null) {
            this.#recordIdentifier = document.createElement('input');
            this.#recordIdentifier.id = `record-${name}`;
            this.#recordIdentifier.setAttribute('type', 'hidden');
            this.#recordIdentifier.setAttribute('name', name);
        }

        this.#recordIdentifier.value = value ?? this.record[name];

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

    setModal(dto) {
        this.#modal = new AppModal(dto);
        this.onFormModalClose();
    }

    /**
     * 
     * @param {AppMask} mask
     */
    setMask(mask) {
        this.mask = mask;
    }

    /**
     *
     * @param {?any} data
     */
    fill(data = null) {
        if (isNullOrUndefined(data)) {
            data = Object.assign({}, this.record);
        }

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

    reset() {
        this.#form.reset();
        this.#message.remove();

        if (this.isEdition) {
            this.fill();
        }
    }

    async submit() {
        await this.mask.show();

        if (!this.#request.hasData) {
            this.#request.setData(this.#getFormData());
        }

        const response = await this.#request.execute();

        await this.mask.hide();

        if (response.hasErrors) {
            this.#message.errors(response.errors);
            this.#request.clearData();
            this.#saved = false;

            return;
        }

        this.#saved = true;

        await this.#message.success(response.data);

        await delay(2000);

        await this.#modal.close();

        await this.mask.show();

        this.reset();

        window.location.reload();
    }

    addInvalidFieldEventHandler() {
        this.#iterateFormFields(item => {
            item.addEventListener('keydown', evt => {
                this.#removeInvalidTagFromField(evt.target);
            }, false);

            item.addEventListener('change', evt => {
                this.#removeInvalidTagFromField(evt.target);
            }, false);
        });
    }

    addSubmitEventHandler() {
        this.#form.addEventListener('submit', async (evt) => {
            evt?.preventDefault();

            if (isFunction(this.beforeSubmitHandler)) {
                this.beforeSubmitHandler(this);
            }

            await this.submit();

        }, false);
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

                let disabledFieldName = '';
                this.#iterateFormFields(item => {
                    disabledFieldName = this.#disabledFields.find(fieldName => item.getAttribute('name') === fieldName);
                    if (disabledFieldName) {
                        this.enableField(disabledFieldName);
                    }

                    this.#removeInvalidTagFromField(item);
                })

                this.#message.remove();

                if (isFunction(callback)) {
                    callback(this);
                }
            });
        }
    }

    /**
     *
     * @returns {HTMLFormElement}
     */
    get form() {
        return this.#form;
    }

    get saved() {
        return this.#saved;
    }

    /**
     *
     * @returns {object}
     */
    #getFormData() {
        const data = {};

        this.#iterateFormFields(field => {
            if (this.#removeDisabledFieldsOnSubmit && field.getAttribute('disabled')) {
                return;
            }

            data[field.getAttribute('name')] = field.value;
        });

        return data;
    }

    /**
     *
     * @param {Function} callback
     */
    #iterateFormFields(callback) {
        if (!isFunction(callback)) {
            return;
        }

        this.#form.querySelectorAll('input, select, textarea').forEach(item => {
            if (item.getAttribute('name')) {
                callback(item);
            }
        });
    }

    /**
     *
     * @param {HTMLElement} field
     */
    #removeInvalidTagFromField(field) {
        if (field && field.classList.contains('is-invalid')) {
            field.classList.remove('is-invalid');
        }
    }
}
