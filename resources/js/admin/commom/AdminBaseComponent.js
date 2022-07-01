import { AppCoreComponent } from "../../core/AppCoreComponent";
import { AppForm } from "../../core/Appform/Appform";
import { AppFormDto } from "../../core/AppForm/Dtos/AppFormDto";
import { AppFormMessageDto } from "../../core/AppFormMessage/Dtos/AppFormMessageDto";
import { AppMask } from "../../core/AppMask/AppMask";
import { AppMaskDto } from "../../core/AppMask/Dtos/AppMaskDto";
import { AppRequestStatic } from "../../core/AppRequest/AppRequestStatic";
import HttpVerbsEnum from "../../core/AppRequest/Enums/HttpVerbsEnum";
import { Entity } from './../../core/Entity';
import { getEventTargetHandled, objectArrayToString, selector, isFunction } from "../../core/helpers";

import {getButtonEventTarget} from "../../helpers";

export class AdminBaseComponent extends AppCoreComponent {
    /**
     *
     * @type {AppForm}
     */
    form;

    /**
     *
     * @type {AppMask}
     */
    #mask;

    getFormDto(formId, formMessagesContainerId) {
        const dto = new AppFormDto();
        dto.form = document.querySelector(formId);
        dto.message = new AppFormMessageDto();
        dto.message.container = formMessagesContainerId;

        return dto;
    }

    /**
     *
     * @param {AppFormDto} dto
     * @param {Entity} record
     */
    configureform(dto, record = null) {
        this.form = new AppForm(dto);
        this.form.addInvalidFieldEventHandler();
        this.form.addSubmitEventHandler();

        if (isFunction(dto.beforeSubmitHandler)) {
            this.form.beforeSubmitHandler = dto.beforeSubmitHandler;
        }

        if (record) {
            this.form.record = record;
        }

        if (AppMask.isInstanceOf(this.#mask)) {
            this.form.setMask(this.#mask);
        }
    }

    configureMask() {
        const dto = new AppMaskDto();
        dto.withLoading = true;
        dto.zIndex = 2000;
        dto.backgroundColor = '#dadad9';
        dto.spinnerColor = '#1d1c1f';

        this.#mask = new AppMask(dto);
        
        if (AppForm.isInstanceOf(this.form)) {
            this.form.mask = this.#mask;
        }
    }

    get mask() {
        return this.#mask;
    }

    /**
     *
     * @param {AdminEditEventDto} dto
     */
    addEditEvent(dto) {
        selector(dto.selector)
            .on('click', async evt => {
                await this.#mask.show();

                const formDefaultSettings = {
                    action: this.form.form.getAttribute('action'),
                    method: this.form.form.getAttribute('method')
                }
                const eventTargetDto = getEventTargetHandled(evt, getButtonEventTarget);

                this.#disableAllButtons(eventTargetDto.parent);

                this.form.onFormModalClose(() => {
                    this.#disableAllButtons(eventTargetDto.parent, false);
                    this.form.setRoute(formDefaultSettings.action, formDefaultSettings.method);

                    if (isFunction(dto.onFormClose)) {
                        dto.onFormClose(this.form);
                    }
                });

                try {
                    const findRoute = eventTargetDto.element.data(dto.findRouteKey);
                    const route = eventTargetDto.element.data(dto.actionRouteKey);
                    const response = await AppRequestStatic.get(findRoute);

                    if (response.hasErrors) {
                        const message = objectArrayToString(response.errors, 'content');
                        throw new Error(message);
                    }

                    if (dto.callback instanceof Function) {

                        dto.callback(this.form, response.data);
                    }

                    this.form.setRoute(route, HttpVerbsEnum.PUT);
                    this.form.open();
                } catch (error) {
                    console.error(error);
                    alert(error.message);

                    this.#disableAllButtons(eventTargetDto.parent, false);
                }

                await this.#mask.hide();
            });
    }

    /**
     *
     * @param {AdminRemoveEventDto} dto
     */
    addRemoveEvent(dto) {
        selector(dto.selector)
            .on('click', async evt => {
                const eventTargetDto = getEventTargetHandled(evt, getButtonEventTarget)

                this.#disableAllButtons(eventTargetDto.parent);

                try {
                    const result = confirm(dto.confirmMessage);

                    if (result) {
                        await this.#mask.show();

                        const route = eventTargetDto.element.data(dto.actionRouteKey);
                        const response = await AppRequestStatic.delete(route);

                        if (response.hasErrors) {
                            const message = objectArrayToString(response.errors, 'content');
                            throw new Error(message);
                        }

                        alert(response.data);

                        window.location.reload();
                    }
                } catch (error) {
                    await this.#mask.hide();

                    console.error(error);

                    alert(error.message);
                }

                this.#disableAllButtons(eventTargetDto.parent, false);
            });
    }

    #disableAllButtons = (container, disable = true) => {
        container?.iterateChildren(child => {
            if (child instanceof HTMLButtonElement) {
                selector(child).disable(disable);
            }
        });
    }
}
