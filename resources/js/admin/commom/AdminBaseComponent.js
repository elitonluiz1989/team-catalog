import {AppCoreComponent} from "../../core/AppCoreComponent";
import {AppFormDto} from "../../core/AppForm/AppFormDto";
import {AppFormMessageDto} from "../../core/AppFormMessage/AppFormMessageDto";
import {AppForm} from "../../core/AppForm/AppForm";
import {AppMaskDto} from "../../core/AppMask/AppMaskDto";
import {AppMask} from "../../core/AppMask/AppMask";
import {AppRequestStatic} from "../../core/AppRequest/AppRequestStatic";
import HttpVerbsEnum from "../../core/AppRequest/HttpVerbsEnum";
import {getEventTargetHandled, objectArrayToString, selector} from "../../core/helpers";

import {getButtonEventTarget} from "../../helpers";

export class AdminBaseComponent extends AppCoreComponent {
    /**
     *
     * @param {AdminFormDto} dto
     * @param {AppModalDto} appModalDto
     * @returns {AppForm}
     */
    defineForm(dto, appModalDto = null) {
        const settings = new AppFormDto();
        settings.form = document.querySelector(dto.formId);
        settings.message = new AppFormMessageDto();
        settings.message.container = dto.formMessagesContainerId;

        if (appModalDto) {
            settings.modal = appModalDto;
        }

        const formHandler = new AppForm(settings);
        formHandler.addInvalidFieldEventHandler();
        formHandler.addSubmitEventHandler();

        return formHandler;
    }

    /**
     *
     * @param {AdminEventsDto} dto
     */
    defineEvents(dto) {
        const maskDto = new AppMaskDto();
        maskDto.withLoading = true;
        const mask = new AppMask(maskDto);

        selector(dto.editEvent.selector)
            .on('click', async evt => {
                await mask.show();

                const formDefaultSettings = {
                    action: dto.form.form.getAttribute('action'),
                    method: dto.form.form.getAttribute('method')
                }
                const eventTargetDto = getEventTargetHandled(evt, getButtonEventTarget);

                this.#disableAllButtons(eventTargetDto.parent);

                dto.form.onFormModalClose(() => {
                    this.#disableAllButtons(eventTargetDto.parent, false);
                    dto.form.setRoute(formDefaultSettings.action, formDefaultSettings.method);
                });

                try {
                    const findRoute = eventTargetDto.element.data(dto.editEvent.findRouteKey);
                    const route = eventTargetDto.element.data(dto.editEvent.actionRouteKey);
                    const response = await AppRequestStatic.get(findRoute);

                    if (response.hasErrors) {
                        const message = objectArrayToString(response.errors, 'content');
                        throw new Error(message);
                    }

                    if (dto.editEvent.fillForm instanceof Function) {
                        dto.editEvent.fillForm(dto.form, response);
                    }

                    dto.form.setRoute(route, HttpVerbsEnum.PUT);
                    dto.form.open();
                } catch (error) {
                    console.error(error);
                    alert(error.message);
                }

                await mask.hide();
            });

        selector(dto.removeEvent.selector)
            .on('click', async evt => {
                const eventTargetDto = getEventTargetHandled(evt, getButtonEventTarget)

                this.#disableAllButtons(eventTargetDto.parent);

                try {
                    const result = confirm(dto.removeEvent.confirmMessage);

                    if (result) {
                        await mask.show();

                        const route = eventTargetDto.element.data(dto.removeEvent.actionRouteKey);
                        const response = await AppRequestStatic.delete(route);

                        await mask.hide();

                        if (response.hasErrors) {
                            const message = objectArrayToString(response.errors, 'content');
                            throw new Error(message);
                        }

                        alert(response.data);

                        window.location.reload();
                    }
                } catch (error) {
                    await mask.hide();

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
