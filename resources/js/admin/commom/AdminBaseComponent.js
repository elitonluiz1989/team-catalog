import {AppCoreComponent} from "../../core/AppCoreComponent";
import {AppForm} from "../../core/AppForm/AppForm";
import {AppFormDto} from "../../core/AppForm/Dtos/AppFormDto";
import {AppFormMessageDto} from "../../core/AppFormMessage/Dtos/AppFormMessageDto";
import {AppMask} from "../../core/AppMask/AppMask";
import {AppMaskDto} from "../../core/AppMask/Dtos/AppMaskDto";
import {AppRequestStatic} from "../../core/AppRequest/AppRequestStatic";
import HttpVerbsEnum from "../../core/AppRequest/Enums/HttpVerbsEnum";
import {getEventTargetHandled, objectArrayToString, selector} from "../../core/helpers";

import {getButtonEventTarget} from "../../helpers";

export class AdminBaseComponent extends AppCoreComponent {
    /**
     *
     * @type {AppMask}
     */
    #mask;

    /**
     *
     * @type {AppForm}
     */
    #appForm;

    /**
     *
     * @param {string} formId
     * @param {string} formMessagesContainerId
     * @param {AppModalDto} appModalDto
     */
    configureAppForm(formId, formMessagesContainerId, appModalDto) {
        const settings = new AppFormDto();
        settings.form = document.querySelector(formId);
        settings.message = new AppFormMessageDto();
        settings.message.container = formMessagesContainerId;

        if (appModalDto) {
            settings.modal = appModalDto;
        }

        this.#appForm = new AppForm(settings);
        this.#appForm.addInvalidFieldEventHandler();
        this.#appForm.addSubmitEventHandler();
    }

    configureMask() {
        const maskDto = new AppMaskDto();
        maskDto.withLoading = true;
        this.#mask = new AppMask(maskDto);
    }

    addCreateEvent() {
        throw new Error("Not implemented.");
    }

    get appForm() {
        return this.#appForm;
    }

    get appMask() {
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
                    action: this.#appForm.form.getAttribute('action'),
                    method: this.#appForm.form.getAttribute('method')
                }
                const eventTargetDto = getEventTargetHandled(evt, getButtonEventTarget);

                this.#disableAllButtons(eventTargetDto.parent);

                this.#appForm.onFormModalClose(() => {
                    this.#disableAllButtons(eventTargetDto.parent, false);
                    this.#appForm.setRoute(formDefaultSettings.action, formDefaultSettings.method);
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

                        dto.callback(this.#appForm, response.data);
                    }

                    this.#appForm.setRoute(route, HttpVerbsEnum.PUT);
                    this.#appForm.open();
                } catch (error) {
                    console.error(error);
                    alert(error.message);
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

                        await this.#mask.hide();

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
