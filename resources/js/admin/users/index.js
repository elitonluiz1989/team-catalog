import {AppMaskDto} from "../../core/AppMask/AppMaskDto";
import {AppMask} from "../../core/AppMask/AppMask";
import {getEventTargetHandled, objectArrayToString, selector} from "../../core/helpers";
import {AppRequestStatic} from "../../core/AppRequest/AppRequestStatic";
import {Selector} from "../../core/Selector";

import {getButtonEventTarget} from "../../helpers";

import {User} from "./User";
import {defineForm} from "./form";
import HttpVerbsEnum from "../../core/AppRequest/HttpVerbsEnum";

(function() {
    const form = defineForm();
    const maskDto = new AppMaskDto();
    maskDto.withLoading = true;
    const mask = new AppMask(maskDto);
    /**
     *
     * @param {Selector} container
     * @param {Boolean} disable
     */
    const disableAllButtons = (container, disable = true) => {
        container.iterateChildren(child => {
            if (child instanceof HTMLButtonElement) {
                selector(child).disable(disable);
            }
        });
    }

    selector('.user__edit-action')
        .on('click', async evt => {
            await mask.show();

            const dto = getEventTargetHandled(evt, getButtonEventTarget);

            disableAllButtons(dto.parent);

            form.onFormModalClose(() => disableAllButtons(dto.parent, false));

            try {
                const findRoute = dto.element.data('findRoute');
                const route = dto.element.data('actionRoute');

                if (!findRoute || !route) {
                    throw new Error('User edit route is not defined.');
                }

                const response = await AppRequestStatic.get(findRoute);

                if (response.hasErrors) {
                    const message = objectArrayToString(response.errors, 'content');
                    throw new Error(message);
                }

                const user = new User();
                user.fill(response.data);

                form.fill(user);
                form.setRoute(route, HttpVerbsEnum.PUT);
                form.createRecordIdentifier('id', user.id);
                form.disableFields('email', 'password');
                form.removeDisabledFieldsOnSubmit()
                form.open();
            } catch (error) {
                alert(error.message);
            }

            await mask.hide();
        });

    selector('.user__remove-action')
        .on('click', async evt => {
            const dto = getEventTargetHandled(evt, getButtonEventTarget)

            disableAllButtons(dto.parent);

            try {
                const result = confirm('Are you sure to remove this user?');

                if (result) {
                    await mask.show();

                    const route = dto.element.data('actionRoute');
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

                alert(error.message);
            }

            disableAllButtons(dto.parent, false);
        });
})()
